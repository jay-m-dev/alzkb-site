const config = {
  app: {
    dev: {
      neo_browser: "http://3.93.173.231:7474/browser/"
    },
    prod: {
      neo_browser: "http://neo4j.alzkb.ai/browser/"
    }
  }
}

if (process.env.NODE_ENV === "production") {
  module.exports = config.app.prod
} else {
  module.exports = config.app.dev
}
