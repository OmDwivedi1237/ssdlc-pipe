# 🚨 **Cybersecurity Risk Monitoring Dashboard** 🚨

Welcome to the **Cybersecurity Risk Monitoring Dashboard**! This tool captures real-time screen data, analyzes it for potential security risks, and provides concise, actionable reports. The dashboard leverages **OCR technology** and **AI-driven analysis** to identify security threats in your code, configurations, and workflows.

---

## 🚀 **Features**

- 📸 **Real-time Screen Capture**: Captures screen data for up to 60 seconds to gather relevant information.
- 🔍 **OCR Integration**: Uses OCR to capture textual information from screen content.
- 🤖 **AI-Powered Risk Analysis**: Sends captured data to AI for deep analysis, identifying potential cybersecurity risks.
- 📊 **Beautiful Reports**: Displays a concise, formatted risk analysis report with details about the file name, line number, and reasoning for the security issues.
- 💻 **User-Friendly UI**: A sleek, modern interface for easy interaction with the system.

---

## 🧑‍💻 **Installation**

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone [url]
cd ssdlc-pipe
```

### 2. Install dependencies
Make sure you have `Node.js` and `npm` installed on your machine. Then, run the following command to install all required dependencies:
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add the following environment variables:

```env
PUBLIC_GROQ_API_KEY=your_api_key_here
```

You’ll need to replace `your_api_key_here` with your Groq API key (or use another AI service if needed).

### 4. Run the development server
Once the dependencies are installed and environment variables are set, you can start the development server:

```bash
npm run dev
```

Now, open your browser and go to `http://localhost:3000` to access the dashboard.

---

## 💡 **Usage**

### 1. **Start Screenpipe**
Click the "Start Screenpipe" button to begin capturing screen data for up to 60 seconds. The application will capture all visible text via OCR during this period.

### 2. **Generate Risk Analysis Report**
Once screen capture is complete, click the "Generate Report" button to send the captured data to AI for analysis. The system will generate a detailed report highlighting any potential security risks detected in the code or screen content.

---

## ⚙️ **How It Works**

1. **Screenpipe**: The app uses the Screenpipe API to capture screen data (OCR-based) for a specified duration (default is 60 seconds).
2. **AI Analysis**: The captured text data is sent to an AI-powered service (Groq or other models) for analysis, where potential security risks are identified.
3. **Risk Report**: The AI returns a risk report, formatted with:
   - **File Name**
   - **Folder**
   - **Line Number**
   - **Reason for the Risk**
4. **User Interface**: The result is presented in a clean and easy-to-read report format for the user to review.

---

## 🧑‍💻 **Code Structure**

### Key Files:
- **/app/api/screenpipe/route.ts**: Handles screen data capture and API endpoint for processing.
- **/lib/screenpipe.ts**: Contains the logic for interacting with Screenpipe’s OCR capture.
- **/pages/dashboard.tsx**: The main dashboard page where users interact with the system.
- **/components/RealtimeScreen.tsx**: Displays a real-time preview of the screen capture process.
- **/lib/groq.ts**: Handles communication with Groq or AI-powered analysis.

---

## 🛠️ **Tech Stack**

- **Frontend**: React, Tailwind CSS
- **Backend**: Next.js API Routes
- **OCR**: Screenpipe API
- **AI Analysis**: Groq or another suitable AI model
- **State Management**: React hooks (`useState`, `useEffect`)

---

## 🤖 **AI Integration**

This project uses the **Groq** API (or another AI service of your choice) to analyze screen data for security risks. It uses a conversational AI model to process the captured content and provide short, actionable insights.

Example response from AI:

```
File: /src/app.js
Folder: /src
Line: 45
Risk: Potential SQL Injection vulnerability
Reasoning: Unsanitized input is being passed directly to an SQL query. Consider using parameterized queries.
```

---

## 🎨 **UI Design**

The dashboard has been designed with a modern, **dark mode** theme for a sleek, professional look. It includes:
- Clean typography
- Simple, intuitive layout
- Visually appealing color scheme with dark and grainy textures

---

## 📋 **Contributing**

We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request with a detailed description of your changes.

---

## 📑 **License**

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Happy coding and stay secure! 🚀🔐