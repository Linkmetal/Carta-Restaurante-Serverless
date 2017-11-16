module.exports = {
    "extends": "airbnb-base",
    "globals": {
        "window": true,
        "document": true
      },
    rules:{
        "linebreak-style": 0,
        "indent": ["error", 4],
        "quotes": ["error", "double"],
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true}],

      }
};