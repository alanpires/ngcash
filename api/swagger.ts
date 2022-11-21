import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
      version: '1.0.0',
      title: 'NG Cash API',
      description: 'API that represents a value transfer system between NG Cash users',
    },
    host: 'localhost:9000',
    basePath: '/api',
    schemes: ['http'],
    consumes: ['application/json'], 
    produces: ['application/json'],
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    }
    },
    definitions: {
      User: {
        $username: 'john',
        $password: '12345678A',
      },
      UserCreated: {
          username: 'john',
          account: {
              balance: 100,
              id: '0205499a-b5d5-442e-ae22-bdf4cd66cf0b'
          },
          id: '0205499a-b5d5-442e-ae22-bdf4cd66cf0b',
      },
      Token: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NjY5MGUyNC0xNDA0LTQxYzYtOThiYi1kOTFjZGY1YzUxYzYiLCJ1c2VybmFtZSI6ImNhc2hPdXQiLCJhY2NvdW50SWQiOiIwMjA1NDk5YS1iNWQ1LTQ0MmUtYWUyMi1iZGY0Y2Q2NmNmMGIiLCJpYXQiOjE2Njg3ODcwODUsImV4cCI6MTY2ODg3MzQ4NX0.BzCDAdDHYcQz-6_f8AJSIczMhJcKiDJ0Gq0jrwwSvZE"
      },
      GetAccount: {
        id: "0205499a-b5d5-442e-ae22-bdf4cd66cf0b",
        balance: 110,
        cashIn: [
          {
            id: "220a1be2-3203-484f-bdc6-d13448dd7114",
            value: 25,
            createdAt: "2022-11-18T18:13:22.685Z",
            debitedAccount: {
              id: "b1cc2f78-68e9-48c3-81b1-6fe08a902d48"
            }
          }
        ],
        cashOut: [
          {
            id: "220a1be2-3203-484f-bdc6-d13448dd7114",
            value: 15,
            createdAt: "2022-11-18T18:13:22.685Z",
            creditedAccount: {
              id: "b1cc2f78-68e9-48c3-81b1-6fe08a902d48"
            }
          }
        ]
      },
      TransactionCreate: {
        $usernameCashIn: "peter",
        $value: 50
      },
      TransactionCreated: {
        id: "d09f9cd6-b521-489e-945c-525307668e3b",
        value: 50,
        createdAt: "2022-11-19T19:36:50.025Z",
        debitedAccount: {
          id: "0205499a-b5d5-442e-ae22-bdf4cd66cf0b",
          user: {
            id: "86690e24-1404-41c6-98bb-d91cdf5c51c6",
            username: "john"
          }
        },
        creditedAccount: {
          id: "b1cc2f78-68e9-48c3-81b1-6fe08a902d48",
          user: {
            id: "0ad75770-bd3d-420b-8662-10f10b5dc4fa",
            username: "peter"
          }
	      }
      },
      TransactionFilter: {
        $start_date: "2022-11-18",
        $end_date: "2022-11-19",
        cashIn: true,
        cashOut: true
      },
      TransactionFiltered: {
        cashIn: [
          {
            id: "220a1be2-3203-484f-bdc6-d13448dd7114",
            value: 10,
            createdAt: "2022-11-18T18:13:22.685Z",
            creditedAccount: {
              id: "b1cc2f78-68e9-48c3-81b1-6fe08a902d48"
            }
          }
        ],
	      cashOut: [
        {
          id: "220a1be2-3203-484f-bdc6-d13448dd7114",
          value: 15,
          createdAt: "2022-11-18T18:13:22.685Z",
          creditedAccount: {
            id: "b1cc2f78-68e9-48c3-81b1-6fe08a902d48"
          }
        }
      ]
      },
      TransactionListed: {
            id: "220a1be2-3203-484f-bdc6-d13448dd7114",
            value: 10,
            createdAt: "2022-11-18T18:13:22.685Z",
            creditedAccount: {
              id: "b1cc2f78-68e9-48c3-81b1-6fe08a902d48"
            }
      }
    }
  };

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/account.router.ts', './src/routes/session.router.ts', './src/routes/transaction.router.ts', './src/routes/user.router.ts']

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc).then(async() => {
  await import("./src/server")
})