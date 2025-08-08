module.exports = {
  apps : [{
    name: 'sms-api-simtalk',
    script: 'dist/main.js',
    watch: false,
    out_file: '/usr/src/app/logs/out.log',
    error_file: '/usr/src/app/logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    env_dev: {
      NODE_ENV: 'dev',
    },

    env_prod: {
      NODE_ENV: 'prod',
    },
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
