import proxy from "express-http-proxy"

const proxyWithHeader=(serviceUrl)=>{
    if (!serviceUrl) {
        throw new Error("Chat service URL is not set");
    }

    return proxy(serviceUrl,{
       proxyReqOptDecorator:(proxyReqOpts,srcReq)=>{
        if(srcReq.user){
             proxyReqOpts.headers["x-user-id"]=srcReq.user.userId
        }
        return proxyReqOpts;
       }
    })
}

export default proxyWithHeader;