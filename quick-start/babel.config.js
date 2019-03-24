module.exports = api => {
    api.cache(false)
    return {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "debug": false,
                    "targets": {
                        "browsers": ["android>4.0"]
                    }
                }
            ]
        ],
        "plugins": [
            [
                "@babel/plugin-proposal-class-properties",
                {
                    "loose": true
                }
            ]
        ],
    }

}