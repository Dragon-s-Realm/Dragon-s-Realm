import { useState, useCallback, useEffect } from 'react';
import { Player, ChatMessage, Position, Room, InventoryItem, DroppedItem } from '@/types/game';
import { WORLD_ROOMS, INITIAL_ITEMS, NPC_DATA } from '@/data/worldData';

export const useGameState = () => {
  const [currentRoomId, setCurrentRoomId] = useState('tavern');
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

  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [gold, setGold] = useState(1250);

  const room = WORLD_ROOMS[currentRoomId];
  const npcs = NPC_DATA[currentRoomId as keyof typeof NPC_DATA] || [];

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', playerId: 'system', playerName: 'Sistema', message: 'Bem-vindo ao Dragon\'s Realm!', timestamp: Date.now() - 5000 },
    { id: '2', playerId: 'system', playerName: 'Sistema', message: 'Use WASD para mover. Explore os portais!', timestamp: Date.now() - 3000 },
  ]);

  const isValidPosition = useCallback((pos: Position): boolean => {
    if (pos.x < 1 || pos.x >= room.width - 1 || pos.y < 1 || pos.y >= room.height - 1) {
      return false;
    }
    const hasFurniture = room.furniture.some(
      f => f.position.x === pos.x && f.position.y === pos.y && f.type !== 'torch' && f.type !== 'mushroom'
    );
    const hasNPC = npcs.some(n => n.position.x === pos.x && n.position.y === pos.y);
    return !hasFurniture && !hasNPC;
  }, [room, npcs]);

  const checkPortal = useCallback((pos: Position) => {
    const portal = room.portals.find(p => p.position.x === pos.x && p.position.y === pos.y);
    if (portal) {
      setCurrentRoomId(portal.targetRoomId);
      setPlayer(prev => ({
        ...prev,
        position: portal.targetPosition,
      }));
      setMessages(prev => [...prev.slice(-50), {
        id: Date.now().toString(),
        playerId: 'system',
        playerName: 'Sistema',
        message: `Você entrou em: ${WORLD_ROOMS[portal.targetRoomId].name}`,
        timestamp: Date.now(),
      }]);
    }
  }, [room.portals]);

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
        setTimeout(() => checkPortal(newPos), 100);
        return { ...prev, position: newPos, direction, isWalking: true };
      }
      return { ...prev, direction };
    });

    setTimeout(() => {
      setPlayer(prev => ({ ...prev, isWalking: false }));
    }, 200);
  }, [isValidPosition, checkPortal]);

  const useItem = useCallback((itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'consumable' && item.effect) {
      setPlayer(prev => ({
        ...prev,
        health: Math.min(prev.maxHealth, prev.health + (item.effect?.health || 0)),
        mana: Math.min(prev.maxMana, prev.mana + (item.effect?.mana || 0)),
      }));

      setInventory(prev => {
        const newInventory = prev.map(i => {
          if (i.id === itemId) {
            return { ...i, quantity: i.quantity - 1 };
          }
          return i;
        }).filter(i => i.quantity > 0);
        return newInventory;
      });

      setMessages(prev => [...prev.slice(-50), {
        id: Date.now().toString(),
        playerId: 'system',
        playerName: 'Sistema',
        message: `Você usou ${item.name}! ${item.effect.health ? `+${item.effect.health} HP` : ''} ${item.effect.mana ? `+${item.effect.mana} MP` : ''}`,
        timestamp: Date.now(),
      }]);
    } else if (item.type === 'equipment') {
      setMessages(prev => [...prev.slice(-50), {
        id: Date.now().toString(),
        playerId: 'system',
        playerName: 'Sistema',
        message: `Você equipou ${item.name}!`,
        timestamp: Date.now(),
      }]);
    }
  }, [inventory]);

  const dropItem = useCallback((itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    const droppedItem: DroppedItem = {
      id: `dropped-${Date.now()}`,
      item: { ...item, quantity: 1 },
      position: { ...player.position },
      roomId: currentRoomId,
    };

    setDroppedItems(prev => [...prev, droppedItem]);

    setInventory(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });

    setMessages(prev => [...prev.slice(-50), {
      id: Date.now().toString(),
      playerId: 'system',
      playerName: 'Sistema',
      message: `Você dropou ${item.name} no chão!`,
      timestamp: Date.now(),
    }]);
  }, [inventory, player.position, currentRoomId]);

  const pickupItem = useCallback((droppedItemId: string) => {
    const droppedItem = droppedItems.find(d => d.id === droppedItemId);
    if (!droppedItem || droppedItem.roomId !== currentRoomId) return;

    const distance = Math.abs(droppedItem.position.x - player.position.x) + 
                     Math.abs(droppedItem.position.y - player.position.y);
    if (distance > 1) return;

    setInventory(prev => {
      const existing = prev.find(i => i.name === droppedItem.item.name);
      if (existing) {
        return prev.map(i => i.name === droppedItem.item.name 
          ? { ...i, quantity: i.quantity + droppedItem.item.quantity }
          : i
        );
      }
      return [...prev, { ...droppedItem.item, id: `item-${Date.now()}` }];
    });

    setDroppedItems(prev => prev.filter(d => d.id !== droppedItemId));

    setMessages(prev => [...prev.slice(-50), {
      id: Date.now().toString(),
      playerId: 'system',
      playerName: 'Sistema',
      message: `Você pegou ${droppedItem.item.name}!`,
      timestamp: Date.now(),
    }]);
  }, [droppedItems, currentRoomId, player.position]);

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

  const giveItem = useCallback((item: InventoryItem) => {
    setInventory(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name 
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
        );
      }
      return [...prev, { ...item, id: `item-${Date.now()}` }];
    });
  }, []);

  const setPlayerStats = useCallback((stats: Partial<Player>) => {
    setPlayer(prev => ({ ...prev, ...stats }));
  }, []);

  const teleportTo = useCallback((roomId: string, position: Position) => {
    if (WORLD_ROOMS[roomId]) {
      setCurrentRoomId(roomId);
      setPlayer(prev => ({ ...prev, position }));
    }
  }, []);

  const addGold = useCallback((amount: number) => {
    setGold(prev => prev + amount);
  }, []);

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
        case 'e':
          const nearbyItem = droppedItems.find(d => 
            d.roomId === currentRoomId &&
            Math.abs(d.position.x - player.position.x) + Math.abs(d.position.y - player.position.y) <= 1
          );
          if (nearbyItem) {
            pickupItem(nearbyItem.id);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, droppedItems, currentRoomId, player.position, pickupItem]);

  return {
    player,
    room,
    npcs,
    messages,
    inventory,
    gold,
    droppedItems: droppedItems.filter(d => d.roomId === currentRoomId),
    currentRoomId,
    movePlayer,
    sendMessage,
    useItem,
    dropItem,
    pickupItem,
    giveItem,
    setPlayerStats,
    teleportTo,
    addGold,
  };
};
