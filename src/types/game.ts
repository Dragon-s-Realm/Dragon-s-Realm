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

export interface Room {
  id: string;
  name: string;
  width: number;
  height: number;
  floor: string[][];
  furniture: Furniture[];
  players: Player[];
}
