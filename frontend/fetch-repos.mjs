import https from 'https';

const options = {
  hostname: 'api.github.com',
  path: '/users/BuirT/repos?sort=updated&per_page=5',
  headers: {
    'User-Agent': 'Node.js'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    try {
      const repos = JSON.parse(data);
      repos.forEach(repo => {
        console.log(`- ${repo.name}: ${repo.description} (Language: ${repo.language}, Stars: ${repo.stargazers_count})`);
      });
    } catch(e) {
      console.error(e);
    }
  });
}).on('error', err => {
  console.error('Error: ', err.message);
});
