const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json')

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // If the program running index.js is not in current directory 

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/cats', (req, res) => {
    const cats = [
        'blue', 'rocket', 'monty', 'stephanie', 'winston'
    ];
    res.render('cats', {cats});
})

app.get('/r/:subreddit', (req,res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    // console.log(data);
    if (data) {
        res.render('subreddit', {...data});
    }
    else {
        res.render('notfound', {subreddit});
    }
})

app.get('/rand', (req,res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', {num}) // if variable name has to be same
    // res.render('random', {rand : num}); // object {variable name in ejs file : variable name here}
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})