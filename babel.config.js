module.exports = function (api) {
  // const isProduction = api.cache(() => process.env.NODE_ENV === 'production');
  api.cache(true)

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    plugins: ['macros'],
  }
}
