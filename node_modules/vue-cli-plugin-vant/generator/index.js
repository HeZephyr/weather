module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api)

  api.extendPackage({
    dependencies: {
      vant: '^2.0.5'
    }
  })

  api.injectImports(utils.getMain(), `import './plugins/vant.js'`)

  api.render({
    './src/plugins/vant.js': './templates/src/plugins/vant.js',
    './src/App.vue': './templates/src/App.vue'
  })

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-import': '^1.8.0'
      }
    })
  }

  if (opts.customTheme) {
    api.render({
      './src/vant-variables.less': './templates/src/vant-variables.less'
    })
    api.extendPackage({
      devDependencies: {
        'less-loader': '^4.0.6',
        less: '^2.7.3'
      }
    })
  }

  api.onCreateComplete(() => {
    if (opts.import === 'partial') {
      utils.updateBabelConfig(cfg => {
        const pluginComponent = [
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
          },
          'vant'
        ]
        cfg.plugins = cfg.plugins || []
        cfg.plugins.push(pluginComponent)
        return cfg
      })
    }
  })
}
