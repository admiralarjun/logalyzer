// static/log_analyzer/js/home.js

$(document).ready(function () {
    // Initialize Materialize components
    M.AutoInit();

    // Real-time search
    $('#search_query').on('input', function () {
        var searchQuery = $(this).val().toLowerCase();
        $('.collection li').each(function () {
            var logFileName = $(this).text().toLowerCase();
            if (logFileName.includes(searchQuery)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
