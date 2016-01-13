let Config = require('config');


class Course {
    constructor(options) {
        this._code     = options.code;
        this._name     = options.name;

        this._section  = Course._flatten(options.section);
        this._type     = Course._flatten(options.type);
        this._location = Course._flatten(options.location);
        this._prof     = Course._flatten(options.prof);

        [
            this._classDays,
            this._untilDate,
            this._startTimeOnFirstDate,
            this._endTimeOnFirstDate,
        ] = Course._parseDateTime(
            options.classDays,
            options.startDate,
            options.endDate,
            options.startTime,
            options.endTime
        );
    }

    *print(summary, description) {
        yield 'BEGIN:VEVENT';
        yield 'DTSTART;TZID=America/Toronto:' + this._startTimeOnFirstDate;
        yield 'DTEND;TZID=America/Toronto:' + this._endTimeOnFirstDate;

        if (this._untilDate) {
            yield '' +
                'RRULE:FREQ=WEEKLY'             + ';' +
                'UNTIL=' + this._untilDate      + ';' +
                'WKST=SU'                       + ';' +
                'BYDAY=' + this._classDays
            ;
        }

        yield 'SUMMARY:' + Course._sanitizeOutput(this._fillPlaceholders(summary));
        yield 'LOCATION:' + this._location;
        yield 'DESCRIPTION:' + Course._sanitizeOutput(this._fillPlaceholders(description));
        yield 'END:VEVENT';
    }

    //-------------------------------------------------------------------------
    // Helpers 
    //-------------------------------------------------------------------------

    static _flatten(string) {
        // Replace all whitespace (line breaks, multiple spaces) with a single space
        let flatString = string.replace(/\s+/g, ' ');
        return $.trim(flatString);
    }

    static _parseDate(dateString) {
        // Assume dateString is XX/XX/XXXX

        const LANGUAGE = window.navigator.userLanguage || window.navigator.language;
        const args = dateString.split('/');
        let date;

        switch (LANGUAGE) {
            case 'en-US': {
                // MM/DD/YYYY
                date = new Date(args[2], args[0] - 1, args[1]);
                break;
            }

            case 'en-GB':
            case 'en-CA': {
                // DD/MM/YYYY
                date = new Date(args[2], args[1] - 1, args[0]);
                break;
            }

            default: {
                // ¯\_(ツ)_/¯
                date = new Date(dateString);
            }
        }

        return date;
    }

    static _parseDateTime(classDays, startDateString, endDateString, startTimeString, endTimeString) {
        const daysWithClasses = classDays
            .replace(/Th/g, 'H') // Replace 'Th' with H key
            .toLowerCase();      // Set to lowercase to match keys in the above mappings

        // Parse the days with classes string from quest and return a comma delimited list
        // of weekdays in iCalendar format
        const parseDaysWithClasses = function () {
            let WEEKDAY_NAME = {
                m: 'MO',
                t: 'TU',
                w: 'WE',
                h: 'TH',
                f: 'FR',
            };

            let classDaysString = '';

            for (let i = 0; i < daysWithClasses.length; i++) {
                if (i > 0) {
                    classDaysString += ',';
                }

                let key = daysWithClasses[i];
                classDaysString += WEEKDAY_NAME[key];
            }

            return classDaysString;
        };

        // If it's a repeating event (e.g. lecture), then return a DateTime object
        // otherwise (e.g. midterm), then return undefined
        const untilDate = (function() {
            if (startDateString !== endDateString) {
                let lastDateOfClass = Course._parseDate(endDateString);
                lastDateOfClass.setHours(23);
                lastDateOfClass.setMinutes(59);
                return lastDateOfClass;
            }
        })();

        // Advance start date of term to first day of class
        // e.g. term start on Jan 4 (Mon) but first day of a class is on Tues (Jan 5)
        const firstDateOfClass = (function() {
            let WEEKDAY_NUMBER = {
                m: 1,
                t: 2,
                w: 3,
                h: 4,
                f: 5,
            };

            let firstDate = Course._parseDate(startDateString);
            let daysWithClassesNumbers = daysWithClasses.split('').map(d => WEEKDAY_NUMBER[d]);

            while (!daysWithClassesNumbers.includes(firstDate.getDay())) {
                firstDate.setDate(firstDate.getDate() + 1);
            }

            return firstDate;
        })();

        // Parse the time in 12H format to return a DateTime object on the firstDateOfClass
        let parseTime = function(timeString) {
            let matches = timeString.match(/(1?\d)\:([0-5]\d)/);
            let hour = parseInt(matches[1]);
            let minute = parseInt(matches[2]);

            let hoursOffset = 0;
            if (timeString.match(/PM/) && hour < 12) {
                hoursOffset = 12;
            }

            let dateTime = new Date(firstDateOfClass);
            dateTime.setHours(dateTime.getHours() + hour + hoursOffset);
            dateTime.setMinutes(dateTime.getMinutes() + minute);
            return dateTime;
        };

        return [
            parseDaysWithClasses(),
            Course._convertToICalTimeString(untilDate),
            Course._convertToICalTimeString(parseTime(startTimeString)),
            Course._convertToICalTimeString(parseTime(endTimeString)),
        ];
    }

    static _sanitizeOutput(text) {
        // Escapes commas
        return text.replace(/,/g, '\\,');
    }

    static _padNumber(n) {
        // Convert n to string and pad it with 0 if it's less than 10
        return (n < 10 ? '0' : '') + n;
    }

    static _convertToICalTimeString(dateTime) {
        if (typeof dateTime === 'undefined') {
            return undefined;
        }

        return ''                                      +
            dateTime.getFullYear()                     +
            Course._padNumber(dateTime.getMonth() + 1) +
            Course._padNumber(dateTime.getDate())      +
            'T'                                        +
            Course._padNumber(dateTime.getHours())     +
            Course._padNumber(dateTime.getMinutes())   +
            Course._padNumber(dateTime.getSeconds())
        ;
    }

    _fillPlaceholders(text) {
        for (let placeholder of Config.placeholders) {
            let key = '_' + placeholder.placeholder.substring(1);
            let regex = new RegExp('(' + placeholder.placeholder + ')', 'g');
            text = text.replace(regex, this[key]);
        }

        return text;
    }
}

module.exports = Course;
