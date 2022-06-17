const config = {
  app: {
    dev: {
      neo_browser: "http://35.80.108.132:7474/browser/"
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
