/*
  This function takes in two parameters: a number, and a string.
  The number represents the amount of hours/minutes/seconds.
  The string represents the unit, and is one of
    * "hour"
    * "minute"
    * "second"

  It returns a whole number value from 0-255 representing the
  relative CSS RGB value of that time period.

  It's pre-written for you. Best to not muck around with it.
*/
var convertTimeframe = function(amount, unit) {

  switch (unit) {
    case "hour":
    case "hours":
      return Math.round((amount / 23) * 255)
    case "minute":
    case "minutes":
    case "second":
    case "seconds":
      return Math.round((amount / 59) * 255)
    default:
      return 0;
  }
}

var addZero = function(num) {
  if (num<10) {
    num = "0" + num
  }
  return num
}




//make a clock

var runClock = setInterval(function() {
//get the current time
  var tick = new Date();
  //grab each value
  var hour = tick.getHours()
  var minute = tick.getMinutes()
  var second = tick.getSeconds()
  hour=addZero(hour)
  minute = addZero(minute)
  second = addZero(second)
  $(".clock").text(hour+":"+minute+":"+second)

  var r = convertColor(convertTimeframe(hour, "hour"))
  var g = convertColor(convertTimeframe(minute, "minute"))
  var b = convertColor(convertTimeframe(second, "second"))


  //convert to hex code

  //send to color-code display
  $(".color-code").text(r+"|"+g+"|"+b)

  var colorSet = [r,g,b].join("")


  $(".container").css({"background-color":"#"+colorSet})

  $(".line").css({"width": second+"%"})

}, 1000)



var convertColor = function (num) {
  var hex1 = Math.floor(num/16)
  var hex2 = (num%16)
  var hexCodes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D","E", "F"]
  hexVal = [hexCodes[hex1], hexCodes[hex2]]

  return hexVal.join("")
}



$(document).on("ready", function(){

  $(".clock").addClass("active")

  $(".display").on("click", function(){
      $(".clock").toggleClass("active")
      $(".color-code").toggleClass("active")
  })





})