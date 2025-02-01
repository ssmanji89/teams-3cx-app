module.exports = {
  apps: [
    {
      name: "teams-3cx-app-backend",
      script: "./backend/index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 443
      }
    }
  ]
};
