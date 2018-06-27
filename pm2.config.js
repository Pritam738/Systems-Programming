module.exports = {
  apps : [
      {
        name: "Target Monitor",
        script: "./index.js",
        watch: true,
        instance_var: 'INSTANCE_ID',
      }
  ]
}
