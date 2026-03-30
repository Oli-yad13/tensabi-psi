module.exports = {
  apps: [
    {
      name: 'tena-sabi-api',
      cwd: '/root/tena-sabi',
      script: 'npm',
      args: 'run start --workspace=@tena-sabi/api',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
    {
      name: 'tena-sabi-web',
      cwd: '/root/tena-sabi',
      script: 'npm',
      args: 'run start --workspace=@tena-sabi/web',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
