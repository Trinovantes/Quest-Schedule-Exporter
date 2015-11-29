require('babel-polyfill');
global.$ = require('jquery');
let QuestCalendarExporter = require('exporter');
let Config = require('config');


$(document).ready(function() {

    // Fill form with default values
    $('input#summary').val(Config.summary);
    $('input#description').val(Config.description);
    for (let placeholder of Config.placeholders) {
        var row = 
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

        var questData = $('textarea#questData').val();
        var summary = $('input#summary').val();
        var description = $('input#description').val();

        var exporter = new QuestCalendarExporter(questData, summary, description);
        exporter.run();
    });

});
