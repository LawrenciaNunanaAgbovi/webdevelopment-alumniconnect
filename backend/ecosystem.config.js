module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'index.js',
      env: {
        PORT: 3001,
        MONGO_URI: 'mongodb+srv://lagbovi:abish%40123@cluster0.q34se9p.mongodb.net/project2db?retryWrites=true&w=majority&appName=Cluster0',
        ACCESS_TOKEN_SECRET: 'b08028db28588feac3892d6c0cc51a96ad5c850200af2ae6c1a9db3b9a38e1f70059c28b5a08cf7bec3ad7b713a5fc5dc4d30d05dba6267bbf66650ffb067981',
        REFRESH_TOKEN_SECRET: '5e9558c3d0aacfd2fba83633d7c7edaba5cdb3498218e95eebb7495fdde7bc3ab6e5a84d8b3680130d29118dad5249c894bc40d48ad466e0f2598606540e7c58',
      },
    },
  ],
};
