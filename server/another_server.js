// another_server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('../another_service.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition).mypackage;

const fetchData = (call, callback) => {
    callback(null, { data: `Data for query: ${call.request.query}` });
};

const server = new grpc.Server();
server.addService(proto.AnotherService.service, { fetchData });
server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Another Server running at http://0.0.0.0:50052');
});
