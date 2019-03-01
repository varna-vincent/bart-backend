// import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
var Request = require("request");

// const app = express();
// const router = express.Router();

var express = require("express");
var app = express();
app.use(cors());
// app.use(bodyParser.json());

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