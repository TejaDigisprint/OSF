const {createBuildConfigs} = require('@oracle-cx-commerce/rollup-config/index')

const options={
    extraExternals: ['react-slick','react-google-maps']
}

module.exports = createBuildConfigs(options)