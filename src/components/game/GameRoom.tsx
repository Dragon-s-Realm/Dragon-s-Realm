import { Room, Player } from '@/types/game';
import { Avatar } from './Avatar';
import { Furniture } from './Furniture';

interface GameRoomProps {
  room: Room;
  player: Player;
  npcs: Player[];
}

const TILE_SIZE = 40;

export const GameRoom = ({ room, player, npcs }: GameRoomProps) => {
  return (
    <div className="relative overflow-hidden stone-panel p-2">
      {/* Room title */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 px-3 py-1 pixel-panel">
        <span className="text-[10px] gold-text">{room.name}</span>
      </div>

      {/* Game area */}
      <div 
        className="relative"
        style={{
          width: room.width * TILE_SIZE,
          height: room.height * TILE_SIZE,
        }}
      >
        {/* Floor tiles */}
        {room.floor.map((row, y) => (
          row.map((tile, x) => (
            <div
              key={`${x}-${y}`}
              className="absolute transition-colors"
              style={{
                left: x * TILE_SIZE,
                top: y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                backgroundColor: tile === 'wall' 
                  ? 'hsl(var(--stone-dark))' 
                  : (x + y) % 2 === 0 
                    ? 'hsl(25 20% 18%)' 
                    : 'hsl(25 15% 15%)',
                borderRight: tile === 'floor' ? '1px solid hsl(var(--border) / 0.3)' : undefined,
                borderBottom: tile === 'floor' ? '1px solid hsl(var(--border) / 0.3)' : undefined,
                boxShadow: tile === 'wall' 
                  ? 'inset 2px 2px 4px hsl(var(--stone-light)), inset -2px -2px 4px hsl(0 0% 0% / 0.5)' 
                  : undefined,
              }}
            />
          ))
        ))}

        {/* Furniture */}
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

        {/* NPCs */}
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

        {/* Current player */}
        <div
          style={{
            position: 'absolute',
            left: player.position.x * TILE_SIZE + TILE_SIZE / 2,
            top: player.position.y * TILE_SIZE + TILE_SIZE / 2,
            transform: 'translate(-50%, -100%)',
            transition: 'left 0.15s ease-out, top 0.15s ease-out',
          }}
        >
          <Avatar player={player} isCurrentPlayer />
        </div>

        {/* Ambient lighting overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 20%, transparent 0%, hsl(0 0% 0% / 0.3) 100%)',
          }}
        />
      </div>
    </div>
  );
};
