var express = require('express');
var bodyParser = require('body-parser')

var pug = require('pug');
const path = require('path');
var fs = require('fs');

const app = express();

//------------------------------------------------------------------

    // -- Kör Servern -- //

        app.listen(3000, listening);

        function listening(){
            console.log("listening...")
        }
        console.log("server online");

    // -- Kör Servern -- //

//------------------------------------------------------------------ //

    // -- HÄMTAR LISTAN -- //

            //Hämtar lista:
            var unParsedJson = fs.readFileSync('movies.json');
            //parsar lista:
            var lista = JSON.parse(unParsedJson)

    // -- HÄMTAR LISTAN -- //

//------------------------------------------------------------------ //
   

//------------------------------------------------------------------

    // -- För PUG -- //

        app.set('view engine', 'pug');

        app.use(bodyParser.urlencoded({extended: true}));


    // -- För PUG -- //

//------------------------------------------------------------------ //

    //VISAR INDEX//

        app.get('/', function(request, response){
            return response.render('index', {lista})
        });

    //VISAR INDEX//

//------------------------------------------------------------------ //

//------------------------------------------------------------------ //

    //VISAR ALLA FILMER//

        app.get('/movies', function(request, response){
            return response.render('movies', {lista})
        });

    //VISAR ALLA FILMER//

//------------------------------------------------------------------ //

    // -- LÄGGER TILL FILMER -- //

        app.get('/add', function(request, response){
            return response.render('add_form', {lista})
        });

        app.get('/addsubmit', function(request, response){
            var movie = request.query.movie;
            var grade = parseInt(request.query.grade);
            var url = request.query.url;

            if(!grade){
                reply = '<h1 style="text-align:center">Score is needed</h1>';
            }
            else {
                //Lägger till film och betyg i lista
                var newMovie = {"Name": movie, "grade": grade, "Poster": url}

                lista.push(newMovie);

                var stringified = JSON.stringify(lista, null, 2);

                //skriver informationen till lista.json
                fs.writeFileSync('movies.json', stringified);

                // //Skickar ett meddelande tillbaka
                reply = `<h1 style="text-align:center">Congrats, you have added ${movie} and ${grade} to the list.</h1>`;
            }
            // response.send(reply);
            response.redirect('add');
        });

    // -- LÄGGER TILL FILMER -- //

//------------------------------------------------------------------ //

    //  -- SÖK  --  //
    
        app.get('/search', function(request, response){
            return response.render('search_form', {lista})
        });
        
        app.get('/searchsubmit', function(request, response){
            var movie = request.query.movie;
            var svar = "";
            for(var i = 0; i < lista.length; i++){

                if(lista[i].Name == movie){
                    var svar = {
                        "Name" : lista[i].Name, "Score" : lista[i].grade, "Poster" : lista[i].Poster
                    }
                }
            } 
            if(svar){
                response.render('search_result',{svar,lista})
            }
            else{
                response.send("Not found");
            }
        });

    //  -- SÖK  --  //

//------------------------------------------------------------------ //

    //  --  TA BORT EN FILM   --  //

        app.get('/remove', function(request, response){
            return response.render('remove_form', {lista})
        });

        app.get('/removesubmit', function(request, response){
            var movie = request.query.movie;
            var grade = request.query.grade;
            
            var reply = "";
            for(var i = 0; i < lista.length; i++){
                
                if(lista[i].Name == movie){
                    
                    //Prevents user from deleting origianl json files.
                    if(!lista[i].original){

                        lista.splice(i, 1)
                        
                        var stringified = JSON.stringify(lista, null, 2);
                        
                        //skriver informationen till lista.json
                        fs.writeFileSync('movies.json', stringified);
                        
                        svar = {movie}
                    }
                    else{
                        response.send("This movie can not be removed")
                    }
                } 
            }
            if(svar){
                response.render('removed_result',{svar,lista});   
            }
            else{
                response.send("Not found");
            }
        });

    //  --  TA BORT EN FILM  --  //

//------------------------------------------------------------------ //

