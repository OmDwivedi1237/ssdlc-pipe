// parser.ts - Parse screen data to extract relevant information for analysis

// This function will parse the raw screen data and return a clean, structured format
export const parseScreenData = (eventData: string): string | null => {
    const lines = eventData.split("\n");
    let codeSnippet = '';
    let fileName = '';
    let timestamp = '';
  
    // Look for specific patterns in the raw screen data that contain the relevant information
    lines.forEach(line => {
      // Extract file names and line numbers if they exist in the format: "File: <filename>"
      if (line.startsWith("File:")) {
        fileName = line.replace("File:", "").trim();
      }
  
      // Extract timestamp if available, assuming the format: "Timestamp: <timestamp>"
      if (line.startsWith("Timestamp:")) {
        timestamp = line.replace("Timestamp:", "").trim();
      }
  
      // Extract the code or error content, assuming it's between lines that say "Code:" or similar
      if (line.startsWith("Code:")) {
        codeSnippet += line.replace("Code:", "").trim() + "\n";
      }
  
      // Optionally, you can add more checks to grab specific content that is relevant to your analysis
    });
  
    // If relevant information was extracted, return the structured data
    if (codeSnippet || fileName || timestamp) {
      return formatParsedData(codeSnippet, fileName, timestamp);
    }
  
    // If no relevant data is found, return null
    return null;
  };
  
  // This function formats the parsed data for easy consumption by the Groq API
  const formatParsedData = (codeSnippet: string, fileName: string, timestamp: string): string => {
    return `
      File Name: ${fileName}
      Timestamp: ${timestamp}
      Code Snippet:
      ${codeSnippet}
  
      Please provide a short risk analysis of this code snippet.
    `;
  };
  