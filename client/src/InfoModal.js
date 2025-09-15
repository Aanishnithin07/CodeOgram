import React from 'react';
import './InfoModal.css';

function InfoModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Welcome to CodeOgram!</h2>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>This is an AI-powered, multi-language code editor designed for learning and debugging.</p>
          
          <h3>Core Features:</h3>
          <ul>
            <li><b>Multi-Language Editor:</b> Write and run code in Python, JavaScript, C++, C, and Java.</li>
            <li><b>User Input:</b> Provide standard input (stdin) for your interactive programs.</li>
            <li><b>Theme Toggle:</b> Switch between a comfortable dark mode and a clean light mode.</li>
            <li><b>Editor Controls:</b> Full support for Undo, Redo, Copy, Clear, and Download.</li>
          </ul>

          <h3>AI-Powered Assistant:</h3>
          <ul>
            <li>When your code has an error, a <b>"Debug with AI"</b> button will appear.</li>
            <li>Click it to get a detailed explanation of the bug and a corrected code snippet from a powerful AI model.</li>
          </ul>

          <h3>Learning Tools:</h3>
          <ul>
            <li>At the bottom of the page, you'll find a **Concepts Feed**.</li>
            <li>This feed contains scrollable cards with key concepts for the currently selected language to help you learn as you code.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;