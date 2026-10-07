const NextFederationPlugin = require('@module-federation/nextjs-mf');

// Endereço de cada micro (sobrescreva por variável de ambiente em outros ambientes)
const MENU_URL = process.env.MENU_URL || 'http://localhost:3001';
const ORDER_URL = process.env.ORDER_URL || 'http://localhost:3002';

module.exports = {
  webpack(config, { isServer }) {
    // O plugin gera o remoteEntry em "chunks" (browser) e "ssr" (servidor)
    const dir = isServer ? 'ssr' : 'chunks';
    config.plugins.push(
      new NextFederationPlugin({
        name: 'container',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          menu: `menu@${MENU_URL}/_next/static/${dir}/remoteEntry.js`,
          order: `order@${ORDER_URL}/_next/static/${dir}/remoteEntry.js`,
        },
        shared: {},
      })
    );
    return config;
  },
};
