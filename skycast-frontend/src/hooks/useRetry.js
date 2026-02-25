import { useState, useCallback } from 'react';

const useRetry = (maxAttempts = 3, baseDelay = 1000) => {
  const [attempts, setAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const execute = useCallback(async (fn, ...args) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setAttempts(attempt);
        if (attempt > 1) setIsRetrying(true);
        
        const result = await fn(...args);
        setAttempts(0);
        setIsRetrying(false);
        return result;
      } catch (error) {
        lastError = error;
        
        if (attempt === maxAttempts) {
          setAttempts(0);
          setIsRetrying(false);
          throw error;
        }

        const waitTime = baseDelay * Math.pow(2, attempt - 1);
        await delay(waitTime);
      }
    }
    
    throw lastError;
  }, [maxAttempts, baseDelay]);

  const reset = useCallback(() => {
    setAttempts(0);
    setIsRetrying(false);
  }, []);

  return {
    execute,
    reset,
    attempts,
    isRetrying,
    canRetry: attempts < maxAttempts
  };
};

export default useRetry;
