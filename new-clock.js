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

var convertColor = function (num) {
  var hex1 = Math.floor(num/16)
  var hex2 = (num%16)
  var hexCodes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D","E", "F"]
  hexVal = [hexCodes[hex1], hexCodes[hex2]]

  return hexVal.join("")
}


//this works. and i'm fine with that. but i am curious if i couldn't/shouldn't
//be making better use of an object to store variables like timeouts -
// or using more interval to fragment the process and make it more dynamic
var runClock = setInterval(function(){
	$(".display").each(function() {
		var $display = $(this)

		var tick=new Date()

		if ($display.attr("data-offset")) {
			tick=new Date()
			offset = $display.attr("data-offset")
			utc = tick.getTime() + (tick.getTimezoneOffset() * 60000)
			tick = new Date(utc + (3600000*offset))
		}

	  	var hour = tick.getHours()
	  	var minute = tick.getMinutes()
	  	var second = tick.getSeconds()
	  	hour=addZero(hour)
	  	minute = addZero(minute)
	  	second = addZero(second)

	  	 $($display.children(".clock")).text(hour+":"+minute+":"+second)

	  	var r = convertColor(convertTimeframe(hour, "hour"))
		var g = convertColor(convertTimeframe(minute, "minute"))
  		var b = convertColor(convertTimeframe(second, "second"))

  		$($display.children(".color-code")).text(r+"|"+g+"|"+b)

  		var colorSet = [r,g,b].join("")
  		$($display).css({"background-color":"#"+colorSet})

 		 $(".line").css({"margin-left": (87-(73/59)*second)+"%"})

	})
}, 1000)


var background = setInterval( function() {
	var $color = $(".display.active").css("background-color")
	$(".container").css({"background-color":$color})

}, 10)






$(document).on("ready", function(){

  $(".clock").addClass("active")

    $("#home").addClass("active")

  $(".display").on("click", function(){
      $(this).children().toggleClass("active")

  })

  $(".city").on("click", function(){
      $(".display.active").toggleClass("active")
      $(this).parents().addClass("active")
     
  })







})