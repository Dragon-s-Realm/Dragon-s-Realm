// Importa os tipos usados no componente
import { Room, Player, DroppedItem } from '@/types/game';
// Importa componentes visuais
import { Avatar } from './Avatar';
import { Furniture } from './Furniture';

// Define os tipos das props aceitas pelo componente GameRoom
interface GameRoomProps {
  room: Room;                         // Dados da sala (tamanho, piso, portais, móveis)
  player: Player;                     // Jogador atual
  npcs: Player[];                     // Lista de NPCs presentes
  droppedItems: DroppedItem[];        // Itens que foram dropados pelo chão
  onPickupItem: (id: string) => void; // Callback para pegar um item
}

// Tamanho padrão de cada tile do mapa
const TILE_SIZE = 50;

// Componente principal da sala
export const GameRoom = ({ room, player, npcs, droppedItems, onPickupItem }: GameRoomProps) => {
  return (
    <div className="relative overflow-hidden stone-panel p-2">
      
      {/* Título da sala (nome exibido no topo) */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-50 px-3 py-2 pixel-panel">
        <span className="text-[10px] gold-text">{room.name}</span>
      </div>

      {/* Indicação de quantos portais existem na sala */}
      {room.portals.length > 0 && (
        <div className="absolute top-2 right-2 z-50 px-2 py-1 pixel-panel">
          <span className="text-[8pt] text-accent">Portais: {room.portals.length}</span>
        </div>
      )}

      {/* Área principal do jogo (onde ficam tiles, players, NPCs etc.) */}
      <div 
        className="relative"
        style={{
          width: room.width * TILE_SIZE,    // Largura total baseada no tamanho da sala
          height: room.height * TILE_SIZE,  // Altura total baseada no tamanho da sala
        }}
      >
        {/* Renderização dos tiles do chão */}
        {room.floor.map((row, y) => (
          row.map((tile, x) => {
            const isPortal = room.portals.some(p => p.position.x === x && p.position.y === y);

            return (
              <div
                key={`${x}-${y}`}
                className="absolute transition-colors"

                style={{
                  // Posicionamento absoluto do tile
                  left: x * TILE_SIZE,
                  top: y * TILE_SIZE,
                  width: TILE_SIZE,
                  height: TILE_SIZE,

                  // Cor e estilo do tile - chão
                  backgroundColor: tile === 'wall' 
                    ? 'hsl(var(--stone-dark))' // Parede
                    : isPortal
                      ? 'hsl(var(--accent) / 0.2)' // Portal
                      : (x + y) % 2 === 0 
                        ? 'hsl(25 20% 18%)'       // Piso padrão
                        : 'hsl(25 15% 13%)',       // Variação para efeito xadrez

                  // Bordas somente para tiles de piso
                  borderRight: tile === 'floor' ? '1px solid hsl(var(--border) / 0.3)' : undefined,
                  borderBottom: tile === 'floor' ? '1px solid hsl(var(--border) / 0.3)' : undefined,

                  // Sombreamento para paredes e portais
                  boxShadow: tile === 'wall' 
                    ? 'inset 2px 2px 4px hsl(var(--stone-light)), inset -2px -2px 4px hsl(0 0% 0% / 0.5)'
                    : isPortal 
                      ? 'inset 0 0 10px hsl(var(--accent) / 0.5)'
                      : undefined,
                }}
              />
            );
          })
        ))}

        {/* Labels acima dos portais (nome/descrição) */}
        {room.portals.map(portal => (
          <div
            key={portal.id}
            className="absolute z-30 pointer-events-none"
            style={{
              left: portal.position.x * TILE_SIZE + TILE_SIZE / 2,
              top: portal.position.y * TILE_SIZE - 8,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="text-[6pt] text-accent whitespace-nowrap px-1 bg-background/80 rounded">
              {portal.label}
            </span>
          </div>
        ))}

        {/* Itens dropados no chão */}
        {droppedItems.map(dropped => (
          <button
            key={dropped.id}
            onClick={() => onPickupItem(dropped.id)}  // Executa callback ao clicar
            className="absolute z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
            style={{
              left: dropped.position.x * TILE_SIZE + TILE_SIZE / 2,
              top: dropped.position.y * TILE_SIZE + TILE_SIZE / 2,
              transform: 'translate(-50%, -50%)',
            }}
            title={`${dropped.item.name} (E para pegar)`} // Tooltip
          >
            {/* Ícone do item */}
            <span className="text-lg drop-shadow-lg">{dropped.item.icon}</span>
          </button>
        ))}

        {/* Móveis/objetos do cenário */}
        {room.furniture.map((f) => (
          <div
            key={f.id}
            style={{
              position: 'absolute',
              left: f.position.x * TILE_SIZE + TILE_SIZE / 2,
              top: f.position.y * TILE_SIZE + TILE_SIZE / 2,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Furniture furniture={f} />
          </div>
        ))}

        {/* NPCs (outros personagens controlados pelo sistema) */}
        {npcs.map((npc) => (
          <div
            key={npc.id}
            style={{
              position: 'absolute',
              left: npc.position.x * TILE_SIZE + TILE_SIZE / 2,
              top: npc.position.y * TILE_SIZE + TILE_SIZE / 2,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <Avatar player={npc} />
          </div>
        ))}

        {/* Jogador atual (controlado pelo usuário) */}
        <div
          style={{
            position: 'absolute',
            left: player.position.x * TILE_SIZE + TILE_SIZE / 2,
            top: player.position.y * TILE_SIZE + TILE_SIZE / 2,
            transform: 'translate(-50%, -100%)',
            transition: 'left 0.15s ease-out, top 0.15s ease-out', // Animação suave
          }}
        >
          <Avatar player={player} isCurrentPlayer />
        </div>

        {/* Efeito de iluminação ambiente */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 20%, transparent 0%, hsl(0 0% 0% / 0.3) 100%)',
          }}
        />
      </div>

      {/* Dica para pegar itens */}
      {droppedItems.length > 0 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 px-2 py-1 pixel-panel">
          <span className="text-[6pt] text-muted-foreground">
            Pressione <span className="text-yellow-500">E</span> para pegar itens
          </span>
        </div>
      )}
    </div>
  );
};
