import { useState } from 'react';
import { Package, Coins } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

const INITIAL_ITEMS: InventoryItem[] = [
  { id: '1', name: 'Poção de Vida', icon: '🧪', quantity: 5, rarity: 'common' },
  { id: '2', name: 'Poção de Mana', icon: '💧', quantity: 3, rarity: 'common' },
  { id: '3', name: 'Espada de Ferro', icon: '⚔️', quantity: 1, rarity: 'uncommon' },
  { id: '4', name: 'Escudo de Madeira', icon: '🛡️', quantity: 1, rarity: 'common' },
  { id: '5', name: 'Anel Mágico', icon: '💍', quantity: 1, rarity: 'rare' },
  { id: '6', name: 'Pergaminho', icon: '📜', quantity: 2, rarity: 'uncommon' },
  { id: '7', name: 'Tocha', icon: '🔥', quantity: 10, rarity: 'common' },
  { id: '8', name: 'Amuleto Antigo', icon: '📿', quantity: 1, rarity: 'epic' },
];

const RARITY_COLORS: Record<string, string> = {
  common: 'border-muted-foreground',
  uncommon: 'border-accent',
  rare: 'border-mana',
  epic: 'border-purple-500',
  legendary: 'border-gold',
};

export const Inventory = () => {
  const [items] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const gold = 1250;

  return (
    <div className="pixel-panel p-2 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 pb-1 border-b-2 border-border">
        <div className="flex items-center gap-1">
          <Package size={12} className="text-primary" />
          <span className="text-[10px] gold-text">Inventário</span>
        </div>
        <div className="flex items-center gap-1">
          <Coins size={10} className="text-gold" />
          <span className="text-[8px] gold-text">{gold.toLocaleString()}</span>
        </div>
      </div>

      {/* Inventory grid */}
      <div className="grid grid-cols-4 gap-1 mb-2">
        {Array.from({ length: 16 }).map((_, index) => {
          const item = items[index];
          return (
            <button
              key={index}
              className={`
                aspect-square stone-panel flex items-center justify-center relative
                hover:brightness-110 transition-all cursor-pointer
                ${item ? RARITY_COLORS[item.rarity] : 'border-transparent'}
                ${selectedItem?.id === item?.id ? 'ring-1 ring-primary' : ''}
              `}
              style={{ borderWidth: item ? 2 : 1 }}
              onClick={() => item && setSelectedItem(item)}
            >
              {item && (
                <>
                  <span className="text-base">{item.icon}</span>
                  {item.quantity > 1 && (
                    <span className="absolute bottom-0 right-0.5 text-[6px] text-foreground">
                      {item.quantity}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Item details */}
      {selectedItem && (
        <div className="stone-panel p-1.5 mt-auto">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm">{selectedItem.icon}</span>
            <span className={`text-[8px] ${
              selectedItem.rarity === 'legendary' ? 'gold-text' :
              selectedItem.rarity === 'epic' ? 'text-purple-400' :
              selectedItem.rarity === 'rare' ? 'text-mana' :
              selectedItem.rarity === 'uncommon' ? 'text-accent' :
              'text-foreground'
            }`}>
              {selectedItem.name}
            </span>
          </div>
          <div className="flex gap-1">
            <button className="pixel-btn text-[6px] flex-1">Usar</button>
            <button className="pixel-btn text-[6px] flex-1">Dropar</button>
          </div>
        </div>
      )}
    </div>
  );
};
