const environments = {};

environments.development = {
    envName: 'Developnent',
    httpPort: 8080,
    httpsPort: 2424,
    secretKey: 'someSecretAreNotThatMuchOfAsecret'
};
environments.production = {
    envName: 'Production',
    httpPort:8000,
    httpsPort: 2400,
    secretKey: 'YeaahPushThisToGithupWhatAgreatIdea'
};

const currentEnvironment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

module.exports = typeof environments[currentEnvironment] == 'object' ? environments[currentEnvironment] : environments.development;
