
const https = require('https');
const axios = require("axios");

const agent = new https.Agent({
    rejectUnauthorized: false
});

// const sleep = m => new Promise(r => setTimeout(r, m))

// var promise1 = Promise.resolve(3);
// var promise2 = 42;
// var promise3 = new Promise(function (resolve, reject) {
//     setTimeout(resolve, 100, 'foo');
// });
console.log('start')

Promise.all([getAllPosts(), getAllComments()]).then(function (values) {
    // console.log(values[0]['data']);
    // console.log(values[1]['data']);
    filter(values[0]['data'], values[1]['data']);
});

function filter(posts, comments) {

    function getTotalComments(postId) {
        return comments.filter(function (value) {
            return value['postId'] === postId;
        }).length;
    }
    // console.log('filter here');
    var result = posts.map(post => ({
        post_id: post['id'],
        post_title: post['title'],
        post_body: post['body'],
        total_number_of_comments: getTotalComments(post['id'])
    }));
    result = result.sort((a, b) => a['total_number_of_comments'] - b['total_number_of_comments'])
    console.log(result);

}


function getAllPosts() {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    return axios.get(url, { httpsAgent: agent })
}

function getAllComments() {
    let url = 'https://jsonplaceholder.typicode.com/comments';
    return axios.get(url, { httpsAgent: agent })
}

// post_id
// post_title
// post_body
// total_number_of_comments













function promise1() {
    return new Promise((resolve, reject) => {

        let url = 'https://jsonplaceholder.typicode.com/posts';
        return axios.get(url, { httpsAgent: agent })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });

}

function promise2() {
    return new Promise((resolve, reject) => {

        let url = 'https://jsonplaceholder.typicode.com/comments';
        axios.get(url, { httpsAgent: agent }).then(function (response) {
            resolve(response.data);
        })
            .catch(function (error) {
                reject(error);
            });
    });

}



function filterComment(body){
    

}