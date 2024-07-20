// client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('../service.proto', {});
const anotherpackage=protoLoader.loadSync('../another_service.proto',{});
const testpackage=protoLoader.loadSync("../test.proto",{})
const proto = grpc.loadPackageDefinition(packageDefinition).mypackage;
const anotherproto=grpc.loadPackageDefinition(anotherpackage).mypackage;
const testproto=grpc.loadPackageDefinition(testpackage).mypackage

const client = new proto.MyService('localhost:50051', grpc.credentials.createInsecure());
const another_client=new anotherproto.AnotherService("localhost:50052",grpc.credentials.createInsecure())
const testclient=new testproto.newService("localhost:22233",grpc.credentials.createInsecure())

client.sayHello({ name: 'World' }, (error, response) => {
    if (!error) {
        console.log('Greeting:', response.message);
    } else {
        console.error(error);
    }
});

client.getTime({}, (error, response) => {
    if (!error) {
        console.log('Current Time:', response.currentTime);
    } else {
        console.error(error);
    }
});


another_client.fetchData({query:'Hello'},(error,response)=>{
    if(!error){
        console.log("udayan",response.data)
    }
})

testclient.hai({age:'20'},(error,response)=>{
    if(!error){
        console.log("testing....",response.place)
    }
})