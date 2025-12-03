import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/game';
import { Send } from 'lucide-react';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  currentPlayerId: string;
}

export const ChatPanel = ({ messages, onSendMessage, currentPlayerId }: ChatPanelProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="pixel-panel flex flex-col h-full">
      <div className="px-2 py-1 border-b-2 border-border">
        <span className="text-[10px] gold-text">💬 Chat</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`text-[8px] p-1 rounded ${
              msg.playerId === currentPlayerId 
                ? 'bg-accent/20 border-l-2 border-accent' 
                : 'bg-secondary/30'
            }`}
          >
            <div className="flex items-center gap-1 mb-0.5">
              <span className={msg.playerId === currentPlayerId ? 'gold-text' : 'text-primary'}>
                {msg.playerName}
              </span>
              <span className="text-muted-foreground text-[6px]">
                {formatTime(msg.timestamp)}
              </span>
            </div>
            <p className="text-foreground break-words">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-2 border-t-2 border-border">
        <div className="flex gap-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite..."
            className="flex-1 px-2 py-1 text-[8px] bg-secondary border-2 border-border rounded focus:outline-none focus:border-primary"
            maxLength={200}
          />
          <button
            type="submit"
            className="pixel-btn p-1"
            disabled={!input.trim()}
          >
            <Send size={12} />
          </button>
        </div>
      </form>
    </div>
  );
};
