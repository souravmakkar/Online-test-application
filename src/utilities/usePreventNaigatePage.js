import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';

function usePreventNaigatePage() {
  const message = 'Are u sure you want to submit the test';
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    window.onbeforeunload = (event) => {
      // event.preventDefault();
      console.log(event);
      console.log(event.target);
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
