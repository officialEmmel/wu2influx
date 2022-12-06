import { env } from "process";

import dotenv from "dotenv";
dotenv.config();

const WeatherUndergroundNode = require("weather-underground-node");

import { Database } from "./database";

var myApyKey = env.WEATHER_UNDERGROUND_API_KEY;
var wunderground = new WeatherUndergroundNode(myApyKey);

function getWeather() {
  console.log("Started at " + new Date().toISOString());
  console.log(" Getting weather data from Weather Underground...");
  wunderground
    .PWSCurrentConditions(env.WEATHER_UNDERGROUND_STATION_ID)
    .request(function (err: any, response: any) {
      if (err) {
        console.log(err);
      } else {
        console.log(" Writing weather data to InfluxDB...");
        var db = new Database(env.INFLUXDB_HOST, env.INFLUXDB_DATABASE);
        db.writeData({
          temp: response.observations[0].metric.temp,
          heatIndex: response.observations[0].metric.heatIndex,
          dewpt: response.observations[0].metric.dewpt,
          windChill: response.observations[0].metric.windChill,
          windSpeed: response.observations[0].metric.windSpeed,
          windGust: response.observations[0].metric.windGust,
          pressure: response.observations[0].metric.pressure,
          precipRate: response.observations[0].metric.precipRate,
          precipTotal: response.observations[0].metric.precipTotal,
          elev: response.observations[0].metric.elev,
          obsTimeUtc: response.observations[0].obsTimeUtc,
          obsTimeLocal: response.observations[0].obsTimeLocal,
          winddir: response.observations[0].winddir,
          humidity: response.observations[0].humidity,
        })
          .then(() => {
            console.log(" Data written to database");
          })
          .catch((err: any) => {
            console.log(" Error writing data to database");
            console.log(err);
          });
      }
      console.log("Finished at " + new Date().toISOString());
      console.log("----------------------------------------");
    });
}

console.log(
  "Welcome! Starting weather data collection with following settings:\n"
);
console.log(" Weather Underground API Key: " + env.WEATHER_UNDERGROUND_API_KEY);
console.log(
  " Weather Underground Station ID: " + env.WEATHER_UNDERGROUND_STATION_ID
);
console.log(" InfluxDB Host: " + env.INFLUXDB_HOST);
console.log(" InfluxDB Database: " + env.INFLUXDB_DATABASE);
// @ts-ignore
console.log(" Request Interval: " + env.REQUEST_INTERVAL / 1000 + " seconds\n");
console.log("----------------------------------------");
// @ts-ignore
setInterval(getWeather, env.REQUEST_INTERVAL);
