import Config from './config.json';

//-----------------------------------------------------------------------------
// Course
//-----------------------------------------------------------------------------

type NullableDate = Date | null;

export class Course {

    _name: string;
    _code: string;

    _section: string;
    _type: string;
    _location: string;
    _prof: string;

    _classDaysICal: string;
    _untilDateICal: string;
    _startTimeOnFirstDate: string;
    _endTimeOnFirstDate: string;

    constructor({code, name, section, type, location, prof, dateFormat, classDays, startTime, endTime, startDate, endDate}) {
        this._code     = code;
        this._name     = name;

        this._section  = flatten(section);
        this._type     = flatten(type);
        this._location = flatten(location);
        this._prof     = flatten(prof);

        //---------------------------------------------------------------------
        // Parse dates
        //---------------------------------------------------------------------

        const daysWithClasses = classDays
            .replace(/Th/g, 'H') // Replace 'Th' with H key
            .toLowerCase()       // Set to lowercase to match keys in the above mappings
        this._classDaysICal = convertDaysToICal(Array.from(daysWithClasses));

        // If it's a repeating event (e.g. lecture), then return a DateTime object
        // otherwise (e.g. midterm), then return undefined
        const untilDate : NullableDate = (function() {
            if (startDate === endDate) {
                return null;
            }

            let lastDateOfClass = parseDate(dateFormat, endDate);
            lastDateOfClass.setHours(23);
            lastDateOfClass.setMinutes(59);
            return lastDateOfClass;
        })();
        this._untilDateICal = convertToICalTimeString(untilDate);

        // Advance start date of term to first day of class
        // e.g. term start on Jan 4 (Mon) but first day of a class is on Jan 5 (Tues)
        const firstDateOfClass : Date = (function() {
            let WEEKDAY_NUMBER = {
                m: 1,
                t: 2,
                w: 3,
                h: 4,
                f: 5,
            };

            let firstDate = parseDate(dateFormat, startDate);
            let daysWithClassesNumbers = daysWithClasses.split('').map(d => WEEKDAY_NUMBER[d]);

            let dayCounter = 0;
            let MAX_DAY_ADVANCEMENT = 365;

            while (!daysWithClassesNumbers.includes(firstDate.getDay()) && dayCounter++ < MAX_DAY_ADVANCEMENT) {
                if (dayCounter === MAX_DAY_ADVANCEMENT) {
                    throw 'Invalid first date of class';
                }

                firstDate.setDate(firstDate.getDate() + 1);
            }

            return firstDate;
        })();

        // Parse the time in 12H format to return a DateTime object on the firstDateOfClass
        let parseTime = function(timeString : string) {
            let matches = timeString.match(/(1?\d)\:([0-5]\d)/);
            let hour = parseInt(matches[1]);
            let minute = parseInt(matches[2]);

            let hoursOffset = 0;
            if (timeString.match(/PM/) && hour < 12) {
                hoursOffset = 12;
            }

            let dateTime = new Date(firstDateOfClass.getTime());
            dateTime.setHours(dateTime.getHours() + hour + hoursOffset);
            dateTime.setMinutes(dateTime.getMinutes() + minute);
            return dateTime;
        };

        this._startTimeOnFirstDate = convertToICalTimeString(parseTime(startTime));
        this._endTimeOnFirstDate = convertToICalTimeString(parseTime(endTime));
    }

    *printer(summary, description) : Generator<string> {
        yield 'BEGIN:VEVENT';
        yield 'DTSTART;TZID=America/Toronto:' + this._startTimeOnFirstDate;
        yield 'DTEND;TZID=America/Toronto:' + this._endTimeOnFirstDate;

        if (this._untilDateICal) {
            yield '' +
                'RRULE:FREQ=WEEKLY'             + ';' +
                'UNTIL=' + this._untilDateICal  + ';' +
                'WKST=SU'                       + ';' +
                'BYDAY=' + this._classDaysICal
            ;
        }

        yield 'SUMMARY:' + sanitizeOutput(this.fillPlaceholders(summary));
        yield 'LOCATION:' + this._location;
        yield 'DESCRIPTION:' + sanitizeOutput(this.fillPlaceholders(description));
        yield 'END:VEVENT';
    }

    fillPlaceholders(template : string) : string {
        let ret = template;

        for (let placeholder of Config.placeholders) {
            let key = '_' + placeholder.placeholder.substring(1);
            let regex = new RegExp('(' + placeholder.placeholder + ')', 'g');
            ret = ret.replace(regex, this[key]);
        }

        return ret;
    }
}

//---------------------------------------------------------------------
// Helpers
//---------------------------------------------------------------------

// Parse the days with classes string from quest and return a comma delimited list
// of weekdays in iCalendar format
function convertDaysToICal(days : Array<string>) {
    let WEEKDAY_NAME = {
        m: 'MO',
        t: 'TU',
        w: 'WE',
        h: 'TH',
        f: 'FR',
    };

    return days.map(day => WEEKDAY_NAME[day]).join(',');
};

function convertToICalTimeString(dateTime : NullableDate) : string {
    if (!dateTime) {
        return '';
    }

    return ''                              +
        dateTime.getFullYear()             +
        padNumber(dateTime.getMonth() + 1) +
        padNumber(dateTime.getDate())      +
        'T'                                +
        padNumber(dateTime.getHours())     +
        padNumber(dateTime.getMinutes())   +
        padNumber(dateTime.getSeconds())
    ;
}

// Escapes commas
function sanitizeOutput(text : string) {
    return text.replace(/,/g, '\\,');
}

// Convert n to string and pad it with 0 if it's less than 10
function padNumber(n : number) : string {
    return (n < 10 ? '0' : '') + n;
}

// Replace all whitespace (line breaks, multiple spaces) with a single space
function flatten(string) : string {
    let flatString = string.replace(/\s+/g, ' ');
    return flatString.trim();
}

// Assume dateString is 8 digits with 2 slashes in between (10 characters total)
function parseDate(dateFormatType : string, dateString : string) : Date {
    const args = dateString.split('/').map(i => parseInt(i));
    let year, month, day;

    switch (dateFormatType) {
        case 'DD/MM/YYYY': {
            year = args[2];
            month = args[1] - 1;
            day = args[0];
            break;
        }

        case 'MM/DD/YYYY': {
            year = args[2];
            month = args[0] - 1;
            day = args[1];
            break;
        }

        case 'YYYY/MM/DD': {
            year = args[0];
            month = args[1] - 1;
            day = args[2];
            break;
        }

        case 'YYYY/DD/MM': {
            year = args[0];
            month = args[2] - 1;
            day = args[1];
            break;
        }

        case 'MM/YYYY/DD': {
            year = args[1];
            month = args[0] - 1;
            day = args[2];
            break;
        }

        case 'DD/YYYY/MM': {
            year = args[1];
            month = args[2] - 1;
            day = args[0];
            break;
        }

        default: {
            // ¯\_(ツ)_/¯
            return new Date(dateString);
        }
    }

    return new Date(year, month, day);
}
