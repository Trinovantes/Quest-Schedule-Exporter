let Config = require('config');
let Course = require('course');


class QuestCalendarExporter {
    constructor(dateFormatType, questData, summary, description) {
        this.dateFormatType = dateFormatType;
        this.questData = questData;
        this.summary = summary;
        this.description = description;
        this.courses = [];
    }

    run() {
        // Store courses into 'this.courses' array
        this._parseData();

        // Returns a string of the calendar file
        let ical = this._generateICal();

        // Downloads file to user's computer
        this._downloadFile(ical);
    }

    _parseData() {
        let courseRegex = new RegExp(this._createCourseRegex(), 'g');
        let sectionRegex = new RegExp(this._createSectionRegex(), 'g');

        let courseLoopCount = 0;
        let courseMatches = null;
        while (true) {
            courseMatches = courseRegex.exec(this.questData);
            if (courseMatches === null || courseLoopCount++ > Config.MAX_COURSES) {
                break;
            }

            let sectionLoopCount = 0;
            let sectionMatches = null;
            while (true) {
                sectionMatches = sectionRegex.exec(courseMatches[0]);
                if (sectionMatches === null || sectionLoopCount++ > Config.MAX_SECTIONS) {
                    break;
                }

                if (sectionMatches[4] === 'TBA') {
                    continue;
                }

                let course = new Course({
                    code           : courseMatches[1],
                    name           : courseMatches[2],

                    section        : sectionMatches[2],
                    type           : sectionMatches[3],
                    location       : sectionMatches[8],
                    prof           : sectionMatches[9],

                    dateFormatType : this.dateFormatType,
                    classDays      : sectionMatches[5],
                    startTime      : sectionMatches[6],
                    endTime        : sectionMatches[7],
                    startDate      : sectionMatches[10],
                    endDate        : sectionMatches[11],
                });
                this.courses.push(course);
            }
        }

        if (courseLoopCount === 0 || courseLoopCount >= Config.MAX_COURSES) {
            // The search probably failed
            // Got an infinite loop or found nothing
            throw 'Failed Search';
        }
    }

    // See RFC2445 for more details
    // https://www.ietf.org/rfc/rfc2445.txt
    _generateICal() {
        let calendarContent = '';

        let addLine = function(line) {
            calendarContent += line + '\n';
        };

        addLine('BEGIN:VCALENDAR');
        addLine('VERSION:2.0');
        addLine('PRODID:-//Stephen Li//Quest Schedule Exporter//EN');

        for (let course of this.courses) {
            for (let line of course.print(this.summary, this.description)) {
                addLine(line);
            }
        }

        addLine('END:VCALENDAR');

        return calendarContent;
    }

    _downloadFile(content) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', Config.filename);
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    //-------------------------------------------------------------------------
    // Helpers 
    //-------------------------------------------------------------------------

    _createCourseRegex() {
        let courseHeaderPattern = '(\\w{2,5}\\ \\w{3,4})\\ -\\ ([^\\s]+)';

        let anythingBeforePattern = function (pattern) {
            return '(?:(?!' + pattern + ')[\\w|\\W])*';  
        };

        /*jshint multistr: true */
        let regex =
            courseHeaderPattern                           + // Course code and name
            anythingBeforePattern(courseHeaderPattern)    +
        '';

        return regex;
    }

    _createSectionRegex() {
        let classNumberPattern = '\\d{4}';

        let timePattern = (function getTimePattern(questData) {
            const timePattern12h = '1?\\d\\:[0-5]\\d[AP]M';
            const timePattern24h = '[0-2]\\d\\:[0-5]\\d';
            let is24h = /([0-5]\d[A|P]M)/.exec(questData) === null;
            return is24h ? timePattern24h : timePattern12h;
        })(this.questData);

        let patternOrTBA = function(pattern) {
            return '(' + pattern + '|TBA)\\s*';
        };

        /*jshint multistr: true */
        let regex =
            '(' + classNumberPattern + ')\\s*'          + // Class number
            '(\\d{3}\\s*)'                              + // Section
            '(\\w{3}\\s*)'                              + // Type (LEC, SEM, STU, LAB)
            patternOrTBA(
                '([MThWF]{0,6})\\s*'                        + // Days
                '(' + timePattern +  ')\\ -\\ '             + // Start time
                '(' + timePattern +  ')\\s*'                + // End time
                ''
            )                                           +
            patternOrTBA(
                '[\\w\\ ]+\\s*[0-9]{1,5}[A-Z]?'             + // Location
                ''
            )                                           +
            patternOrTBA(
                '[A-Za-z_\\ \\-\\,\\s]+'                    + // Professor
                ''
            )                                           +
            '(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})\\ -\\ '   + // Start date
            '(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})'          + // End date
        '';

        return regex;
    }

}

module.exports = QuestCalendarExporter;
