const grpc=require("@grpc/grpc-js")
const protoLoader=require("@grpc/proto-loader")

const packeageDefintion=protoLoader.loadSync("../test.proto",{})

const proto=grpc.loadPackageDefinition(packeageDefintion).mypackage;

function Hai(call,callback){
    callback(null,{place:`palakkad,${call.request.age}`})


}
const server=new grpc.Server()

server.addService(proto.newService.service,{Hai});
server.bindAsync('0.0.0.0:22233',grpc.ServerCredentials.createInsecure(),()=>{
    server.start()

    console.log("new service starting succesfully");
})