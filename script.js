
// set the current date at the top of the scheduler
var thisDay = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(thisDay);
console.log(thisDay);


function colorTimeBlocks() {
    // get the current hour
    var momentHour = moment().hour();
    console.log(momentHour);

    // compare momentHour with the time blocks by using the div id attribute
    $(".row").each(function() {
        var rowId = $(this).attr("id");
        rowId = parseInt(rowId);
        // console.log(rowId, typeof rowId);
        
        if (momentHour > rowId) {
            // color the div grey
            $(this).addClass("time-past");
        } else if ( momentHour === rowId) {
            // color the div red
            $(this).addClass("time-present");
        } else {
            // color the div green
            $(this).addClass("time-future");
        }
    });
}

// run the function colorTimeBlocks
colorTimeBlocks();