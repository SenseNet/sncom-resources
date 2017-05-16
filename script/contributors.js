const fs = require('fs')
const request = require('request')
const semver = require('semver')
const token = 'ca4e5c70afe175a7b19f6cd8c910d2b2e265907c' //regenerate token every time before running get-releases script
const ignoredRepos = ['sn-surveyeditor', 'lucenenet', 'hpop', 'jquery-toss-values', 'input-machinator']
const urls = []
const awesome = JSON.parse(fs.readFileSync('_data/awesome-sensenet.json', 'utf8'));
const contributors = [];

for (var i = 0; i < awesome.length; i++) {
    if (awesome[i].category !== 'community' && awesome[i].href.indexOf('github') > -1) {
        var url = awesome[i].href.replace('https://github.com', 'https://api.github.com/repos');
        url = url + '/contributors';
        urls.push(url);
    }
}

for (var j = 0; j < urls.length; j++) {
    var options = {
        url: urls[j],
        json: true,
        headers: {
            'user-agent': 'Sensenet',
            'Authorization': 'token ' + token
        }
    }

    request(options, (error, response, body) => {
        const contribs = body
            .map(contributor => {
                if (newContributor(contributor) && contributor.login !== 'gitter-badger' && contributor.login !== 'angular-cli') {
                    contributors.push(contributor);
                }
            })

        fs.writeFileSync('_data/contributors.json', JSON.stringify(contributors, null, 2))
    })
}

function newContributor(contributor) {
    var isNew = true;
    for (var i = 0; i < contributors.length; i++) {
        if (contributors[i].login === contributor.login)
            return false;
    }
    return true;
}
