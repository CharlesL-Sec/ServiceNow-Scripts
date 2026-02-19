// GlideScript to output date in format "19th March 2026"
// Using Array method
// Charles London
// 19th February 2026
var glideDateGB = new GlideDateTime();
var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

var dayNames = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursdaay",
	"Friday",
	"Saturday",
	"Sunday"

];

gs.log(dayNames[glideDateGB.getDayOfWeek()]);
gs.log(monthNames[glideDateGB.getDayOfMonth()]);
gs.log(glideDateGB.getYear());
gs.log(glideDateGB.getDayOfMonthUTC());

// glideDateGB.SetDisplayValueLang("11/19/2023 03:47:00", "short", "en-GB");



// gs.info("en_GB date: " + glideDateGB.getDisplayValueLang("full"));
