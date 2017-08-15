let lodash      = require("lodash"),
    baseConfig  = require("./base.config")

module.exports = lodash.merge(baseConfig, {
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    devtool: "inline-source-map"
})