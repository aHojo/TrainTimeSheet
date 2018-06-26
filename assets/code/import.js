// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBbLogOsy8A9ljZW72LyJsOmszioWOMgsw",
    authDomain: "trainschedule-60069.firebaseapp.com",
    databaseURL: "https://trainschedule-60069.firebaseio.com",
    projectId: "trainschedule-60069",
    storageBucket: "trainschedule-60069.appspot.com",
    messagingSenderId: "769418864787"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
 
  //train object
  var trainShedule = function (name, destination, firstTrain, frequency) {
    this.trainName = name;
    this.trainDestination = destination;
    this.firstTrain = firstTrain;
    this.trainFrequency = frequency;
}
