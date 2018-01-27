module.exports = {
  website: {
    title: 'www.example.com'
  },
  piwik: {
    url: 'https://piwik.example.com',
    siteId: 1,
    clientTrackerName: 'piwik.js',
    serverTrackerName: 'piwik.php'
  },
  backend: {
    url: 'https://app.example.com/api',
  },
  auth: {
    githubUrl: 'https://github.com/login/oauth/authorize?client_id={CLIENT_ID}&state=%STATE%&redirect_uri={APP_URL}/login?provider=github',
  }
}
