/* eslint-disable */
const path = require('path');

const { useBabelRc, override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    '@Constants': path.resolve(__dirname, './src/constants'),
    '@SharedComponents': path.resolve(__dirname, './src/components'),
    '@Services': path.resolve(__dirname, './src/services'),
    '@Pages': path.resolve(__dirname, './src/pages'),
    '@HOCs': path.resolve(__dirname, './src/HOCs'),
    '@Images': path.resolve(__dirname, './src/images'),
    '@Contexts': path.resolve(__dirname, './src/contexts'),
  })
);
