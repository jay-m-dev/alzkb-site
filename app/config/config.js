const config = {
  dev: {
    neo_browser: 'http://' + process.env.MYNGINX_NEO4J_BROWSER + ':7474/browser/',
  },
  prod: {
    neo_browser: 'http://' + process.env.MYNGINX_NEO4J_BROWSER + '/browser/'
  }
}
//const configOld = {
  //app: {
    //dev: {
      //neo_browser: "http://35.80.108.132:7474/browser/"
    //},
    //temp: {
      //neo_browser: "http://3.93.173.231:7474/browser/"
    //},
    //prod: {
      //neo_browser: "http://neo4j.alzkb.ai/browser/"
    //}
  //}
//}

if (process.env.NODE_ENV === "production") {
  module.exports = config.prod
//} else if (process.env.NODE_ENV === "development-temp") {
  //module.exports = config.app.temp
} else {
  module.exports = config.dev
}
