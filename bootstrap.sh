# For react
yarn add react react-dom prop-types react-router-dom

# For webpack
yarn add --dev webpack \
    webpack-dev-server \
    clean-webpack-plugin

# Loaders
yarn add --dev css-loader \ 
    style-loader \
    stylus-loader \
    url-loader \
    file-loader

# For babel
yarn add --dev babel-core \
    babel-loader \
    babel-preset-env \
    babel-preset-react \
    babel-eslint

yarn add babel-polyfill

yarn add --dev babel-plugin-autobind-class-methods \
    babel-plugin-transform-class-properties \
    babel-plugin-add-module-exports \
    babel-plugin-transform-export-extensions \
    babel-plugin-transform-es2015-modules-commonjs

# For Jest
yarn add --dev jest \
    babel-jest \
    react-test-renderer \
    enzyme \    # For React dom tree manipulation
    identity-obj-proxy # For mocking css-modules

# For serve the files
yarn add --dev http-server

# Utils
yarn add lodash moment qs axios

# UIKit
yarn add uikit jquery

# React
yarn add redux \
    redux-actions \
    redux-promise-middleware \
    react-router-redux \
    react-redux \
    history