import { useState, useCallback, useEffect } from 'react';
import { Player, ChatMessage, Position, Room } from '@/types/game';

const ROOM_WIDTH = 12;
const ROOM_HEIGHT = 10;

const createInitialRoom = (): Room => {
  const floor: string[][] = [];
  for (let y = 0; y < ROOM_HEIGHT; y++) {
    const row: string[] = [];
    for (let x = 0; x < ROOM_WIDTH; x++) {
      if (x === 0 || x === ROOM_WIDTH - 1 || y === 0 || y === ROOM_HEIGHT - 1) {
        row.push('wall');
      } else {
        row.push('floor');
      }
    }
    floor.push(row);
  }
  return {
    id: 'tavern-1',
    name: 'Taverna do Dragão',
    width: ROOM_WIDTH,
    height: ROOM_HEIGHT,
    floor,
    furniture: [
      { id: 'table1', type: 'table', position: { x: 3, y: 3 }, rotation: 0 },
      { id: 'chair1', type: 'chair', position: { x: 2, y: 3 }, rotation: 0 },
      { id: 'chair2', type: 'chair', position: { x: 4, y: 3 }, rotation: 180 },
      { id: 'torch1', type: 'torch', position: { x: 1, y: 1 }, rotation: 0 },
      { id: 'torch2', type: 'torch', position: { x: 10, y: 1 }, rotation: 0 },
      { id: 'barrel1', type: 'barrel', position: { x: 9, y: 7 }, rotation: 0 },
      { id: 'chest1', type: 'chest', position: { x: 8, y: 2 }, rotation: 0 },
    ],
    players: [],
  };
};

const createNPCs = (): Player[] => [
  {
    id: 'npc-1',
    name: 'Barkeeper',
    position: { x: 6, y: 2 },
    direction: 'down',
    isWalking: false,
    outfit: { body: '#8B4513', hair: '#2F1810', clothes: '#4A3728' },
    level: 50,
    health: 1000,
    maxHealth: 1000,
    mana: 500,
    maxMana: 500,
  },
  {
    id: 'npc-2',
    name: 'Knight',
    position: { x: 2, y: 6 },
    direction: 'right',
    isWalking: false,
    outfit: { body: '#D4A574', hair: '#1a1a1a', clothes: '#6B6B6B' },
    level: 120,
    health: 2500,
    maxHealth: 2500,
    mana: 800,
    maxMana: 800,
  },
  {
    id: 'npc-3',
    name: 'Mage',
    position: { x: 8, y: 5 },
    direction: 'left',
    isWalking: false,
    outfit: { body: '#E8D4B8', hair: '#C0C0C0', clothes: '#4A148C' },
    level: 200,
    health: 1800,
    maxHealth: 1800,
    mana: 3000,
    maxMana: 3000,
  },
];

export const useGameState = () => {
  const [player, setPlayer] = useState<Player>({
    id: 'player-1',
    name: 'Aventureiro',
    position: { x: 5, y: 5 },
    direction: 'down',
    isWalking: false,
    outfit: { body: '#D4A574', hair: '#8B4513', clothes: '#2E7D32' },
    level: 45,
    health: 450,
    maxHealth: 500,
    mana: 180,
    maxMana: 200,
  });

  const [room] = useState<Room>(createInitialRoom);
  const [npcs] = useState<Player[]>(createNPCs);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', playerId: 'npc-1', playerName: 'Barkeeper', message: 'Bem-vindo à Taverna do Dragão!', timestamp: Date.now() - 5000 },
    { id: '2', playerId: 'npc-2', playerName: 'Knight', message: 'Cuidado nas masmorras ao norte.', timestamp: Date.now() - 3000 },
  ]);

  const isValidPosition = useCallback((pos: Position): boolean => {
    if (pos.x < 1 || pos.x >= room.width - 1 || pos.y < 1 || pos.y >= room.height - 1) {
      return false;
    }
    const hasFurniture = room.furniture.some(
      f => f.position.x === pos.x && f.position.y === pos.y && f.type !== 'torch'
    );
    const hasNPC = npcs.some(n => n.position.x === pos.x && n.position.y === pos.y);
    return !hasFurniture && !hasNPC;
  }, [room, npcs]);

  const movePlayer = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setPlayer(prev => {
      const newPos = { ...prev.position };
      switch (direction) {
        case 'up': newPos.y -= 1; break;
        case 'down': newPos.y += 1; break;
        case 'left': newPos.x -= 1; break;
        case 'right': newPos.x += 1; break;
      }

      if (isValidPosition(newPos)) {
        return { ...prev, position: newPos, direction, isWalking: true };
      }
      return { ...prev, direction };
    });

    setTimeout(() => {
      setPlayer(prev => ({ ...prev, isWalking: false }));
    }, 200);
  }, [isValidPosition]);

  const sendMessage = useCallback((message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      playerId: player.id,
      playerName: player.name,
      message,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev.slice(-50), newMessage]);
  }, [player]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          e.preventDefault();
          movePlayer('up');
          break;
        case 's':
        case 'arrowdown':
          e.preventDefault();
          movePlayer('down');
          break;
        case 'a':
        case 'arrowleft':
          e.preventDefault();
          movePlayer('left');
          break;
        case 'd':
        case 'arrowright':
          e.preventDefault();
          movePlayer('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  return {
    player,
    room,
    npcs,
    messages,
    movePlayer,
    sendMessage,
  };
};
