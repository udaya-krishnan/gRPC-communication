const grpc=require('@grpc/grpc-js')
const protoLoader=require("@grpc/proto-loader")

const packagedefinition=protoLoader.loadSync('../user.proto',{})

const proto=grpc.loadPackageDefinition(packagedefinition).hello


function User(call,callback){
    callback(null,{age:20,place:"palakkad"+`${call.request.name}`})
}

const server= new grpc.Server()

server.addService(proto.UserService.service,{ User })

server.bindAsync('0.0.0.0:12345',grpc.ServerCredentials.createInsecure(),()=>{
    server.start()

    console.log("server starting port 12345");
})


