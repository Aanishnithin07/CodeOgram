import React, { useState, useEffect, useRef } from 'react'; // 1. Import useRef
import './ConceptFeed.css';

function ConceptFeed({ concepts }) {
  const [visible, setVisible] = useState(false);
  const feedRef = useRef(null); // 2. Create a ref to access the scrollable div

  useEffect(() => {
    setVisible(false);
    // When concepts change, scroll back to the start
    if (feedRef.current) {
      feedRef.current.scrollLeft = 0;
    }
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [concepts]);

  // 3. Functions to handle scrolling
  const scroll = (direction) => {
    if (feedRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340; // Card width (320) + gap (20)
      feedRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="concept-feed-container">
      <div className="feed-header">
        <h2 className="feed-title">Concepts Feed</h2>
        <div className="scroll-buttons">
          {/* 4. The new scroll buttons */}
          <button className="scroll-button" onClick={() => scroll('left')}>&larr;</button>
          <button className="scroll-button" onClick={() => scroll('right')}>&rarr;</button>
        </div>
      </div>
      <div className="concept-feed" ref={feedRef}> {/* 5. Attach the ref */}
        {concepts.map((concept) => (
          <div key={concept.id} className={`concept-card ${visible ? 'visible' : ''}`}>
            <h3>{concept.title}</h3>
            <p>{concept.explanation}</p>
            <pre className="code-snippet">
              <code>{concept.codeSnippet}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConceptFeed;