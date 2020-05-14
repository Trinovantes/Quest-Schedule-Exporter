import Config from './config.json';
import { Course } from './Course';

//-----------------------------------------------------------------------------
// CalendarExporter
//-----------------------------------------------------------------------------

export class CalendarExporter {

    _dateFormatType: string;
    _questData: string;
    _summary: string;
    _description: string;
    _courses: Array<Course>;

    constructor(dateFormatType, questData, summary, description) {
        this._dateFormatType = dateFormatType;
        this._questData = questData;
        this._summary = summary;
        this._description = description;
        this._courses = [];
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
        let courseRegex = createCourseRegex();
        let sectionRegex = createSectionRegex(this._questData);

        console.log(courseRegex)
        console.log(sectionRegex)

        let courseLoopCount = 0;
        let courseMatches = null;

        while (true) {
            if (courseLoopCount++ > Config.MAX_COURSES) {
                console.warn('Exceeded loop count while searching for courses');
                break;
            }

            courseMatches = courseRegex.exec(this._questData);
            if (!courseMatches) {
                break;
            }
            console.log(courseMatches)

            let sectionLoopCount = 0;
            let sectionMatches = null;

            while (true) {
                if (sectionLoopCount++ > Config.MAX_SECTIONS) {
                    console.warn('Exceeded loop count while searching for sections');
                    break;
                }

                sectionMatches = sectionRegex.exec(courseMatches[0]);
                if (!sectionMatches) {
                    break;
                }

                console.log(sectionMatches)

                if (sectionMatches[4] === 'TBA') {
                    continue;
                }

                let course = new Course({
                    code       : courseMatches[1],
                    name       : courseMatches[2],

                    section    : sectionMatches[2],
                    type       : sectionMatches[3],
                    location   : sectionMatches[8],
                    prof       : sectionMatches[9],

                    dateFormat : this._dateFormatType,
                    classDays  : sectionMatches[5],
                    startTime  : sectionMatches[6],
                    endTime    : sectionMatches[7],
                    startDate  : sectionMatches[10],
                    endDate    : sectionMatches[11],
                });
                this._courses.push(course);
            }

            console.log('')
        }

        if (courseLoopCount === 0 || courseLoopCount >= Config.MAX_COURSES) {
            // The search probably failed
            // Got an infinite loop or found nothing
            throw 'Failed Search';
        }
                console.log(this._courses);
    }

    // See RFC2445 for more details
    // https://www.ietf.org/rfc/rfc2445.txt
    _generateICal() : string {
        let calendarContent = '';

        let addLine = function(line) {
            calendarContent += line + '\n';
        };

        addLine('BEGIN:VCALENDAR');
        addLine('VERSION:2.0');
        addLine('PRODID:-//www.QuestScheduleExporter.xyz//EN');

        for (let course of this._courses) {
            // I hate JavaScript
            // https://stackoverflow.com/a/47190038
            let printer = course.printer(this._summary, this._description);
            let next;
            while (!(next = printer.next()).done) {
                addLine(next.value);
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
}

//-------------------------------------------------------------------------
// Helpers
//-------------------------------------------------------------------------

function createCourseRegex() : RegExp {
    let courseHeaderPattern = '(\\w{2,5} \\d{3,4}) - (.*)';

    let anythingBeforePattern = function (pattern) {
        return '(?:(?!' + pattern + ')[\\w|\\W])*';
    };

    /*jshint multistr: true */
    let regex =
        courseHeaderPattern                           + // Course code and name
        anythingBeforePattern(courseHeaderPattern)    +
    '';

    return new RegExp(regex, 'g');
}

function createSectionRegex(questData : string) : RegExp {
    const classNumberPattern = '\\d{4}';

    const timePattern = (function() {
        const timePattern12h = '1?\\d\\:[0-5]\\d[AP]M';
        const timePattern24h = '[0-2]\\d\\:[0-5]\\d';
        let is24h = /([0-5]\d[A|P]M)/.exec(questData) === null;
        return is24h ? timePattern24h : timePattern12h;
    })();

    const patternOrTBA = function(pattern) {
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

    return new RegExp(regex, 'g');
}
