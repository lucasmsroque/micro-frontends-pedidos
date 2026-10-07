const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** Micro "menu": expõe o componente <Menu /> via Module Federation. */
module.exports = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'menu',
        filename: 'static/chunks/remoteEntry.js',
        exposes: { './Menu': './components/Menu.js' },
        shared: {}, // react e next já são compartilhados pelo plugin
        extraOptions: { exposePages: false },
      })
    );
    return config;
  },
};
