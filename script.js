// array to hold event objects
var eventArray = [];

// set the current date at the top of the scheduler
var thisDay = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(thisDay);

// loads events from local storage.
var loadEvents = function() {
    // Store event information in local variable
    var savedEvents = localStorage.getItem("storedEvents");
    // if no tasks stored locally, log message to console and return out of function
    if (!savedEvents) {
        return console.log("No saved events to load. Sorry.");
    }
    console.log("Saved events found!");
    // parse savedEvents into an array of objects
    eventArray = JSON.parse(savedEvents);
    // console.log(typeof eventArray, eventArray);

    // look at each DOM element with class .hour (i.e. the div with the time string)
    // and perform the anonymous function as shown
    $(".hour").each(function () {
        // store the div's text value
        var theHour = $(this).text();
        
        for(let i = 0; i < eventArray.length; i++){
            // if the div's text value is equal to the object's time property
            // then load the object's description property into the textarea
            // this is effectively accomplishing persistence by having the
            // information remain even after refreshing the page.
            if(theHour == eventArray[i].time) {
                var eventDescription = eventArray[i].description;
                $(this).next().val(eventDescription);
            }
        }
    }
    )

};

// saves events to local storage
$(".save-button").on("click", function () {
    var eventDescription = $(this).siblings(".event-descrip").val();
    var eventTime = $(this).siblings(".hour").text();
    // create object with properties time and description
    var myEvent = {
        time: eventTime,
        description: eventDescription
    }
    // append object to eventArray
    eventArray.push(myEvent)
    // save to local storage
    localStorage.setItem("storedEvents", JSON.stringify(eventArray));
});

function colorTimeBlocks() {
    // get the current hour
    var momentHour = moment().hour();
    // console.log(momentHour);
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
// run the function loadEvents
loadEvents();

