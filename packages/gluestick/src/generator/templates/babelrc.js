module.exports = (createTemplate) => {
  const template = createTemplate`
    {
      "presets": [
        "react",
        "es2015", 
        "stage-0"
      ],
      "env": {
        "development": {
          "plugins": [
            ["react-transform", {
              "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              }, {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }]
            }]
          ]
        }
      }
    }
  `;
  return template;
};
