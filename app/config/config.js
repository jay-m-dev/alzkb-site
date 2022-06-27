const config = {
  dev: {
    neo_browser: 'http://' + process.env.ALZKB_NEO4J_BROWSER + ':7474/browser/',
  },
  prod: {
    neo_browser: 'http://' + process.env.ALZKB_NEO4J_BROWSER + '/browser/'
  }
}

if (process.env.NODE_ENV === "production") {
  module.exports = config.prod
} else {
  module.exports = config.dev
}
