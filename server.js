import cors from 'cors';

const querystring = require('querystring');
var Request = require("request");

var express = require("express");
var app = express();
app.use(cors());

app.listen(4000, () => {
 console.log("Server running on port 4000");
});

app.get("/stations", (req, res, next) => {

	Request.get("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y", (error, response, body) => {
	    if(error) {
	        return console.dir(error);
	    }
	    console.dir(JSON.parse(body));
 		res.json(JSON.parse(body).root.stations);
	});
});

app.get("/trips", (req, res, next) => {
	if(req.query.source != "null" && req.query.destination != "null") {
		Request.get("http://api.bart.gov/api/sched.aspx?cmd=depart&orig=" + req.query.source + "&dest=" + req.query.destination + "&before=0&after=4&date=now&key=QEMQ-5X6J-9JTT-DWE9&json=y", (error, response, body) => {
		    if(error) {
		        return console.dir(error);
		    }
		    console.dir(JSON.parse(body));

		    let root = JSON.parse(body).root;
		    let schedule = root.schedule;
		    schedule.origin = root.origin;
		    schedule.destination = root.destination;

	 		res.json(schedule);
		});
	}
});

app.get("/station", (req, res, next) => {
	if(req.query.source != "null") {
		Request.get("http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=" + req.query.source + "&key=MW9S-E7SL-26DU-VV8V&json=y", (error, response, body) => {
		    if(error) {
		        return console.dir(error);
		    }
		    console.dir(JSON.parse(body));
	 		res.json(JSON.parse(body).root.stations.station);
		});
	}
});