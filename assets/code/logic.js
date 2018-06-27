var getTrainVals = function (event) {
    //prevent refresh when hitting the button
    event.preventDefault();

    //get the values from the form
    var trainName = document.querySelector("#train-input").value.trim();
    var trainDest = document.querySelector("#destination-input").value.trim();
    var firstTrain = document.querySelector("#time-input").value.trim();
    var trainFrequency = document.querySelector("#freq-input").value.trim();
    var train = new trainShedule(trainName, trainDest, firstTrain, trainFrequency);
    console.log(train);
    var validation = moment(firstTrain, "HH:mm").isValid();
    //Input Validation
    while(true) {
        if(trainName !== "" && trainDest !== "" && firstTrain !== "" && trainFrequency !== "" && validation) {
            var train = new trainShedule(trainName, trainDest, firstTrain, trainFrequency);
            console.log("Made object")
            break;
        } else if(trainName === ""){
            alert("Train Name Required");
            return false;
        } else if (trainDest === "") {
            alert("Destination Required");
            return false;
        } else if (firstTrain === "") {
            alert("Train start time Required");
            return false;
        } else if (trainFrequency === "") {
            alert("Train Frequency required");
            return false;
        } else if (!validation) {
            alert("Time is not valid");
            return false;
        }
    }

    $('#train-input').val("");
    $('#destination-input').val("");
    $('#time-input').val("");
    $('#freq-input').val("");
    //store information into our database
    database.ref("/train").push(train);
}

var resetDB = function() {
    console.log("hello");
    database.ref("/train").remove();
    // location.reload(true);
    $('#train-table > tbody').empty();
}


document.getElementById('sub-train-btn').addEventListener("click", getTrainVals);
$('#clear-train-btn').on("click", resetDB);

database.ref("/train").on('child_added', function (snapshot) {
    //Grab train from firebase
    var name = snapshot.val().trainName;
    var dest = snapshot.val().trainDestination;
    var frequen = snapshot.val().trainFrequency;
    var trainStart = snapshot.val().firstTrain;
    //The trains start time in military time, subtracting a year to be before current time
    var time = moment(trainStart, "HH:mm").subtract(1, "years");
    //The time now
    var nowTime = moment();
    //get the difference in time between now and start time of train
    var timeDiff = moment().diff(moment(time), 'minutes');
    //the remainder of time before the next train
    var timeRemain = timeDiff % frequen;
    //How many minutes until the next train
    var tillTrain = frequen - timeRemain;
    //Add the minutes until train to current time, format it into local time with AM or PM
    var nextTime = nowTime.add(tillTrain, 'minutes').format("hh:mm A");

    var tilNext = tillTrain;

    var tableRow = $("<tr>").append(
        $("<td>").attr("scope", "row").text(name),
        $("<td>").attr("scope", "col").text(dest),
        $("<td>").attr("scope", "col").text(frequen),
        $("<td>").attr("scope", "col").text(nextTime),
        $("<td>").attr("scope", "col").text(tilNext + " minutes")
    );

    $('#train-table > tbody').append(tableRow);


})