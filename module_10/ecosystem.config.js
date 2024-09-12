require('dotenv').config();
let config = {
  apps: [{
    name: "ngmp-env-app",
    script: "src/index.ts",
    interpreter: "node_modules/.bin/ts-node",
    env_production: {
      PORT: process.env.PORT,
      NODE_ENV: 'production'
    },
    env_test: {
      PORT: process.env.PORT,
      NODE_ENV: 'test'
    },
    env: {
      PORT: process.env.PORT,
      NODE_ENV: 'test'
    },
    exec_mode: 'fork',
    instances: '1'
  }]
};

module.exports = config; 
