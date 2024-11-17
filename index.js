import { PinataSDK } from "pinata";
//import 'dotenv/config';
// import * as dotenv from "dotenv"
// dotenv.config();

// Access the environment variables
const PINATA_JWT = process.env.PINATA_JWT//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjJkYTlmNy04ZWJjLTQ4NDUtYjcwMi05MzNjYWNkMTBlMTgiLCJlbWFpbCI6ImtiaGFnYXZhdHVsYTEyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5ODY2N2E0NWU0ZDNiNDQ4Yjk3ZSIsInNjb3BlZEtleVNlY3JldCI6IjE0M2I0NmEwM2I3MmNkOWZhYWY1NDdmZjFkZjM4M2E1YjI5OTQ4NjE3ODJiYzQ4ZmNhYjdkZjYwNWEyYWNjZjMiLCJleHAiOjE3NjMzMjUwMTZ9.wujRdsZw66hFGW__2AzREhhVOqv-TFcYcdOecOkoRWY";
const GATEWAY_URL = process.env.GATEWAY_URL//"cyan-impossible-impala-669.mypinata.cloud";


const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  //process.env.PINATA_JWT,
  pinataGateway: GATEWAY_URL,
  //process.env.GATEWAY_URL,
});
// console.log('Pinata initialized with JWT:', jwt);

const file = new File(["ever since i was a jit kdfl;sfdafkfsfhfghfgfh"], "testing.txt", { type: "text/plain" });
async function upload(file, groupId) {
  try {
    const groups = await pinata.groups.list()
    const group = groups.groups[0].id
    const dateStrings  = new Date().toLocaleString().split(',')
    const date = dateStrings[0]
    const time = dateStrings[1]
    const upload = await pinata.upload.file(file).group(group).addMetadata({
      keyvalues: {
        "date": date,
        "foo": "bar"
      },
    })
    // console.log(new Date().toISOString())
    console.log(upload);
    return upload;
  } catch (error) {
    console.log(error);
  }
}


async function uploadFake(file, groupId, date) {
  try {
    const groups = await pinata.groups.list()
    const group = groups.groups[0].id
    const dateStrings  = new Date().toLocaleString().split(',')
    const time = dateStrings[1]
    const upload = await pinata.upload.file(file).group(group).addMetadata({
      keyvalues: {
        "date": new Date(date),
        "time": time
      },
    })
    // console.log(new Date().toISOString())
    console.log(upload);
    return upload;
  } catch (error) {
    console.log(error);
  }
}


async function fetchFileByName(fileName) {
  try {
    // List files with the specified name filter
    const response = await pinata.files.list().name(fileName).limit(1); // Limit results for optimization

    // Check if any files are returned
    if (response.files && response.files.length > 0) {
      const file = response.files[0]; // Assuming the first result is desired
      console.log("File found:", file);
     
      return file;
    } else {
      console.log("No file found with the name:", fileName);
      return null;
    }
  } catch (error) {
    console.error("Error fetching file by name:", error.message);
    // Handle error or retry logic as needed
  }
}

export default async function fetchData(selectedDate) {
    console.log("fetch data!");
    try {
        const groups = await pinata.groups.list();
        const group = groups.groups[0].id; // Assuming you want to use the first group

        // Fetch all files
        const response = await pinata.files.list(); 
        const allFiles = response.files;

        // Filter files based on the selected date
        const filteredFiles = allFiles.filter(file => {
            // Compare the date in file.keyvalues.date with selectedDate
            return new Date(file.keyvalues.date) < new Date(selectedDate);
        });

        console.log(filteredFiles); // Output the filtered files
        return filteredFiles;

    } catch (error) {
        console.log("Error fetching files:", error);
    }
}

async function getFiles() {
    // Example of fetching files (this could be from a database, API, etc.)
    return [
        { name: 'File 1', date: new Date('2023-01-01') },
        { name: 'File 2', date: new Date('2023-02-01') },
        { name: 'File 3', date: new Date('2023-03-01') },
        // Add more files as needed
    ];
}
async function uploadFakes(){
  const array = await getFiles()
  array.forEach(element => {
    const newfile = new File(["ever since i was a jit kdfl;sfdafkfsfhfghfgfh" + element.name], element.name+".txt", { type: "text/plain" });
    uploadFake(newfile, 0, element.date);
  });
}
// await uploadFakes();
// await upload(file, 0, new Date);
// await fetch();
// await fetchFileByName("Leave You Alone [Untitled_NFT].mp3")