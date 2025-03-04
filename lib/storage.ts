import { sendToGroq } from "./groq";

let storedData: string[] = []; // Array to store parsed data

export const batchScreenData = (parsedData: string) => {
  storedData.push(parsedData);

  // Limit the data size - send after 5 items or 1 minute (adjust logic as needed)
  if (storedData.length >= 5) {
    sendDataToGroq(storedData);
    storedData = [];  // Clear after sending
  }
};

export const sendDataToGroq = async (batchData: string[]) => {
  // Join all data for sending to Groq
  const dataToSend = batchData.join("\n\n");

  // Send batch data to Groq for analysis
  await sendToGroq(dataToSend);
};
