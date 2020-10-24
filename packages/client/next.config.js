const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
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
      {
        source: "/posts",
        destination: "/posts/post-list",
      },
      {
        source: "/post/:slug",
        destination: "/posts/post-view",
      },
      {
        source: "/category",
        destination: "/category/category-list",
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    customKey: "https://jsonplaceholder.typicode.com/",
  },
};
