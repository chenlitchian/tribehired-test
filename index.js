const express = require('express')
const app = express()
const port = 3000;
const https = require('https');
const axios = require("axios");

const agent = new https.Agent({
    rejectUnauthorized: false
});

var bodyParser = require('body-parser')
var methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(logErrors)
app.use(errorHandler)

function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/searchComments', async (req, res, next) => {
    try {
        let search = req.query.q;
        let comments = await getAllComments();
        if (comments) {
            let results = comments.data.filter((comment) => {
                return comment.name.toLowerCase().includes(search) ||
                    comment.email.toLowerCase().includes(search) ||
                    comment.body.toLowerCase().includes(search)
            });
            console.log(results.length);
            res.json(results);
        } else {
            res.send({
                status: 404,
                success: false
            });

        }
    } catch (error) {
        next(error);
    }


});

app.get('/getTopPosts', (req, res, next) => {
    getAllPosts().then((posts) => {
        getAllComments().then(async (comments) => {
            let result = await join(posts['data'], comments['data']);
            res.header("Content-Type", 'application/json');
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }).catch(err => {
        res.json(err);
        next(err);
    })
})

function join(posts, comments) { // 
    function getTotalComments(postId) {
        return comments.filter(function (value) {
            return value['postId'] === postId;
        }).length;
    }
    var result = posts.map(post => ({
        post_id: post['id'],
        post_title: post['title'],
        post_body: post['body'],
        total_number_of_comments: getTotalComments(post['id'])
    }));
    result = result.sort((a, b) => a['total_number_of_comments'] - b['total_number_of_comments'])
    return Promise.resolve(result);
}

function getAllPosts() {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    return axios.get(url, { httpsAgent: agent });
}

function getAllComments() {
    let url = 'https://jsonplaceholder.typicode.com/comments';
    return axios.get(url, { httpsAgent: agent });
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))