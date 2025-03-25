module.exports = {
  apps: [
    {
      name: "Uznews.uz",
      port: 3072,
      exec_mode: "cluster",
      instances: "1",
      script: "./.output/server/index.mjs",
      args: "preview",
    },
  ],
};
