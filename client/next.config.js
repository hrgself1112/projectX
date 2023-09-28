// next.config.js

module.exports = {
    async rewrites() {
      return [
        {
          source: '/register', // Match any request that starts with "/api/"
          destination: 'http://localhost:8080/', // Forward the request to your backend server
        },
      ];
    },
  };
  