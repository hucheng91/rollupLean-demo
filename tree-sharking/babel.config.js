module.exports = api => {
    const isTest = api.env('test');
    if (isTest) {
        return {
            "presets": [
                [
                    "@babel/preset-env"
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