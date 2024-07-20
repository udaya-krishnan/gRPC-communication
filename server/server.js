// server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('../service.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition).mypackage;

const sayHello = (call, callback) => {
    callback(null, { message: `Hello, ${call.request.name}` });
};

const getTime = (call, callback) => {
    callback(null, { currentTime: new Date().toISOString() });
};

const server = new grpc.Server();
server.addService(proto.MyService.service, { sayHello, getTime });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running at http://0.0.0.0:50051');
});
