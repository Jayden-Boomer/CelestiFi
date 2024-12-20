import { PinataSDK } from "pinata"
import "dotenv/config"
const PINATA_JWT = process.env.PINATA_JWT//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjJkYTlmNy04ZWJjLTQ4NDUtYjcwMi05MzNjYWNkMTBlMTgiLCJlbWFpbCI6ImtiaGFnYXZhdHVsYTEyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5ODY2N2E0NWU0ZDNiNDQ4Yjk3ZSIsInNjb3BlZEtleVNlY3JldCI6IjE0M2I0NmEwM2I3MmNkOWZhYWY1NDdmZjFkZjM4M2E1YjI5OTQ4NjE3ODJiYzQ4ZmNhYjdkZjYwNWEyYWNjZjMiLCJleHAiOjE3NjMzMjUwMTZ9.wujRdsZw66hFGW__2AzREhhVOqv-TFcYcdOecOkoRWY";
const GATEWAY_URL = process.env.GATEWAY_URL//"cyan-impossible-impala-669.mypinata.cloud";

const pinata = new PinataSDK({
    pinataJwt: PINATA_JWT,
    pinataGateway: GATEWAY_URL,
});

async function createGroup(){
    const group = await pinata.groups.create({
        name: "cool group",
        isPublic: false
    })
}

createGroup()