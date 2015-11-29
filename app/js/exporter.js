let Config = require('config');
let Course = require('course');


class QuestCalendarExporter {
    constructor(questData, summary, description) {
        this.questData = questData;
        this.summary = summary;
        this.description = description;
        this.courses = [];
    }

    run() {
        // Store courses into 'this.courses' array
        if (this._parseData()) {
            var ical = this._generateICal(); // Returns a string of the calendar file
            this._downloadFile(ical); // Downloads file to user's computer
        }
    }

    _parseData() {
        let classNumberPattern = '\\d{4}';

        /*jshint multistr: true */
        let questDataPattern =
            '(\\w{2,5}\\ \\w{3,4})\\ -\\ ([^\\r\\n]+)'                      + // Course code and name
            QuestCalendarExporter.anythingBeforePattern(classNumberPattern) +
            '(' + classNumberPattern + ')\\s+'                              + // Class number
            '(\\d{3})\\s+'                                                  + // Section
            '(\\w{3})\\s+'                                                  + // Type (LEC, SEM, STU)
            '([MThWF]{0,6})\\s+'                                            + // Days
            '(1?\\d\\:[0-5]\\d[AP]M)\\ -\\ '                          + // Start time
            '(1?\\d\\:[0-5]\\d[AP]M)\\s+'                             + // End time
            '([\\w\\ ]+\\s+[0-9]{1,5}[A-Z]?|TBA)\\s+'                       + // Location
            '([\\w\\ \\-\\,\\r\\n]+)\\s+'                                   + // Professor
            '(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})\\ -\\ '                       + // Start date
            '(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})'                              + // End date
        '';

        var regEx = new RegExp(questDataPattern, 'g');
        var matches = null;
        var loopCount = 0;

        while (true) {
            matches = regEx.exec(this.questData);
            if (matches === null || loopCount++ > Config.MAX_COURSES) {
                break;
            }

            var course = new Course({
                code      : matches[1],
                section   : matches[4],
                name      : matches[2],
                type      : matches[5],
                location  : matches[9],
                prof      : matches[10],

                classDays : matches[6],
                startDate : matches[11],
                endDate   : matches[12],
                startTime : matches[7],
                endTime   : matches[8],
            });
            this.courses.push(course);
        }

        if (loopCount === 0 || loopCount >= Config.MAX_COURSES) {
            // The search probably failed
            // Got an infinite loop or found nothing
            alert('Unable to generate iCalendar file! Please submit an issue on GitHub.');
            return false;
        } else {
            return true;
        }
    }

    // See RFC2445 for more details
    // https://www.ietf.org/rfc/rfc2445.txt
    _generateICal() {
        var calendarContent = '';

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
        var element = document.createElement('a');
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

    static anythingBeforePattern(pattern) {
        return '(?:(?!' + pattern + ')[\\w|\\W])*';
    }
}

module.exports = QuestCalendarExporter;
