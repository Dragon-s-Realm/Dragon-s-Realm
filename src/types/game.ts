export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;
  position: Position;
  direction: 'up' | 'down' | 'left' | 'right';
  isWalking: boolean;
  outfit: {
    body: string;
    hair: string;
    clothes: string;
  };
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
}

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
}

export interface Furniture {
  id: string;
  type: string;
  position: Position;
  rotation: number;
}

export interface Portal {
  id: string;
  position: Position;
  targetRoomId: string;
  targetPosition: Position;
  label: string;
}

export interface Room {
  id: string;
  name: string;
  width: number;
  height: number;
  floor: string[][];
  furniture: Furniture[];
  players: Player[];
  portals: Portal[];
}

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  type: 'consumable' | 'equipment' | 'material' | 'quest';
  effect?: {
    health?: number;
    mana?: number;
    buff?: string;
  };
}

export interface DroppedItem {
  id: string;
  item: InventoryItem;
  position: Position;
  roomId: string;
}
