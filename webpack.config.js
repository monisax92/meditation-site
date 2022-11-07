const path = require("path");

const postCSSPlugins = [
  //install plugins and them here
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer")
];

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app") //where to create bundled file
  },
  devServer: {
    watchFiles: ["./app/**/*.html"],
    static: "./app", //"app"
    hot: true,
    port: 3000,
    host: "0.0.0.0" //so devices in the same network can reach the page - for this I need my local ip (ipconfig -> IPv4 Address) then in other device type [ip]:3000
  },
  mode: "development",
  //watch: true, //no needed when we have devServer on //webpack stays running once we run it once (otherwise we would need to ask to recreate bundled.js everytime we change sth)
  module: {
    rules: [
      {
        //what should webpack do when encounters css file
        test: /\.css$/i, //if this test is passed...
        use: [
          "style-loader",
          "css-loader", //?url=false means that we don't want webpack to manage our image files
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postCSSPlugins //can be another name than postCSSPlugins (variable created in the beginning of the file)
              }
            }
          }
        ] //... then use these package (css-loader understands and bundles css file into js file, and style-loader actually applies this css in the browser)
      }
    ]
  }
};
