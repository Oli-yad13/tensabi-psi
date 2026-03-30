const cwd = process.env.TENA_SABI_CWD || '/root/tena-sabi';
const apiPort = process.env.TENA_SABI_API_PORT || 3001;
const webPort = process.env.TENA_SABI_WEB_PORT || 3000;

module.exports = {
  apps: [
    {
      name: 'tena-sabi-api',
      cwd,
      script: 'npm',
      args: 'run start --workspace=@tena-sabi/api',
      env: {
        NODE_ENV: 'production',
        PORT: apiPort,
      },
    },
    {
      name: 'tena-sabi-web',
      cwd,
      script: 'npm',
      args: 'run start --workspace=@tena-sabi/web',
      env: {
        NODE_ENV: 'production',
        PORT: webPort,
      },
    },
  ],
};
