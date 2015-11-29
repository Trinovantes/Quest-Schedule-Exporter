module.exports = {

    MAX_COURSES: 20, // Nobody can take this many courses, right?

    filename: 'quest_schedule.ics',

    placeholders: [
        {
            placeholder: '@code',
            description: 'Course code',
            example:     'CS 452',
        },
        {
            placeholder: '@section',
            description: 'Course section number',
            example:     '001',
        },
        {
            placeholder: '@name',
            description: 'Name of the course',
            example:     'Real-time Programming',
        },
        {
            placeholder: '@type',
            description: 'Type of course',
            example:     'LEC',
        },
        {
            placeholder: '@location',
            description: 'Room for the course',
            example:     'DWE 3522A',
        },
        {
            placeholder: '@prof',
            description: 'Instructor for the course',
            example:     'William B Cowan',
        }
    ],

    summary: '@code @type in @location',

    description: '@code-@section: @name (@type) in @location with @prof',

};
