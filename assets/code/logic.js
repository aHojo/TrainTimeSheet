var getTrainVals = function (event) {
    //prevent refresh when hitting the button
    event.preventDefault();

    //get the values from the form
    var trainName = document.querySelector("#train-input").value.trim();
    var trainDest = document.querySelector("#destination-input").value.trim();
    var firstTrain = document.querySelector("#time-input").value.trim();
    var trainFrequency = document.querySelector("#freq-input").value.trim();
    var train = new trainShedule(trainName, trainDest, firstTrain, trainFrequency);

    //store information into our database
    database.ref("/train").push(train);
}


document.getElementById('sub-train-btn').addEventListener("click", getTrainVals);

database.ref("/train").on('child_added', function (snapshot) {
    var name = snapshot.val().trainName;
    var dest = snapshot.val().trainDestination;
    var frequen = snapshot.val().trainFrequency;
    var trainStart = snapshot.val().firstTrain;
    var time = moment(trainStart, "HH:mm").subtract(1, "years");
    var nowTime = moment();
    var timeDiff = moment().diff(moment(time), 'minutes');
    var timeRemain = timeDiff % frequen;
    var tillTrain = frequen - timeRemain;
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