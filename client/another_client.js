// another_client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('../another_service.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition).mypackage;

const client = new proto.AnotherService('localhost:50052', grpc.credentials.createInsecure());

client.fetchData({ query: 'example' }, (error, response) => {
    if (!error) {
        console.log('Data:', response.data);
    } else {
        console.error(error);
    }
});
