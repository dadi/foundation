module.exports = {
  apps : [
    {
      name: 'dadi-foundation-api',
      cwd: './api',
      script: 'server.js',
      autorestart: true,
      watch: true,
      env: {
        'NODE_ENV': 'development',
        'PWD': '.'
      },
      env_production : {
        'NODE_ENV': 'production',
        'PWD': '.'
      }
    },
    {
      name: 'dadi-foundation-web',
      cwd: './web',
      script: 'server.js',
      autorestart: true,
      watch: true,
      env: {
        'NODE_ENV': 'development',
        'PWD': '.'
      },
      env_production : {
        'NODE_ENV': 'production',
        'PWD': '.'
      }
    },
    {
      name: 'dadi-foundation-publish',
      cwd: './publish',
      script: 'server.js',
      autorestart: true,
      watch: true,
      env: {
        'NODE_ENV': 'development',
        'PWD': '.'
      },
      env_production : {
        'NODE_ENV': 'production',
        'PWD': '.'
      }
    }
  ]
};
