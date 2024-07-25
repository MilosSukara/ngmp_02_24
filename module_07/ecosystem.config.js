module.exports = {
  apps: [{
    name: "ngmp-express-app",
    script: "src/index.ts",
    interpreter: "node_modules/.bin/ts-node",
    watch: true,
    ignore_watch: ["node_modules"],
    exec_mode: 'fork',
    instances: '1'
  }]
}
