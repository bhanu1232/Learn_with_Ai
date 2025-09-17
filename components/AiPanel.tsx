import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { BrainCircuitIcon, SendIcon, ClipboardIcon, CheckIcon } from './icons';

interface AiPanelProps {
  chatHistory: ChatMessage[];
  isChatLoading: boolean;
  onSendMessage: (message: string) => void;
}

const TypingIndicator = () => (
    <div className="flex justify-start">
        <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
            <div className="flex items-center space-x-1">
                <span className="text-sm">AI is typing</span>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
);

const CodeBlock: React.FC<{ language: string, code: string }> = ({ language, code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-900 rounded-md my-2 relative border border-gray-700">
            <div className="flex justify-between items-center px-3 py-1 bg-gray-700/50 rounded-t-md border-b border-gray-700">
                <span className="text-xs font-semibold text-gray-400 capitalize">{language || 'Code'}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2 py-1 rounded-md transition-colors"
                >
                    {copied ? (
                        <>
                            <CheckIcon className="w-3.5 h-3.5 text-green-accent" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <ClipboardIcon className="w-3.5 h-3.5" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="p-3 text-sm overflow-x-auto">
                <code className="font-fira-code text-gray-300 whitespace-pre-wrap">{code}</code>
            </pre>
        </div>
    );
};

const renderMessageContent = (content: string) => {
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push(<p key={`text-${lastIndex}`} className="text-sm whitespace-pre-wrap">{content.substring(lastIndex, match.index)}</p>);
        }
        
        const lang = match[1] || 'text';
        const code = match[2].trim();
        parts.push(<CodeBlock key={`code-${match.index}`} language={lang} code={code} />);
        
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
        parts.push(<p key={`text-${lastIndex}`} className="text-sm whitespace-pre-wrap">{content.substring(lastIndex)}</p>);
    }

    if (parts.length === 0) {
        return <p className="text-sm whitespace-pre-wrap">{content}</p>;
    }

    return <div>{parts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>)}</div>;
};

const AiPanel: React.FC<AiPanelProps> = ({ chatHistory, isChatLoading, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isChatLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isChatLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const showWelcomeMessage = chatHistory.length === 0 && !isChatLoading;

  return (
    <aside className="w-full h-full bg-gray-800 border-l-0 lg:border-l border-t lg:border-t-0 border-gray-700 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-200 p-4 border-b border-gray-700 flex-shrink-0">
            AI Tutor
        </h3>
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 flex flex-col">
            {showWelcomeMessage ? (
                 <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-6">
                    <BrainCircuitIcon className="w-16 h-16 mb-4 text-gray-600" />
                    <p>Ask me anything about the problem!</p>
                </div>
            ) : (
                <div className="space-y-4 mt-auto">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           {msg.role === 'model' && <BrainCircuitIcon className="w-6 h-6 text-blue-accent flex-shrink-0 mt-1" />}
                           <div className={`max-w-sm px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-accent text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                               {renderMessageContent(msg.content)}
                           </div>
                        </div>
                    ))}
                    {isChatLoading && <TypingIndicator />}
                </div>
            )}
        </div>

        <div className="p-2 border-t border-gray-700 bg-gray-900/50 flex-shrink-0">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask a follow-up question..."
                        className="w-full bg-gray-700 text-gray-200 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-accent"
                        disabled={isChatLoading}
                    />
                    <button type="submit" disabled={isChatLoading || !message.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-accent text-white hover:bg-opacity-80 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                        <SendIcon className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    </aside>
  );
};

export default AiPanel;