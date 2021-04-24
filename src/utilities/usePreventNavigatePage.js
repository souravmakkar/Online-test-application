import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';

function usePreventNaigatePage() {
  const message = 'Are u sure you want to leave the test';
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    window.onbeforeunload = () => {
      // event.preventDefault();
      return message;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, [isChanged]);

  const routerPrompt = <Prompt when={isChanged} message={message} />;
  return [routerPrompt, () => setIsChanged(true), () => setIsChanged(false)];
}

export default usePreventNaigatePage;
