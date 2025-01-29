const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // For minification
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // For CSS extraction
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Minify CSS

module.exports = {
  mode: 'production', // Set to 'production' for optimized build
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'umd', // Key change: Output as UMD module
    library: 'MyLibraryName', // Optional: Set a name for your library (if needed)
    umdNamedDefine: true, // Important for some UMD consumers
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // Adicione as extensões .ts e .tsx
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        // CSS, SASS, SCSS
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS (if using Sass/SCSS)
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({}),
      new CssMinimizerPlugin(), // Minify CSS
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/favicon.ico',
      minify: {
        // Minify HTML
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      // Extract CSS
      filename: 'styles.[contenthash].css', // Add hash to CSS file name
    }),
  ],
};
