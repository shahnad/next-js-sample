const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
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
      {
        source: "/category/create",
        destination: "/category/create-category",
      },
      {
        source: "/types",
        destination: "/types/type-list",
      },
      {
        source: "/type/:slug",
        destination: "/types/edit-type",
      },
      {
        source: "/types/create",
        destination: "/types/create-type",
      },
      {
        source: "/services",
        destination: "/services/service-list",
      },
      {
        source: "/services/create",
        destination: "/services/create-service",
      },
      {
        source: "/service/:slug",
        destination: "/services/edit-service",
      },
    
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    customKey: "https://jsonplaceholder.typicode.com/",
    apiUrl:"http://localhost:3100/"
  },
};
