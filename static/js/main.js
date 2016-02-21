var startDate, endDate, startString, endString;
var months = 6;
var budget = savings;

function planTrip() {
	if(!destination) alert("Nowhere to go!");
	else if(!document.getElementById("start-date").value.replace(/^\s+|\s+$/g, '').match(/(\d{2}\/){2}\d{4}/)) alert("Provide a valid start date!");
	else if(!document.getElementById("end-date").value.replace(/^\s+|\s+$/g, '').match(/(\d{2}\/){2}\d{4}/)) alert("Provide a valid end date!");
	else {
		startDate = document.getElementById("start-date").value.replace(/^\s+|\s+$/g, '');
		endDate = document.getElementById("end-date").value.replace(/^\s+|\s+$/g, '');
		startString = startDate.substring(6, 10) + "-" + startDate.substring(0, 2) + "-" + startDate.substring(3, 5);
		endString = endDate.substring(6, 10) + "-" + endDate.substring(0, 2) + "-" + endDate.substring(3, 5);
		document.getElementById("rows").innerHTML = "";
		findFlight();
	}
}

function formatDate(dateString) {
	return(departureTime1.substring(departureTime1.indexOf("T"), departureTime1.lastIndexOf("-")));
}

function addToTable(data) {
	var str = "";
	str += "<tr><td>" + data[0] + "</td>";
	str += "<td>" + data[1] + "</td>";
	str += "<td><a href=\"" + data[4] + "\">" + data[2] + "</a></td>";
	str += "<td>" + data[3] + "</td>";
	str += '<td class="text-left"><a href="#" class="btn btn go-slide animated" data-animation="fadeIn" data-animation-delay="60" data-slide="subscribe">Remove</a></td></tr>';
	document.getElementById("rows").innerHTML += str;
}

function findFlight() {
  var airportFrom = "DTW"; //Always starting from Detroit
  var cityTo = destination.address_components[0].long_name;
  var url = "http://iatacodes.org/api/v4/autocomplete?api_key=1c5694b4-90da-4e17-89b1-12862c708769&query=" + cityTo;
  $.get(url, function(data) {
    airportTo = data.response.airports_by_cities[0];
    var passInfo = {
  "request": {
    "slice": [
      {
        "origin": "DTW",
        "destination": "WAS",
        "date": "2016-02-22"
      },
      {
        "origin": "WAS",
        "destination": "DTW",
        "date": "2016-02-23"
      }
    ],
    "passengers": {
      "adultCount": 1,
      "infantInLapCount": 0,
      "infantInSeatCount": 0,
      "childCount": 0,
      "seniorCount": 0
    },
    "solutions": 1,
    "refundable": false
  }
};
    /*$.post("https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBHUfsS5k8fWdr6V_151x2kFKoRgTUx_Io", JSON.stringify(passInfo), function(data) {*/
    var request = $.ajax({
	  	url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBHUfsS5k8fWdr6V_151x2kFKoRgTUx_Io",
	  	data: passInfo,
	  	contentType: "application/json",
	  	async: true,
	  	type: "POST"
    });
    request.complete(function(data) {
      var departureTime1 = formatString(data["tripOption"][0]["slice"][0]["segment"]["leg"]["departureTime"]);
      var arrivalTime1 = formatString(data["tripOption"][0]["slice"][0]["segment"]["leg"]["arrivalTime"]);
      var startTime = departureTime1 + " to " + arrivalTime1;
      var departureTime2 = formatString(data["tripOption"][0]["slice"][1]["segment"]["leg"]["departureTime"]);
      var arrivalTime2 = formatString(data["tripOption"][0]["slice"][1]["segment"]["leg"]["arrivalTime"]);
      var endTime = departureTime2 + " to " + arrivalTime2;
      var name1 = airportFrom + " to " + airportTo + "(" + data["tripOption"][0]["slice"][0]["flight"]["carrier"] + data["tripOption"][0]["slice"][0]["flight"]["number"] + ")";
      var name2 = airportTo + " to " + airportFrom + "(" + data["tripOption"][0]["slice"][1]["flight"]["carrier"] + data["tripOption"][0]["slice"][1]["flight"]["number"] + ")";
      var price = int(data["tripOption"][0]["pricing"]["saleTotal"].substring(3))/2;

      addToTable([startDate, startTime, name1, price, ""]);
      addToTable([endDate, endTime, name2, price, ""]);
    });
    //});
  });
}

function findHotel(longitude, latitude) {
	var url = "http://terminal2.expedia.com:80/x/hotels?maxhotels=500&location="+latitude+"%2C"+longitude+"&radius=10km&checkInDate="+startString+"&checkOutDate="+endString+"&adults=1&sort=starrating&order=desc&exclude=description%2Caddress%2Cthumbnailurl%2Camenitylist%2Cgeolocation";
	$.get(url, function(data) {
		var output = [];
		for(var i=0; i<data["HotelCount"]; i++) {
			
		}
	});
}