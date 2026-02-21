import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChatInput, Message, Wrapper } from './components.tsx';
import './tailwind.css';
import { useChat } from '@ai-sdk/react';

const App = () => {
  const { messages, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState(
    `What's the capital of France?`,
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Wrapper>
      {messages.map((message) => (
        <Message
          key={message.id}
          role={message.role}
          parts={message.parts}
        />
      ))}
      <div ref={bottomRef} />
      <ChatInput
        input={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({
            text: input,
          });
          setInput("");
        }}
      />
    </Wrapper>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
