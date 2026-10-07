const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** Micro "order": expõe o componente <Order /> via Module Federation. */
module.exports = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'order',
        filename: 'static/chunks/remoteEntry.js',
        exposes: { './Order': './components/Order.js' },
        shared: {}, // react e next já são compartilhados pelo plugin
        extraOptions: { exposePages: false },
      })
    );
    return config;
  },
};
