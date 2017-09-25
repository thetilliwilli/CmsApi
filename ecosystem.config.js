module.exports = {
  apps: [
    {
      name: 'CmsApi',
      script: 'server.js',
      env: {},
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      key: `C:/Users/Tilli/Downloads/id_rsa`,
      user: 'root',
      host: '95.213.248.123',
      ref: 'origin/master',
      repo: 'https://github.com/thetilliwilli/CmsApi.git',
      path: '/opt/CmsApi',
      "post-deploy" : "pm2 startOrRestart ecosystem.json --env production"
    }
  }
};
