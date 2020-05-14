import { CalendarExporter } from './CalendarExporter';

$.when($.ready).then(function() {

    $('button#generateBtn').click(function(event) {
        event.preventDefault();

        let dateFormatType = $('select#dateFormatType').val();
        let questData = $('textarea#questData').val();
        let summary = $('input#summary').val();
        let description = $('input#description').val();

        try {
            let exporter = new CalendarExporter(dateFormatType, questData, summary, description);
            exporter.run();
        } catch (e) {
            console.error(e);
            alert('Unable to generate iCalendar file! Please submit an issue on GitHub.');
        }
    });

});
