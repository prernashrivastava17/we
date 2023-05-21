module.exports = {
    apps : [
        {
          name: "primeSolutionMarket",
          script: "./server.js",
          watch: true,
          env: {
            "NODE_ENV": "development",
          }
        }
    ]
  }