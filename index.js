//Database Login:
//username: lab3-db
//password: doodleapp

//Anytime you want to connect to db:

//const db = require("./dbutils");
//const db_con = db.newConnection();

const db = require("./dbutils");
const { response } = require('express');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({extended: true}));
app.use(cookieParser("my little secret"));

app.get('/', (req, res, next) => {
    res.redirect("/index.html");
})

app.post('/add-doodle',(req,res) => {
    let name = req.body.name;
    let days = "";
    days = req.body.day1?"1":"0";
    days = req.body.day2?days+"1":days+"0";
    days = req.body.day3?days+"1":days+"0";
    days = req.body.day4?days+"1":days+"0";
    days = req.body.day5?days+"1":days+"0";
    days = req.body.day6?days+"1":days+"0";
    days = req.body.day7?days+"1":days+"0";
    days = req.body.day8?days+"1":days+"0";
    days = req.body.day9?days+"1":days+"0";
    days = req.body.day10?days+"1":days+"0";

    const db_con = db.newConnection();
    db_con.connect();
 
    //have two values to send, both are string so need to be surrounded with quote
    db_con.query(`INSERT INTO Doodle VALUES ('${name}','${days}');`,(err,rows,field) => {
        if(err)
            console.log(err);

        db_con.end();
        //send the req to another path
        res.redirect('/guest-form');
    });
})

app.post('/replace-doodle',(req,res) => {
    let name = req.body.name;
    let days = "";
    days = req.body.day1?"1":"0";
    days = req.body.day2?days+"1":days+"0";
    days = req.body.day3?days+"1":days+"0";
    days = req.body.day4?days+"1":days+"0";
    days = req.body.day5?days+"1":days+"0";
    days = req.body.day6?days+"1":days+"0";
    days = req.body.day7?days+"1":days+"0";
    days = req.body.day8?days+"1":days+"0";
    days = req.body.day9?days+"1":days+"0";
    days = req.body.day10?days+"1":days+"0";
    const db_con = db.newConnection();
    db_con.connect();
    //Doodle is the table you created
    db_con.query('SELECT * FROM Doodle', (error, rows, fields) => {
    for (r of rows) {
        if (r.name == name)
        {
            //have two values to send, both are string so need to be surrounded with quote
            db_con.query(`REPLACE INTO Doodle VALUES ('${name}','${days}');`,(err,rows,field) => {
                if(err)
                    console.log(err);
                db_con.end();
                //send the req to another path
                res.redirect('/updated-doodle');
            });
        }
    }
    });
});


app.get ('/updated-doodle', (req,res,next) => {
    const db_con = db.newConnection();
    db_con.connect();
    //Doodle is the table you created
    db_con.query('SELECT * FROM Doodle', (error, rows, fields) => {
    let dbContent = "";
    
    //To clear the table:
    //rows=null;
    //db_con.query("DROP Table Doodle");

    for (r of rows) {
        console.log(rows);
        dbContent += `<div><input type = "text" value = '${r.name}' disabled></input>`
        let i = 1
        for (s of r.days) {
            dbContent += `<input type = 'checkbox' disabled `
            if (s == 1)
                dbContent += 'checked'

            dbContent += `> Day${i} </input>`
            i += 1;
        }
        dbContent += `</div>`
    }

    console.log(rows);
    let content = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Doodle App</title>
                    </head>
                    <body>
                        <h1 style="font-size:15px; font-family:courier; text-align:left;">Here is the updated content:</h1>
                        ${dbContent}
                        <br/><br/>
                        <form action = '/login-form' method = 'GET'>
                        <p align="center"><button type="submit" style = "text-align:center">Edit more</button></p>
                        </form>
                        <form action = '/' method = 'GET'>
                        <p align="center"><button type="submit" style = "text-align:center">Back to homepage</button></p>
                        </form>
                    </body>
                    </html>`;
            res.send(content);
        })
    db_con.end();   
});

app.get('/guest-form', (req,res,next) => {
    const db_con = db.newConnection();
    db_con.connect();
    //Doodle is the table you created
    db_con.query('SELECT * FROM Doodle', (error, rows, fields) => {
    let dbContent = "";
    
    //To clear the table:
    //rows=null;
    //db_con.query("DROP Table Doodle");

    for (r of rows) {
        console.log(rows);
        dbContent += `<div><input type = "text" value = '${r.name}' disabled></input>`
        let i = 1
        for (s of r.days) {
            dbContent += `<input type = 'checkbox' disabled `
            if (s == 1)
                dbContent += 'checked'

            dbContent += `> Day${i} </input>`
            i += 1;
        }
        dbContent += `</div>`
    }

    console.log(rows);
    let content = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Doodle App</title>
                    </head>
                    <body>
                        <h1 style="font-size:15px; font-family:courier; text-align:left;">Welcome to the guest page! Please enter your name and the days you are available: </h1>
                        <form action = '/add-doodle' method = 'POST'>
                            <input type = "text" name = "name">
                            <input type = "checkbox" name = "day1">Day1</input>
                            <input type = "checkbox" name = "day2">Day2</input>
                            <input type = "checkbox" name = "day3">Day3</input>
                            <input type = "checkbox" name = "day4">Day4</input>
                            <input type = "checkbox" name = "day5">Day5</input>
                            <input type = "checkbox" name = "day6">Day6</input>
                            <input type = "checkbox" name = "day7">Day7</input>
                            <input type = "checkbox" name = "day8">Day8</input>
                            <input type = "checkbox" name = "day9">Day9</input>
                            <input type = "checkbox" name = "day10">Day10</input>
                            ${dbContent}
                            <br/><br/>
                            <p align="center"><button type="submit" style = "text-align:center">Save</button></p>
                        </form>
                        <form action = '/' method = 'GET'>
                        <p align="center"><button type="submit" style = "text-align:center">Back to homepage</button></p>
                        </form>
                    </body>
                    </html>`;
            res.send(content);
        })
    db_con.end();   
});

app.post('/login', (req, res) => {
    console.log(req.cookies.usr);
    console.log(req.cookies.usr);
    let userName = req.body.usr;
    let password = req.body.pwd;
    let msg = "Access Denied";
    if (userName == "admin" && password == "123") {
        res.cookie("usr",userName);
        res.cookie("pwd",password, {signed:true});

        const db_con = db.newConnection();
        db_con.connect();
        //Doodle is the table you created
        db_con.query('SELECT * FROM Doodle', (error, rows, fields) => {
        let dbContent = "";
        
        //To clear the table:
        //rows=null;
        //db_con.query("DROP Table Doodle");
    
        for (r of rows) {
            console.log(rows);
            dbContent += `<div><input type = "text" value = '${r.name}' disabled></input>`
            let i = 1
            for (s of r.days) {
                dbContent += `<input type = 'checkbox' disabled `
                if (s == 1)
                    dbContent += 'checked'
    
                dbContent += `> Day${i} </input>`
                i += 1;
            }
            dbContent += `</div>`
        }
    
        console.log(rows);
        let content = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Doodle App</title>
                        </head>
                        <body>
                            <h1 style="font-size:15px; font-family:courier; text-align:left;">Welcome to the admin page! Please enter the name you want to edit and the updated times available: </h1>
                            <form action = '/replace-doodle' method = 'POST'>
                                <input type = "text" name = "name">
                                <input type = "checkbox" name = "day1">Day1</input>
                                <input type = "checkbox" name = "day2">Day2</input>
                                <input type = "checkbox" name = "day3">Day3</input>
                                <input type = "checkbox" name = "day4">Day4</input>
                                <input type = "checkbox" name = "day5">Day5</input>
                                <input type = "checkbox" name = "day6">Day6</input>
                                <input type = "checkbox" name = "day7">Day7</input>
                                <input type = "checkbox" name = "day8">Day8</input>
                                <input type = "checkbox" name = "day9">Day9</input>
                                <input type = "checkbox" name = "day10">Day10</input>
                                ${dbContent}
                                <br/><br/>
                                <p align="center"><button type="submit" style = "text-align:center">Save</button></p>
                                </form>
                        </form>
                        </body>
                        </html>`;
                res.send(content);
            })
        db_con.end();   
    }
    else{res.send(msg);}
});

app.get("/login-form", (req, res) => {
    let userName = req.cookies.usr || "";
    let password = req.signedCookies.pwd || "";
    let content =
        `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Doodle App</title>
    </head>
    <body>
        <form action = '/login' method = 'post'>
            username: <input name = 'usr' value = '${userName}' type = 'text'/>
            <br/>
            password: <input name = 'pwd' value = '${password}' type = 'text'/>
            <br/>
            <input type = "submit"/>
        </form>
    </body>
    </html>
    `;
    res.send(content);
});

//serve static content - creates a virtual routing (path) to all the content of the static directory
app.use(express.static('static'));

//listeners:
app.listen(80);


