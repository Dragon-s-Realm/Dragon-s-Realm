// worldData.ts => arquivo responsável por configurar todos os mundos existentes no jogo

// Importa os tipos utilizados na estrutura do jogo
import { Room, InventoryItem } from '@/types/game';

/**
 * Função auxiliar para criar uma sala (room) do mapa.
 * Gera automaticamente as paredes e o piso internamente.
 */
const createRoom = (
  id: string,
  name: string,
  width: number,
  height: number,
  furniture: Room['furniture'],
  portals: Room['portals']
): Room => {

  // Matriz representando o piso da sala (floor)
  const floor: string[][] = [];

  // Gera a matriz linha por linha
  for (let y = 0; y < height; y++) {
    const row: string[] = [];

    for (let x = 0; x < width; x++) {
      // Cria paredes nas bordas da sala
      if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
        row.push('wall');
      } else {
        // Piso normal dentro da área interna
        row.push('floor');
      }
    }

    floor.push(row);
  }

  // Retorna o objeto que representa a sala final
  return { id, name, width, height, floor, furniture, players: [], portals };
};

/**
 * WORLD_ROOMS contém todas as salas existentes no mundo.
 * Cada sala é criada com a função 'createRoom' para manter consistência.
 */
export const WORLD_ROOMS: Record<string, Room> = {

  // ----- TAVERNA -----
  'tavern': createRoom('tavern', 'Praça Central', 28, 17,
    [
      { id: 'table1', type: 'table', position: { x: 3, y: 3 }, rotation: 0 },
      { id: 'chair1', type: 'chair', position: { x: 2, y: 3 }, rotation: 0 },
      { id: 'chair2', type: 'chair', position: { x: 4, y: 3 }, rotation: 180 },
      { id: 'barrel1', type: 'barrel', position: { x: 9, y: 7 }, rotation: 0 },
      { id: 'chest1', type: 'chest', position: { x: 8, y: 2 }, rotation: 0 },

      // ------ TOCHAS NAS PONTAS DO MAPA ------
      
      { id: 'torch_nw', type: 'torch', position: { x: 0.5, y: 0 }, rotation: 0 },   // canto superior esquerdo
      { id: 'torch_ne', type: 'torch', position: { x: 26.3, y: 0 }, rotation: 0 },   // canto superior direito
      { id: 'torch_sw', type: 'torch', position: { x: 0.5, y: 14.8 }, rotation: 0 },   // canto inferior esquerdo
      { id: 'torch_se', type: 'torch', position: { x: 26.3, y: 14.8 }, rotation: 0 },   // canto inferior direito

    ],
    [
      // Portais que ligam esta sala a outras
      { id: 'portal-town', position: { x: 6, y: 9 }, targetRoomId: 'town-square', targetPosition: { x: 6, y: 1 }, label: '→ Praça' },
      { id: 'portal-cellar', position: { x: 1, y: 5 }, targetRoomId: 'cellar', targetPosition: { x: 8, y: 3 }, label: '↓ Porão' },
    ]
  ),

  // ----- PRAÇA CENTRAL -----
  'town-square': createRoom('town-square', 'Praça Central', 16, 12,
    [
      { id: 'fountain', type: 'fountain', position: { x: 8, y: 6 }, rotation: 0 },
      { id: 'bench1', type: 'bench', position: { x: 4, y: 5 }, rotation: 0 },
      { id: 'bench2', type: 'bench', position: { x: 12, y: 5 }, rotation: 0 },
      { id: 'lamp1', type: 'torch', position: { x: 3, y: 3 }, rotation: 0 },
      { id: 'lamp2', type: 'torch', position: { x: 13, y: 3 }, rotation: 0 },
      { id: 'lamp3', type: 'torch', position: { x: 3, y: 9 }, rotation: 0 },
      { id: 'lamp4', type: 'torch', position: { x: 13, y: 9 }, rotation: 0 },
    ],
    [
      { id: 'portal-tavern', position: { x: 6, y: 1 }, targetRoomId: 'tavern', targetPosition: { x: 6, y: 8 }, label: '→ Taverna' },
      { id: 'portal-forest', position: { x: 15, y: 6 }, targetRoomId: 'forest', targetPosition: { x: 1, y: 5 }, label: '→ Floresta' },
      { id: 'portal-shop', position: { x: 1, y: 6 }, targetRoomId: 'shop', targetPosition: { x: 8, y: 5 }, label: '→ Loja' },
      { id: 'portal-dungeon', position: { x: 8, y: 11 }, targetRoomId: 'dungeon-entrance', targetPosition: { x: 5, y: 1 }, label: '↓ Masmorra' },
    ]
  ),

  // ----- FLORESTA -----
  'forest': createRoom('forest', 'Floresta Sombria', 14, 10,
    [
      { id: 'tree1', type: 'tree', position: { x: 3, y: 2 }, rotation: 0 },
      { id: 'tree2', type: 'tree', position: { x: 7, y: 3 }, rotation: 0 },
      { id: 'tree3', type: 'tree', position: { x: 11, y: 2 }, rotation: 0 },
      { id: 'tree4', type: 'tree', position: { x: 5, y: 7 }, rotation: 0 },
      { id: 'tree5', type: 'tree', position: { x: 10, y: 6 }, rotation: 0 },
      { id: 'mushroom1', type: 'mushroom', position: { x: 4, y: 5 }, rotation: 0 },
      { id: 'mushroom2', type: 'mushroom', position: { x: 8, y: 8 }, rotation: 0 },
    ],
    [
      { id: 'portal-town', position: { x: 1, y: 5 }, targetRoomId: 'town-square', targetPosition: { x: 14, y: 6 }, label: '← Praça' },
      { id: 'portal-cave', position: { x: 12, y: 8 }, targetRoomId: 'cave', targetPosition: { x: 2, y: 5 }, label: '→ Caverna' },
    ]
  ),

  // ----- CAVERNA -----
  'cave': createRoom('cave', 'Caverna Escura', 10, 8,
    [
      { id: 'rock1', type: 'rock', position: { x: 3, y: 2 }, rotation: 0 },
      { id: 'rock2', type: 'rock', position: { x: 7, y: 3 }, rotation: 0 },
      { id: 'rock3', type: 'rock', position: { x: 5, y: 6 }, rotation: 0 },
      { id: 'torch-c1', type: 'torch', position: { x: 1, y: 1 }, rotation: 0 },
      { id: 'chest-cave', type: 'chest', position: { x: 8, y: 1 }, rotation: 0 },
    ],
    [
      { id: 'portal-forest', position: { x: 1, y: 5 }, targetRoomId: 'forest', targetPosition: { x: 11, y: 8 }, label: '← Floresta' },
    ]
  ),

  // ----- LOJA -----
  'shop': createRoom('shop', 'Loja de Itens', 10, 8,
    [
      { id: 'counter', type: 'table', position: { x: 5, y: 2 }, rotation: 0 },
      { id: 'shelf1', type: 'shelf', position: { x: 2, y: 1 }, rotation: 0 },
      { id: 'shelf2', type: 'shelf', position: { x: 8, y: 1 }, rotation: 0 },
      { id: 'barrel-shop', type: 'barrel', position: { x: 1, y: 6 }, rotation: 0 },
      { id: 'chest-shop', type: 'chest', position: { x: 8, y: 6 }, rotation: 0 },
    ],
    [
      { id: 'portal-town', position: { x: 5, y: 7 }, targetRoomId: 'town-square', targetPosition: { x: 2, y: 6 }, label: '← Praça' },
    ]
  ),

  // ----- PORÃO -----
  'cellar': createRoom('cellar', 'Porão da Taverna', 10, 8,
    [
      { id: 'barrel-c1', type: 'barrel', position: { x: 2, y: 2 }, rotation: 0 },
      { id: 'barrel-c2', type: 'barrel', position: { x: 3, y: 2 }, rotation: 0 },
      { id: 'barrel-c3', type: 'barrel', position: { x: 2, y: 3 }, rotation: 0 },
      { id: 'chest-cellar', type: 'chest', position: { x: 7, y: 5 }, rotation: 0 },
      { id: 'torch-cellar', type: 'torch', position: { x: 1, y: 1 }, rotation: 0 },
    ],
    [
      { id: 'portal-tavern', position: { x: 8, y: 3 }, targetRoomId: 'tavern', targetPosition: { x: 2, y: 5 }, label: '↑ Taverna' },
    ]
  ),

  // ----- ENTRADA DA MASMORRA -----
  'dungeon-entrance': createRoom('dungeon-entrance', 'Entrada da Masmorra', 12, 10,
    [
      { id: 'skull1', type: 'skull', position: { x: 2, y: 2 }, rotation: 0 },
      { id: 'skull2', type: 'skull', position: { x: 9, y: 2 }, rotation: 0 },
      { id: 'torch-d1', type: 'torch', position: { x: 1, y: 4 }, rotation: 0 },
      { id: 'torch-d2', type: 'torch', position: { x: 10, y: 4 }, rotation: 0 },
      { id: 'chest-dung', type: 'chest', position: { x: 5, y: 7 }, rotation: 0 },
      { id: 'rock-d1', type: 'rock', position: { x: 3, y: 5 }, rotation: 0 },
      { id: 'rock-d2', type: 'rock', position: { x: 8, y: 6 }, rotation: 0 },
    ],
    [
      { id: 'portal-town', position: { x: 5, y: 1 }, targetRoomId: 'town-square', targetPosition: { x: 8, y: 10 }, label: '↑ Praça' },
    ]
  ),
};

/**
 * Itens iniciais que o jogador recebe ao entrar no jogo.
 */
export const INITIAL_ITEMS: InventoryItem[] = [
  { id: '1', name: 'Poção de Vida', icon: '🧪', quantity: 5, rarity: 'common', type: 'consumable', effect: { health: 50 } },
  { id: '2', name: 'Poção de Mana', icon: '💧', quantity: 3, rarity: 'common', type: 'consumable', effect: { mana: 30 } },
  { id: '3', name: 'Espada de Ferro', icon: '⚔️', quantity: 1, rarity: 'uncommon', type: 'equipment' },
  { id: '4', name: 'Escudo de Madeira', icon: '🛡️', quantity: 1, rarity: 'common', type: 'equipment' },
  { id: '5', name: 'Anel Mágico', icon: '💍', quantity: 1, rarity: 'rare', type: 'equipment', effect: { mana: 20 } },
  { id: '6', name: 'Pergaminho', icon: '📜', quantity: 2, rarity: 'uncommon', type: 'material' },
  { id: '7', name: 'Tocha', icon: '🔥', quantity: 10, rarity: 'common', type: 'material' },
  { id: '8', name: 'Amuleto Antigo', icon: '📿', quantity: 1, rarity: 'epic', type: 'equipment', effect: { health: 100, mana: 50 } },
];

/**
 * Dados dos NPCs distribuídos pelas salas.
 * Cada chave corresponde ao ID da sala.
 */
export const NPC_DATA = {
  'tavern': [
    {
      id: 'npc-qenio',
      name: 'Qenio',
      position: { x: 6, y: 2 },
      direction: 'down' as const,
      isWalking: false,
      outfit: { body: '#8B4511', hair: '#2F1310', clothes: '#4A3628' },
      level: 50,
      health: 1000,
      maxHealth: 1000,
      mana: 500,
      maxMana: 500,
    },
  ],

  'town-square': [
    {
      id: 'npc-guardamonique',
      name: 'Guarda Monique',
      position: { x: 3, y: 6 },
      direction: 'right' as const,
      isWalking: false,
      outfit: { body: '#D4A574', hair: '#1a1a1a', clothes: '#6B6B6B' },
      level: 80,
      health: 2000,
      maxHealth: 2000,
      mana: 200,
      maxMana: 200,
    },
    {
      id: 'npc-dante',
      name: 'Dante',
      position: { x: 12, y: 8 },
      direction: 'left' as const,
      isWalking: false,
      outfit: { body: '#E8D4B8', hair: '#8B4513', clothes: '#8B0000' },
      level: 30,
      health: 500,
      maxHealth: 500,
      mana: 100,
      maxMana: 100,
    },
  ],

  'forest': [
    {
      id: 'npc-hunterjonas',
      name: 'Caçador Jonas',
      position: { x: 6, y: 5 },
      direction: 'down' as const,
      isWalking: false,
      outfit: { body: '#D4A574', hair: '#2F1810', clothes: '#228B22' },
      level: 45,
      health: 800,
      maxHealth: 800,
      mana: 150,
      maxMana: 150,
    },
  ],

  'shop': [
    {
      id: 'npc-shopkeepermarqes',
      name: 'Vendedor Marqes',
      position: { x: 5, y: 3 },
      direction: 'down' as const,
      isWalking: false,
      outfit: { body: '#E8D4B8', hair: '#C0C0C0', clothes: '#4A148C' },
      level: 25,
      health: 400,
      maxHealth: 400,
      mana: 300,
      maxMana: 300,
    },
  ],

  'dungeon-entrance': [
    {
      id: 'npc-skeletondan',
      name: 'Esqueleto Dan',
      position: { x: 6, y: 5 },
      direction: 'up' as const,
      isWalking: false,
      outfit: { body: '#E0E0E0', hair: '#000000', clothes: '#1a1a1a' },
      level: 100,
      health: 1500,
      maxHealth: 1500,
      mana: 0,
      maxMana: 0,
    },
  ],
};
