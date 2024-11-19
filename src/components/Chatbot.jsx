import React, { useState } from 'react';
import styled from 'styled-components';
import { getAIResponse } from '../aiService';

const ChatbotContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* Added z-index to ensure it is on top of other elements */
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const Input = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);

    const response = await getAIResponse(input);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'assistant', content: response },
    ]);

    setInput('');
  };

  return (
    <ChatbotContainer>
      <MessageContainer>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </MessageContainer>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
        />
        <Button onClick={handleSend}>Send</Button>
      </InputContainer>
    </ChatbotContainer>
  );
};

export default Chatbot;
