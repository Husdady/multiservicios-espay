require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  distDir: 'build',
  images: {
    domains: ['res.cloudinary.com', 'multiservicios-espay.netlify.app'],
  },
  webpack: (config) => {
    // Enable enviroment variables
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )

    // Return custom config
    return config;
  }
}