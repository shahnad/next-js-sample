const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // Important: return the modified config
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/",
      },
      {
        source: "/users",
        destination: "/user-management/users",
      },
      {
        source: "/user/:slug",
        destination: "/user-management/edit-users",
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
