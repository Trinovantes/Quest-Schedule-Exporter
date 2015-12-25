require('babel-polyfill');
global.$ = require('jquery');

let QuestCalendarExporter = require('exporter');
let Config = require('config');


$(document).ready(function() {

    // Fill form with default values
    $('input#summary').val(Config.summary);
    $('input#description').val(Config.description);
    for (let placeholder of Config.placeholders) {
        let row =
            '<tr>' + 
                '<td><code>' + placeholder.placeholder + '</code></td>' +
                '<td>' + placeholder.description + '</td>' +
                '<td>' + placeholder.example + '</td>' +
            '</tr>'
        ;

        $('table#placeholders tbody').append(row);
    }

    // Listener for form submission
    $('form#mainForm').submit(function(event) {
        event.preventDefault();

        let questData = $('textarea#questData').val();
        let summary = $('input#summary').val();
        let description = $('input#description').val();

        let exporter = new QuestCalendarExporter(questData, summary, description);
        exporter.run();
    });

});
