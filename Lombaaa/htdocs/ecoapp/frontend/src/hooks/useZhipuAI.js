import { useState, useCallback } from 'react';
import { zhipuAiService } from '../services/zhipuAiService';

export const useZhipuAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');
  const [remaining, setRemaining] = useState(zhipuAiService.getRemainingRequests());

  const askAI = useCallback(async (question) => {
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await zhipuAiService.chatWithAI(question);
      setResponse(result.message);
      setRemaining(result.remaining);
    } catch (err) {
      setError(err.message);
      setRemaining(zhipuAiService.getRemainingRequests());
    } finally {
      setLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setResponse('');
    setError(null);
  }, []);

  return {
    loading,
    error,
    response,
    remaining,
    askAI,
    clearChat
  };
};