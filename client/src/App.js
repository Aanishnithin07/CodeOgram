import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './App.css';
import ConceptFeed from './ConceptFeed';
import InfoModal from './InfoModal';
import './InfoModal.css';
import { pythonConcepts, pythonDefault } from './pythonConcepts';
import { cppConcepts, cppDefault } from './cppConcepts';
import { javascriptConcepts, javascriptDefault } from './javascriptConcepts';
import { cConcepts, cDefault } from './cConcepts';
import { javaConcepts, javaDefault } from './javaConcepts';

const conceptMap = {
  python: pythonConcepts, cpp: cppConcepts, javascript: javascriptConcepts, c: cConcepts, java: javaConcepts,
};
const defaultCodeMap = {
  python: pythonDefault, cpp: cppDefault, javascript: javascriptDefault, c: cDefault, java: javaDefault,
};
const fileExtensions = {
  python: 'py', javascript: 'js', cpp: 'cpp', c: 'c', java: 'java',
};

function App() {
  const [code, setCode] = useState(defaultCodeMap.python);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDebugging, setIsDebugging] = useState(false);
  const [language, setLanguage] = useState('python');
  const [input, setInput] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [suggestion, setSuggestion] = useState('');
  const [concepts, setConcepts] = useState(pythonConcepts);
  const editorRef = useRef(null);
  const [theme, setTheme] = useState('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    if (conceptMap[language] && defaultCodeMap[language]) {
      setConcepts(conceptMap[language]);
      setCode(defaultCodeMap[language]);
    }
  }, [language]);
  
  const isError = output.toLowerCase().includes('error') || output.toLowerCase().includes('exception');
  function handleEditorDidMount(editor, monaco) { editorRef.current = editor; }
  const handleUndo = () => editorRef.current?.getModel().undo();
  const handleRedo = () => editorRef.current?.getModel().redo();

  const handleRunCode = async () => {
    setIsLoading(true); setOutput(''); setSuggestion('');
    const payload = { language, code, input };
    try {
      // UPDATED URL
      const response = await fetch('https://codeogram-server.onrender.com/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.output || `HTTP error!`); }
      setOutput(data.output || 'Execution complete.');
    } catch (error) { setOutput(error.message); } 
    finally { setIsLoading(false); }
  };

  const handleDebug = async () => {
    setIsDebugging(true); setSuggestion('🧠 The AI is thinking...');
    const payload = { code, error: output };
    try {
      // UPDATED URL
      const response = await fetch('https://codeogram-server.onrender.com/debug', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.suggestion || `HTTP error!`); }
      setSuggestion(data.suggestion);
    } catch (error) { setSuggestion(error.message); } 
    finally { setIsDebugging(false); }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    });
  };
  const handleClear = () => { setCode(''); setOutput(''); setInput(''); setSuggestion(''); };
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script.${fileExtensions[language] || 'txt'}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App" data-theme={theme}>
      {isModalOpen && <InfoModal onClose={() => setIsModalOpen(false)} />}
      <nav className="navbar">
        <div className="navbar-brand"><img src="/codeOgram.png" alt="CodeOgram Logo" className="app-logo" /><h1 className="app-title">CodeOgram</h1></div>
        <div className="controls-container">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={isLoading || isDebugging}>
            <option value="python">Python</option><option value="javascript">JavaScript</option><option value="cpp">C++</option><option value="c">C</option><option value="java">Java</option>
          </select>
          <button className="run-button" onClick={handleRunCode} disabled={isLoading || isDebugging}>{isLoading ? 'Executing...' : 'Run Code'}</button>
          <button className="theme-toggle-button" onClick={toggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          <button className="info-button" onClick={() => setIsModalOpen(true)}>❓</button>
        </div>
      </nav>
      <main className="app-main">
        <div className="editor-container">
          <div className="editor-header">
            <span>{language.toUpperCase()}</span>
            <div className="editor-controls">
              <button className="secondary-button" onClick={handleUndo}>Undo</button><button className="secondary-button" onClick={handleRedo}>Redo</button><button className="secondary-button" onClick={handleCopy}>{copyButtonText}</button><button className="secondary-button" onClick={handleClear}>Clear</button><button className="secondary-button" onClick={handleDownload}>Download</button>
            </div>
          </div>
          <Editor
            height="calc(100vh - 130px)" theme={theme === 'dark' ? 'vs-dark' : 'light'} language={language} value={code}
            onChange={(newCode) => setCode(newCode || '')} onMount={handleEditorDidMount} options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on" }}
          />
        </div>
        <div className="output-and-input-container">
          <div className="output-container">
            <div className="output-header">
              <h2>Output</h2>
              {isError && !isLoading && (<button className="debug-button" onClick={handleDebug} disabled={isDebugging}>{isDebugging ? 'Thinking...' : 'Debug with AI'}</button>)}
            </div>
            <pre className="output-box" style={{ color: isError ? 'var(--error-color)' : 'var(--text-color)' }}>{isLoading ? 'Executing...' : output}</pre>
          </div>
          {suggestion && (<div className="suggestion-container"><h2>AI Suggestion</h2><pre className="suggestion-box">{suggestion}</pre></div>)}
          <div className="input-container">
            <h2>User Input (stdin)</h2>
            <textarea
              className="input-box" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="If your code needs input, provide it here line-by-line."
            />
          </div>
        </div>
      </main>
      <footer className="app-footer"><p>© 2025 CodeOgram | Developed by AANISH NITHIN A</p></footer>
      <ConceptFeed concepts={concepts} />
    </div>
  );
}

export default App;