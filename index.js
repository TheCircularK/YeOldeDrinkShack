const listenPort = 3333;
const e = require("express");
let express = require("express");
let path = require('path');
const { resourceLimits } = require("worker_threads");
let app = express();
app.set("view engine","ejs");
app.use(express.static('images'));

app.use(express.urlencoded({extended:true}));

let knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        server: "PostgreSQL 14",
        user: "postgres",
        password: "password",
        database: "postgres",
        port: 5432
    },
    useNullAsDefault: true
});

app.listen(listenPort, function() {console.log("Listener active on port " +
listenPort); });

//AUTHORIZED VARIABLE
var authUser = true;

//LOGIN
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res) {
    knex('User').where("userID",req.body.userID)
    .andWhere('userPassword',req.body.userPassword)
    .then(result => {
        if (result.length > 0) {
            authUser = true;
            res.redirect("/")
        } else {
            res.redirect("/login")
        }
    });
});

//LOGOUT
//Honeslty, I don't think we need a post on this.
app.get("/logout", function(req, res) {
    authUser = false;
    res.render("login");
});

//MAIN PAGE - LIST OF DRINKS
app.get("/", (req, res) => {
    knex('Drink').orderBy('drinkID')
    .then(drinkInfo => {
        res.render("index",{drinkData: drinkInfo});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

//DRINKLIST - BEST DRINKS IN TOWN NOW ONLY $9.95 EACH PLEASE SIGN UP FOR OUR DRINK SUBSCRIPTION SERVICE AND DON'T FORGET TO LIKE AND SUBSCRIBE
app.get("/drinkList", (req, res) => {
     
    knex('Drink').orderBy('drinkID')
    .then(drinkInfo => {
        res.render("bestDrinks", {drinkData: drinkInfo});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

//ADD DRINK
app.get("/addDrink", function(req, res) {
    if (authUser === true) {
        res.render("addDrink")
    }
    else {
        res.redirect("/login");
    }
    
});

app.post("/addDrink", (req, res) => {
    if (authUser === true) {
        knex("Drink")
        .insert({
            drinkName: req.body.drinkName,
            drinkIngredients: req.body.drinkIngredients,
            drinkPrice: req.body.drinkPrice
        })
        .then(myDrink => {
            res.redirect("/");
        })
    }
    else {
        res.redirect("/login");
    }
    
});

//MODIFY STUFF
app.get("/editDrink/:drinkID", (req,res) => {
    if (authUser === true) {
        knex("Drink").where('drinkID', req.params.drinkID)
        .then(drinkInfo => {
            res.render('editDrink', {drinkData: drinkInfo});
        }).catch(err =>{
            console.log(err)
            res.status(500).json({err});
        });
    }
    else {
        res.redirect("/login");
    }
});

app.post("/editDrink", (req,res) => {
    if (authUser === true) {
        knex("Drink").where("drinkID", parseInt(req.body.drinkID))
        .update({
            drinkName: req.body.drinkName,
            drinkIngredients: req.body.drinkIngredients,
            drinkPrice: req.body.drinkPrice
        })
        .then(results => {
            res.redirect("/")
        }).catch(err =>{
            console.log(err);
            res.status(500).json({err});
        }); 
    }
    else {
        res.redirect("/login");
    }  
});

//DELETE STUFF
app.get("/deleteDrink/:drinkID", (req, res) => {
    if (authUser === true) {
        knex('Drink').where('drinkID', req.params.drinkID).del()
            .then(delResult => {
        res.redirect("/");
            }).catch(err => {
        console.log(err);
        res.status(500).json({err});
        });
    }
    else {
        res.redirect("/login");
    }
});