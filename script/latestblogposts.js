const fs = require('fs')
const request = require('request')
const semver = require('semver')
const token = 'f14d90ff26f0bd8988f97a77a02510247b132a2a' //regenerate token every time before running get-releases script
var postList = []

var options = {
    url: 'https://api.github.com/repos/sensenet/sensenet.github.io/contents/_posts',
    json: true,
    headers: {
        'user-agent': 'Sensenet',
        'Authorization': 'token ' + token
    }
}

request(options, (error, response, body) => {
    const posts = body
        .map(post => {
            postList.push(post);
        })
        
        postList.reverse()
        .slice(0, 5)

    fs.writeFileSync('_data/latestblogposts.json', JSON.stringify(postList, null, 2))
})
