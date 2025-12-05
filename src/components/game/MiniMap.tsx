import { Room, Player } from '@/types/game';
import { Map } from 'lucide-react';

interface MiniMapProps {
  room: Room;
  player: Player;
  npcs: Player[];
}

export const MiniMap = ({ room, player, npcs }: MiniMapProps) => {
  const scale = 4;

  return (
    <div className="pixel-panel p-2">
      <div className="flex items-center gap-1 mb-2">
        <Map size={10} className="text-primary" />
        <span className="text-[8px] gold-text">Mapa</span>
      </div>

      <div 
        className="relative stone-panel mx-auto"
        style={{
          width: room.width * scale,
          height: room.height * scale,
        }}
      >
        {/* Floor */}
        {room.floor.map((row, y) => (
          row.map((tile, x) => (
            <div
              key={`${x}-${y}`}
              className="absolute"
              style={{
                left: x * scale,
                top: y * scale,
                width: scale,
                height: scale,
                backgroundColor: tile === 'wall' ? 'hsl(var(--stone-dark))' : 'hsl(var(--wood-dark))',
              }}
            />
          ))
        ))}

        {/* Furniture dots */}
        {room.furniture.map((f) => (
          <div
            key={f.id}
            className="absolute bg-wood-light"
            style={{
              left: f.position.x * scale,
              top: f.position.y * scale,
              width: scale,
              height: scale,
            }}
          />
        ))}

        {/* NPCs */}
        {npcs.map((npc) => (
          <div
            key={npc.id}
            className="absolute bg-mana rounded-full"
            style={{
              left: npc.position.x * scale + 1,
              top: npc.position.y * scale + 1,
              width: scale - 2,
              height: scale - 2,
            }}
          />
        ))}

        {/* Player */}
        <div
          className="absolute bg-gold rounded-full transition-all duration-150"
          style={{
            left: player.position.x * scale + 1,
            top: player.position.y * scale + 1,
            width: scale - 2,
            height: scale - 2,
            boxShadow: '0 0 4px hsl(var(--gold))',
          }}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-2 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gold rounded-full" />
          <span className="text-[6px] text-muted-foreground">Você</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-mana rounded-full" />
          <span className="text-[6px] text-muted-foreground">NPCs</span>
        </div>
      </div>
    </div>
  );
};
