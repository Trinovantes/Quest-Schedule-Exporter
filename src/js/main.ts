import '../css/main.less'
import { CalendarExporter } from './CalendarExporter';
import $ from 'jquery'

$.when($.ready).then(() => {

    $('button#generateBtn').on('click', (event) => {
        event.preventDefault();

        const dateFormatType = $('select#dateFormatType').val() as string;
        const questData = $('textarea#questData').val() as string;
        const summary = $('input#summary').val() as string;
        const description = $('input#description').val() as string;

        try {
            const exporter = new CalendarExporter(dateFormatType, questData, summary, description);
            exporter.run();
        } catch (e) {
            console.error(e);
            alert('Unable to generate iCalendar file! Please submit an issue on GitHub.');
        }
    });

});
