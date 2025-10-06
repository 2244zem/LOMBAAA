import React, { useState } from 'react';
import { useZhipuAI } from '../../../hooks/useZhipuAI';

const AIChatBox = () => {
  const [question, setQuestion] = useState('');
  const { loading, error, response, remaining, askAI, clearChat } = useZhipuAI();

  const handleSubmit = (e) => {
    e.preventDefault();
    askAI(question);
    setQuestion('');
  };

  return (
    <div className="ai-chat-box">
      <div className="ai-header">
        <h3>🤖 Asisten Sampah & Daur Ulang</h3>
        <div className="ai-limits">
          <span>Sisa: {remaining.session} sesi, {remaining.daily} harian</span>
        </div>
      </div>

      <div className="ai-chat-area">
        {error && (
          <div className="ai-error">
            ⚠️ {error}
          </div>
        )}
        
        {response && (
          <div className="ai-response">
            <strong>AI:</strong>
            <p>{response}</p>
          </div>
        )}

        {loading && (
          <div className="ai-loading">
            🔄 AI sedang berpikir...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="ai-input-form">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Tanya seputar sampah, daur ulang, pengelolaan limbah..."
          disabled={loading || remaining.session <= 0}
          className="ai-input"
        />
        <button 
          type="submit" 
          disabled={loading || !question.trim() || remaining.session <= 0}
          className="ai-send-btn"
        >
          Tanya
        </button>
      </form>

      <div className="ai-info">
        <small>
          💡 Tips: Tanya tentang pemilahan sampah, cara daur ulang, kompos, dll.
        </small>
      </div>
    </div>
  );
};

export default AIChatBox;