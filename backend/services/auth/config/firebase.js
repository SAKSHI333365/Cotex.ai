import {cert,initializeApp} from "firebase-admin";

import serviceAccount from "../serviceAccontKey.json" with {type:"json"};

 export const app=initializeApp({
  credential: cert(serviceAccount)
});
