import { GoogleGenerativeAI } from "@google/generative-ai";

const getModels = async () => {
  const genAI = new GoogleGenerativeAI(process.argv[2]);
  // Workaround since genAI doesn't natively expose listModels in all versions easily,
  // we can just fetch it manually.
  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.argv[2]}`);
  const data = await resp.json();
  console.log(data);
};

getModels();
