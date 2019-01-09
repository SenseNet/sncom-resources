const fs = require('fs')
const request = require('request')
// const token = '6b7e2a9825b06d13db95a1398a61cc9dec37eebf' //regenerate token every time before running get-releases script

const repos = ['sensenet', 'sn-client-dotnet', 'sn-webpages', 'sn-security', 'sn-preview']
const releaseArr = [];

for (var i = 0; i < repos.length; i++) {
  const name = repos[i];
  const options = {
    url: 'https://api.github.com/repos/sensenet/' + name + '/releases?per_page=100',
    json: true,
    headers: {
      'user-agent': 'Sensenet',
      'Authorization': 'token ' + token
    }
  }
  releaseArr.push({
    name: repos[i],
    releases: []
  })
  request(options, (error, response, body) => {
    if (error) return console.log(error)
    if (response.statusCode !== 200) return console.error(response)

    const releases = body
      .filter(release => !release.draft)
      .map(release => {
        if (release.tag_name.indexOf('v') === 0)
          release.version = release.tag_name.substring(1)
        else
          release.version = release.tag_name;
        delete release.assets
        delete release.author

        release.body = release.body.replace(
          / #(\d+)$/gm,
          ' <a href="https://github.com/sensenet/sensenet/pull/$1">#$1</a>'
        )

        return release
      })
      .sort((a, b) => compare(b.version, a.version))


    const repoObj = getRepo(name);
    repoObj.releases = releases
    fs.writeFileSync('_data/releases.json', JSON.stringify(releaseArr, null, 2))
  })
}

function getRepo(name) {
  for (var i = 0; i < releaseArr.length; i++) {
    if (releaseArr[i].name === name)
      return releaseArr[i]
  }
}

function compare(a,b) {
  if (a < b)
    return -1;
  if (a > b)
    return 1;
  return 0;
}
