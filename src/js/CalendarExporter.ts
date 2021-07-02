import Config from './config.json'
import { Course } from './Course'

// -----------------------------------------------------------------------------
// CalendarExporter
// -----------------------------------------------------------------------------

export class CalendarExporter {
    _dateFormatType: string
    _questData: string
    _summary: string
    _description: string
    _courses: Array<Course>

    constructor(dateFormatType: string, questData: string, summary: string, description: string) {
        this._dateFormatType = dateFormatType
        this._questData = questData
        this._summary = summary
        this._description = description
        this._courses = []
    }

    run(): void {
        // Store courses into 'this.courses' array
        this.parseData()

        // Returns a string of the calendar file
        const ical = this.generateCal()

        // Downloads file to user's computer
        this.downloadFile(ical)
    }

    private parseData(): void {
        const courseRegex = createCourseRegex()
        const sectionRegex = createSectionRegex(this._questData)

        let courseLoopCount = 0
        let courseMatches = null

        while (true) {
            if (courseLoopCount++ > Config.MAX_COURSES) {
                console.warn('Exceeded loop count while searching for courses')
                break
            }

            courseMatches = courseRegex.exec(this._questData)
            if (!courseMatches) {
                break
            }

            let sectionLoopCount = 0
            let sectionMatches = null

            while (true) {
                if (sectionLoopCount++ > Config.MAX_SECTIONS) {
                    console.warn('Exceeded loop count while searching for sections')
                    break
                }

                sectionMatches = sectionRegex.exec(courseMatches[0])
                if (!sectionMatches) {
                    break
                }

                if (sectionMatches[4] === 'TBA') {
                    continue
                }

                const course = new Course(
                    courseMatches[1],
                    courseMatches[2],

                    sectionMatches[2],
                    sectionMatches[3],
                    sectionMatches[8],
                    sectionMatches[9],

                    this._dateFormatType,
                    sectionMatches[5],
                    sectionMatches[6],
                    sectionMatches[7],
                    sectionMatches[10],
                    sectionMatches[11],
                )
                this._courses.push(course)
            }
        }

        if (courseLoopCount === 0 || courseLoopCount >= Config.MAX_COURSES) {
            // The search probably failed
            // Got an infinite loop or found nothing
            throw new Error('Failed Search')
        }
    }

    // See RFC2445 for more details
    // https://www.ietf.org/rfc/rfc2445.txt
    private generateCal(): string {
        let calendarContent = ''

        const addLine = function(line: string) {
            calendarContent += line + '\n'
        }

        addLine('BEGIN:VCALENDAR')
        addLine('VERSION:2.0')
        addLine('PRODID:-//questscheduleexporter.stephenli.ca//EN')

        for (const course of this._courses) {
            const printer = course.printer(this._summary, this._description)

            let next: IteratorResult<string>
            while (!(next = printer.next()).done) {
                addLine(next.value)
            }
        }

        addLine('END:VCALENDAR')

        return calendarContent
    }

    private downloadFile(content: string): void {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(content))
        element.setAttribute('download', Config.filename)
        element.style.display = 'none'

        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }
}

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function createCourseRegex(): RegExp {
    const courseHeaderPattern = '(\\w{2,5} \\d{3,4}) - (.*)'

    const anythingBeforePattern = function(pattern: string) {
        return '(?:(?!' + pattern + ')[\\w|\\W])*'
    }

    const regex =
        courseHeaderPattern + // Course code and name
        anythingBeforePattern(courseHeaderPattern) +
    ''

    return new RegExp(regex, 'g')
}

function createSectionRegex(questData: string): RegExp {
    const classNumberPattern = '\\d{4}'

    const timePattern = (function() {
        const timePattern12h = '1?\\d\\:[0-5]\\d[AP]M'
        const timePattern24h = '[0-2]\\d\\:[0-5]\\d'
        const is24h = /([0-5]\d[A|P]M)/.exec(questData) === null
        return is24h ? timePattern24h : timePattern12h
    })()

    const patternOrTba = function(pattern: string) {
        return '(' + pattern + '|TBA)\\s*'
    }

    const regex =
        '(' + classNumberPattern + ')\\s*' + // Class number
        '(\\d{3}\\s*)' + // Section
        '(\\w{3}\\s*)' + // Type (LEC, SEM, STU, LAB)
        patternOrTba(
            '([MThWF]{0,6})\\s*' + // Days
            '(' + timePattern + ')\\ -\\ ' + // Start time
            '(' + timePattern + ')\\s*' + // End time
            '',
        ) +
        patternOrTba(
            '[\\w\\ ]+\\s*[0-9]{1,5}[A-Z]?' + // Location
            '',
        ) +
        patternOrTba(
            '[A-Za-z_\\ \\-\\,\\s]+' + // Professor
            '',
        ) +
        '(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})\\ -\\ ' + // Start date
        '(\\d{2,4}\\/\\d{2,4}\\/\\d{2,4})' + // End date
    ''

    console.log(regex)

    return new RegExp(regex, 'g')
}
