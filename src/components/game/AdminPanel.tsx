// Painel Admin do jogo — versão comentada

import { useState } from 'react';
import { Shield, MapPin, Heart, Zap, Coins, Package, X } from 'lucide-react';
import { Player, InventoryItem } from '@/types/game';
import { WORLD_ROOMS, INITIAL_ITEMS } from '@/data/worldData';

// Tipagem das propriedades recebidas pelo componente
interface AdminPanelProps {
  isOpen: boolean; // controla se o painel está aberto
  onClose: () => void; // função para fechar o painel
  player: Player; // dados completos do jogador
  onSetPlayerStats: (stats: Partial<Player>) => void; // altera atributos do player
  onTeleport: (roomId: string, position: { x: number; y: number }) => void; // teleporta
  onGiveItem: (item: InventoryItem) => void; // entrega um item ao jogador
  onAddGold: (amount: number) => void; // adiciona ouro
}

// Componente principal do painel admin
export const AdminPanel = ({
  isOpen,
  onClose,
  player,
  onSetPlayerStats,
  onTeleport,
  onGiveItem,
  onAddGold,
}: AdminPanelProps) => {
  // Aba selecionada: stats, teleport, items ou gold
  const [activeTab, setActiveTab] = useState<'stats' | 'teleport' | 'items' | 'gold'>('stats');

  // Se não estiver aberto, nem renderiza o painel
  if (!isOpen) return null;

  // Lista de salas do mundo
  const rooms = Object.entries(WORLD_ROOMS);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      {/* Painel principal com estética pixelada */}
      <div className="pixel-panel w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">

        {/* Cabeçalho do painel */}
        <div className="flex items-center justify-between p-3 border-b-2 border-border">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-gold" />
            <span className="text-xs gold-text">Painel Admin</span>
          </div>

          {/* Botão para fechar */}
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
        </div>

        {/* Abas do menu */}
        <div className="flex border-b-2 border-border">
          {[
            { id: 'stats', icon: Heart, label: 'Stats' },
            { id: 'teleport', icon: MapPin, label: 'Teleport' },
            { id: 'items', icon: Package, label: 'Itens' },
            { id: 'gold', icon: Coins, label: 'Gold' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 p-2 flex items-center justify-center gap-1 text-[8px] transition-colors
                ${activeTab === tab.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted/20'}`}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo que muda conforme a aba */}
        <div className="flex-1 overflow-auto p-3">

          {/* Aba de atributos do jogador */}
          {activeTab === 'stats' && (
            <div className="space-y-3">

              {/* Controle de Vida */}
              <div>
                <label className="text-[8px] text-muted-foreground">Vida</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min="1"
                    max={player.maxHealth}
                    value={player.health}
                    onChange={e => onSetPlayerStats({ health: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-[10px] text-health w-12">{player.health}/{player.maxHealth}</span>
                </div>
              </div>

              {/* Controle de Mana */}
              <div>
                <label className="text-[8px] text-muted-foreground">Mana</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min="0"
                    max={player.maxMana}
                    value={player.mana}
                    onChange={e => onSetPlayerStats({ mana: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-[10px] text-mana w-12">{player.mana}/{player.maxMana}</span>
                </div>
              </div>

              {/* Controle de Nível */}
              <div>
                <label className="text-[8px] text-muted-foreground">Nível</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={player.level}
                    onChange={e => onSetPlayerStats({ level: Number(e.target.value) })}
                    className="flex-1 stone-panel p-1 text-[10px] text-center"
                  />
                </div>
              </div>

              {/* Restaura HP e MP ao máximo */}
              <button
                onClick={() => onSetPlayerStats({ health: player.maxHealth, mana: player.maxMana })}
                className="pixel-btn w-full text-[8px]"
              >
                Full Restore
              </button>
            </div>
          )}

          {/* Aba de teleporte */}
          {activeTab === 'teleport' && (
            <div className="space-y-2">
              {rooms.map(([id, room]) => (
                <button
                  key={id}
                  onClick={() => onTeleport(id, { x: Math.floor(room.width / 2), y: Math.floor(room.height / 2) })}
                  className="w-full stone-panel p-2 text-[8px] text-left hover:bg-primary/20 transition-colors flex items-center gap-2"
                >
                  <MapPin size={10} className="text-accent" />
                  {room.name}
                </button>
              ))}
            </div>
          )}

          {/* Aba de itens */}
          {activeTab === 'items' && (
            <div className="grid grid-cols-2 gap-2">
              {INITIAL_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => onGiveItem({ ...item, quantity: 1 })}
                  className="stone-panel p-2 text-[8px] hover:bg-primary/20 transition-colors flex items-center gap-1"
                >
                  <span>{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Aba de ouro */}
          {activeTab === 'gold' && (
            <div className="space-y-2">
              {[100, 500, 1000, 5000, 10000].map(amount => (
                <button
                  key={amount}
                  onClick={() => onAddGold(amount)}
                  className="w-full stone-panel p-2 text-[8px] hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Coins size={12} className="text-gold" />
                  +{amount.toLocaleString()} Gold
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
