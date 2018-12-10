module.exports = {
  apps : [
    {
      name: "dadi-foundation-api",
      script: "./api/server.js",
      autorestart: true,
      watch: true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    },
    {
      name: "dadi-foundation-web",
      script: "./web/server.js",
      autorestart: true,
      watch: true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    },
    {
      name: "dadi-foundation-publish",
      script: "./publish/server.js",
      autorestart: true,
      watch: true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    }
  ]
};
