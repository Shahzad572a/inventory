module.exports = {
    apps: [
      {
        name: "inventory-management",
        script: "npm",
        args: "run start",
        env: {
          NODE_ENV: "development",
          ENV_VAR1: "environment-variable",
        },
      },
    ],
  };