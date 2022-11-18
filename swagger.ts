import swaggerAutogen from 'swagger-autogen';

swaggerAutogen();

const doc = {
    info: {
      title: 'My API',
      description: 'Description',
    },
    host: 'localhost:3000',
    schemes: [''],
  };

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/account.router.ts', './src/routes/session.router.ts', './src/routes/transaction.router.ts', './src/routes/user.router.ts']

swaggerAutogen(outputFile, endpointsFiles, doc);