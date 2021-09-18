const { override,fixBabelImports,addLessLoader } = require('customize-cra')

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            // '@primary-color':'#1DA57A',
            '@font-size-base': '16px'
        }
    }),
    fixBabelImports({
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    })
)