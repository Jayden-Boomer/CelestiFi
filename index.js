import { PinataSDK } from "pinata";
//import 'dotenv/config';
// import * as dotenv from "dotenv"
// dotenv.config();

// Access the environment variables
const PINATA_JWT = "";
const GATEWAY_URL = "";

// console.log('JWT:', jwt);
// console.log('Gateway URL:', gateway);

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  //process.env.PINATA_JWT,
  pinataGateway: GATEWAY_URL,
  //process.env.GATEWAY_URL,
});
// console.log('Pinata initialized with JWT:', jwt);


async function main() {
  try {
    const file = new File(["Hello World"], "hello-world.txt", { type: "text/plain" });
    const upload = await pinata.upload.file(file);
    console.log(upload);
  } catch (error) {
    console.log(error);
  }
}

await main();