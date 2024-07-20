// integrated_service.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const myServiceDef = protoLoader.loadSync('../service.proto', {});
const anotherServiceDef = protoLoader.loadSync('../another_service.proto', {});
const myServiceProto = grpc.loadPackageDefinition(myServiceDef).mypackage;
const anotherServiceProto = grpc.loadPackageDefinition(anotherServiceDef).mypackage;

const anotherClient = new anotherServiceProto.AnotherService('localhost:50052', grpc.credentials.createInsecure());

const sayHello = (call, callback) => {
    callback(null, { message: `Hello, ${call.request.name}` });
};

const getTime = (call, callback) => {
    anotherClient.fetchData({ query: 'time' }, (error, response) => {
        if (!error) {
            callback(null, { currentTime: response.data });
        } else {
            console.error(error);
            callback(error, null);
        }
    });
};

const server = new grpc.Server();
server.addService(myServiceProto.MyService.service, { sayHello, getTime });
server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running at http://0.0.0.0:50053');
});
