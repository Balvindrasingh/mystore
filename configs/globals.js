require("dotenv").config();

const configurations = {
  ConnectionStrings: {
    MongoDB: "mongodb+srv://b026singh:XCqpu2HJedMtHMWH@storecluster.y9bxc.mongodb.net/?retryWrites=true&w=majority&appName=StoreCluster",
  },
  Authentication: {
    Google: {
      ClientId: "Iv23liPXbjVcXqSwTaEY",
      ClientSecret: "bf1a5e12d21c5d657d6b6d64d4a7cf3a6672bf82",
      CallbackUrl: "http://localhost:3000/auth/google/callback"
    },
  }  
};
module.exports = configurations;
