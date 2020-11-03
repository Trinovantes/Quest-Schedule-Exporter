import Config from './config.json'

// -----------------------------------------------------------------------------
// Course
// -----------------------------------------------------------------------------

type NullableDate = Date | null

enum Weekdays {
    Mon = 'm',
    Tues = 't',
    Wed = 'w',
    Thurs = 'h',
    Fri = 'f',
}

const WeekdaysIndex: {[key in Weekdays]: number} = {
    [Weekdays.Mon]: 1,
    [Weekdays.Tues]: 2,
    [Weekdays.Wed]: 3,
    [Weekdays.Thurs]: 4,
    [Weekdays.Fri]: 5,
}

const WeekdaysName: {[key in Weekdays]: string} = {
    [Weekdays.Mon]: 'MO',
    [Weekdays.Tues]: 'TU',
    [Weekdays.Wed]: 'WE',
    [Weekdays.Thurs]: 'TH',
    [Weekdays.Fri]: 'FR',
}

export class Course {
    private meta: {[key: string]: string}
    private classDaysICal: string
    private untilDateICal: string
    private startTimeOnFirstDate: string
    private endTimeOnFirstDate: string

    constructor(code: string, name: string, section: string, type: string, location: string, prof: string, dateFormat: string, classDays: string, startTime: string, endTime: string, startDate: string, endDate: string) {
        this.meta = {
            code: code,
            name: name,
            section: flatten(section),
            type: flatten(type),
            location: flatten(location),
            prof: flatten(prof),
        }

        // ---------------------------------------------------------------------
        // Parse dates
        // ---------------------------------------------------------------------

        const daysWithClasses = classDays
            .replace(/Th/g, 'H') // Replace 'Th' with H key
            .toLowerCase() // Set to lowercase to match keys in the above mappings
        this.classDaysICal = convertDaysToICal(Array.from(daysWithClasses))

        // If it's a repeating event (e.g. lecture), then return a DateTime object
        // otherwise (e.g. midterm), then return undefined
        const untilDate: NullableDate = (function() {
            if (startDate === endDate) {
                return null
            }

            const lastDateOfClass = parseDate(dateFormat, endDate)
            lastDateOfClass.setHours(23)
            lastDateOfClass.setMinutes(59)
            return lastDateOfClass
        })()
        this.untilDateICal = convertToICalTimeString(untilDate)

        // Advance start date of term to first day of class
        // e.g. term start on Jan 4 (Mon) but first day of a class is on Jan 5 (Tues)
        const firstDateOfClass: Date = (function() {
            const firstDate = parseDate(dateFormat, startDate)
            const daysWithClassesNumbers = daysWithClasses.split('').map((d) => WeekdaysIndex[d as Weekdays])

            let dayCounter = 0
            const MAX_DAY_ADVANCEMENT = 365

            while (!daysWithClassesNumbers.includes(firstDate.getDay()) && dayCounter++ < MAX_DAY_ADVANCEMENT) {
                if (dayCounter === MAX_DAY_ADVANCEMENT) {
                    throw new Error('Invalid first date of class')
                }

                firstDate.setDate(firstDate.getDate() + 1)
            }

            return firstDate
        })()

        // Parse the time in 12H format to return a DateTime object on the firstDateOfClass
        const parseTime = function(timeString: string): NullableDate {
            const matches = /(1?\d):([0-5]\d)/.exec(timeString)
            if (!matches) {
                return null
            }

            const hour = parseInt(matches[1])
            const minute = parseInt(matches[2])

            let hoursOffset = 0
            if (/PM/.exec(timeString) && hour < 12) {
                hoursOffset = 12
            }

            const dateTime = new Date(firstDateOfClass.getTime())
            dateTime.setHours(dateTime.getHours() + hour + hoursOffset)
            dateTime.setMinutes(dateTime.getMinutes() + minute)
            return dateTime
        }

        this.startTimeOnFirstDate = convertToICalTimeString(parseTime(startTime))
        this.endTimeOnFirstDate = convertToICalTimeString(parseTime(endTime))
    }

    *printer(summary: string, description: string): Generator<string> {
        yield 'BEGIN:VEVENT'
        yield 'DTSTART;TZID=America/Toronto:' + this.startTimeOnFirstDate
        yield 'DTEND;TZID=America/Toronto:' + this.endTimeOnFirstDate

        if (this.untilDateICal) {
            yield '' +
                'RRULE:FREQ=WEEKLY' + ';' +
                'UNTIL=' + this.untilDateICal + ';' +
                'WKST=SU' + ';' +
                'BYDAY=' + this.classDaysICal
        }

        yield 'SUMMARY:' + sanitizeOutput(this.fillPlaceholders(summary))
        yield 'LOCATION:' + this.meta.location
        yield 'DESCRIPTION:' + sanitizeOutput(this.fillPlaceholders(description))
        yield 'END:VEVENT'
    }

    fillPlaceholders(template: string): string {
        let ret = template

        for (const placeholder of Config.placeholders) {
            const key = placeholder.placeholder.substring(1)
            const regex = new RegExp('(' + placeholder.placeholder + ')', 'g')
            ret = ret.replace(regex, this.meta[key])
        }

        return ret
    }
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

// Parse the days with classes string from quest and return a comma delimited list
// of weekdays in iCalendar format
function convertDaysToICal(days: Array<string>) {
    return days.map((day) => WeekdaysName[day as Weekdays]).join(',')
}

function convertToICalTimeString(dateTime: NullableDate): string {
    if (!dateTime) {
        return ''
    }

    return '' +
        dateTime.getFullYear().toString() +
        padNumber(dateTime.getMonth() + 1) +
        padNumber(dateTime.getDate()) +
        'T' +
        padNumber(dateTime.getHours()) +
        padNumber(dateTime.getMinutes()) +
        padNumber(dateTime.getSeconds())
}

// Escapes commas
function sanitizeOutput(text: string) {
    return text.replace(/,/g, '\\,')
}

// Convert n to string and pad it with 0 if it's less than 10
function padNumber(n: number): string {
    return n.toString().padStart(2, '0')
}

// Replace all whitespace (line breaks, multiple spaces) with a single space
function flatten(s: string): string {
    const flatString = s.replace(/\s+/g, ' ')
    return flatString.trim()
}

// Assume dateString is 8 digits with 2 slashes in between (10 characters total)
function parseDate(dateFormatType: string, dateString: string): Date {
    const args = dateString.split('/').map((i) => parseInt(i))
    let year; let month; let day

    switch (dateFormatType) {
        case 'DD/MM/YYYY': {
            year = args[2]
            month = args[1] - 1
            day = args[0]
            break
        }

        case 'MM/DD/YYYY': {
            year = args[2]
            month = args[0] - 1
            day = args[1]
            break
        }

        case 'YYYY/MM/DD': {
            year = args[0]
            month = args[1] - 1
            day = args[2]
            break
        }

        case 'YYYY/DD/MM': {
            year = args[0]
            month = args[2] - 1
            day = args[1]
            break
        }

        case 'MM/YYYY/DD': {
            year = args[1]
            month = args[0] - 1
            day = args[2]
            break
        }

        case 'DD/YYYY/MM': {
            year = args[1]
            month = args[2] - 1
            day = args[0]
            break
        }

        default: {
            // ¯\_(ツ)_/¯
            return new Date(dateString)
        }
    }

    return new Date(year, month, day)
}
