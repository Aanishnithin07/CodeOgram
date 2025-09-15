require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/run', async (req, res) => {
  const { code, language = 'python', input = '' } = req.body;
  const languageIds = { python: 71, javascript: 63, cpp: 54, c: 50, java: 62 };
  const languageId = languageIds[language];

  if (!languageId) {
    return res.status(400).json({ output: 'Unsupported language.' });
  }

  try {
    const submissionData = {
      source_code: code,
      language_id: languageId,
    };
    if (input.trim() !== '') {
      submissionData.stdin = input + '\n';
    }
    
    const submissionOptions = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'false', wait: 'true', fields: '*' },
      headers: { 'content-type': 'application/json', 'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com', 'X-RapidAPI-Key': process.env.API_KEY },
      data: submissionData,
    };

    const submissionResponse = await axios.request(submissionOptions);
    const result = submissionResponse.data;
    let output = '';
    if (result.stderr) { output = result.stderr; } 
    else if (result.compile_output) { output = result.compile_output; } 
    else if (result.stdout !== null) { output = result.stdout; } 
    else if (result.status.id !== 3) { output = result.status.description; } 
    else { output = 'Execution finished with no output.'; }
    res.json({ output });
  } catch (error) {
    const errorMessage = error.response ? JSON.stringify(error.response.data) : 'An error occurred while running the code.';
    console.error('Error during code execution:', errorMessage);
    res.status(500).json({ output: `Error: ${errorMessage}` });
  }
});

app.post('/debug', async (req, res) => {
  const { code, error } = req.body;
  if (!code || !error) { return res.status(400).json({ suggestion: 'Code and error message are required.' }); }
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are an expert code debugger. A user has submitted the following code and received an error. Your task is to: 1. Briefly explain the error in simple terms. 2. Provide the corrected code. Do not add any extra features, just fix the bug. Here is the user's code:\n\`\`\`\n${code}\n\`\`\`\nHere is the error message:\n\`\`\`\n${error}\n\`\`\`\nProvide your response in a clear, formatted way.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text();
    res.json({ suggestion });
  } catch (error) {
    console.error('Error with AI debugging:', error);
    res.status(500).json({ suggestion: 'Failed to get a suggestion from the AI model.' });
  }
});

const PORT = 8000;
app.listen(PORT, () => { console.log(`✅ Server is running on port ${PORT}`); });