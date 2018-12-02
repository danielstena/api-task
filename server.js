var express = require('express');
var bodyParser = require('body-parser')

var pug = require('pug');
const path = require('path');
var fs = require('fs');

const app = express();

app.set(express.static("website"))

const fetch = require("node-fetch");

//------------------------------------------------------------------

    // -- Kör Servern -- //

        app.listen(3000, listening);

        function listening(){
            console.log("listening...")
        }
        console.log("server online");

    // -- Kör Servern -- //


// ------------------------------------------------------------------- //

//------------------------------------------------------------------//

    // -- För PUG -- //

        app.set('view engine', 'pug');

        app.use(bodyParser.urlencoded({extended: true}));

    // -- För PUG -- //

//------------------------------------------------------------------ //

//------------------------------------------------------------------//

    //VISAR INDEX//

        app.get('/', function(request, response){
            return response.render('index')
        });

    //VISAR INDEX//

//------------------------------------------------------------------//

//------------------------------------------------------------------ //

    //  -- SÖK  --  //
    
        app.get('/searchsubmit', function(request, response){
            
            var city = request.query.city;
            api_request(city);
            // response.redirect('/');
        });

    //  -- SÖK  --  //

//------------------------------------------------------------------ //
var list = {};

ggData = async function(stad){
   const urll = "http://api.openweathermap.org/data/2.5/weather?q="+stad+"&appid=d7ece5ce9d067035dec2e756f1368dfb";

   try {
       const response = await fetch(urll);
       const json = await response.json();

       list["temp"] = json.main.temp;
       list["lon"] = json.coord.lon;
       list["lat"] = json.coord.lat;
       list["name"] = json.name;

       console.log(list);
   } catch (error) {
       console.log(error);
   }
}
var list;

ggData = async function(stad){
   const urll = "http://api.openweathermap.org/data/2.5/weather?q=" + stad + "&units=metric&APPID=db46926eeb7e6616b39cc14986bf2b62";

   try {
       const response = await fetch(urll);
       const json = await response.json();
        list["weather"] = json.weather[0].description
        list["temp"] = json.main.temp;
        list["wind"] = json.wind.speed;
        list["name"] = json.name;

    //    console.log(json);
       return list;
   } catch (error) {
       console.log(error);
       return error;
   }
}
//------------------------------------------------------------------ //

    //RENDERERA RESULTATET

        function api_request(citiy_from_query){

            ggData(citiy_from_query).then(function(list) {
            
                app.get('/result', function(request, response){
                    
                    return response.render('result', {list})
                });

            })
        }

    //RENDERERA RESULTATET

//------------------------------------------------------------------ //

    // TEST FÖR ATT VISA VÄDER DÄR DU ÄR

    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude; 
    }