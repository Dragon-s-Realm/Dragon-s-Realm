import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/game';
import { Send } from 'lucide-react';

// Tipagem das propriedades esperadas no componente
interface ChatPanelProps {
  messages: ChatMessage[];               // Lista de mensagens do chat
  onSendMessage: (message: string) => void; // Função chamada ao enviar mensagem
  currentPlayerId: string;               // ID do jogador atual (para estilizar a mensagem dele)
}

// Componente principal do painel de chat
export const ChatPanel = ({ messages, onSendMessage, currentPlayerId }: ChatPanelProps) => {

  // Estado para armazenar o texto digitado no input
  const [input, setInput] = useState('');

  // Referência usada para scroll automático para a última mensagem
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sempre que a lista de mensagens mudar, rola para o final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Função chamada ao enviar o formulário (tecla Enter ou clicar no botão)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita reload da página
    if (input.trim()) {
      onSendMessage(input.trim()); // Envia para o pai
      setInput(''); // Limpa o campo
    }
  };

  // Formata o timestamp para hh:mm (pt-BR)
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    // <div className="pixel-panel flex flex-col h-0 flex-1">

<div className="pixel-panel flex flex-col flex-1 min-h-0 h-[450px]"> 

     {/*<div className="pixel-panel flex flex-col h-0 flex-1">*/}

      {/* Cabeçalho do chat */}
      <div className="px-2 py-1 border-b-2 border-border">
        <span className="text-[10px] gold-text">💬 Chat</span>
      </div>

      {/* Área de mensagens - scrollável */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
        {/* Renderiza cada mensagem */}
        {messages.map((msg) => (
          <div 
            key={msg.id}
            // Estiliza diferente caso a mensagem seja do jogador atual
            className={`text-[8px] p-1 rounded ${
              msg.playerId === currentPlayerId 
                ? 'bg-accent/20 border-2-3 border-accent' // mensagem do usuário
                : 'bg-secondary/30'                        // mensagem de outros
            }`} 
          >
            {/* Nome + horário */}
            <div className="flex items-center gap-1 mb-0.5">
              {/* Nome colorido se for o jogador atual */}
              <span className={msg.playerId === currentPlayerId ? 'gold-text' : 'text-primary'}>
                {msg.playerName}
              </span>

              {/* Horário da mensagem */}
              <span className="text-muted-foreground text-[6px]">
                {formatTime(msg.timestamp)}
              </span>
            </div>

            {/* Texto da mensagem */}
            <p className="text-foreground break-words">{msg.message}</p>
          </div>
        ))}

        {/* Marcador invisível para permitir scroll automático */}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de input para enviar mensagens */}
      <form onSubmit={handleSubmit} className="p-2 border-t-2 border-border">
        <div className="flex gap-1">
          
          {/* Input de texto */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite..."
            className="flex-1 px-2 py-1 text-[8px] bg-secondary border-2 border-border rounded focus:outline-none focus:border-primary"
            maxLength={140} // Limita a mensagem
          />

          {/* Botão de enviar */}
          <button
            type="submit"
            className="pixel-btn p-1"
            disabled={!input.trim()} // Desabilita se estiver vazio
          >
            <Send size={12} />
          </button>
        </div>
      </form>
    </div>
  );
};
