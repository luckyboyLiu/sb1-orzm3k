import React from 'react';
import { MessageSquare, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 ${
            message.role === 'assistant' ? 'bg-gray-50' : ''
          } p-4 rounded-lg`}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">
            {message.role === 'user' ? (
              <MessageSquare className="w-5 h-5 text-gray-600" />
            ) : (
              <Bot className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="flex-1 prose max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};