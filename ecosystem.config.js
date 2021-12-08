module.exports = {
  apps : [
      {
        name: "API",
        script: "./main.js",
        watch: true,
        env: {
          "NODE_ENV": "development",
	  "GOOGLE_APPLICATON_CREDENTIALS": "/home/nodejs/FileHandling/auth.json"
        }
      }
  ]
}
