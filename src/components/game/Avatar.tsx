import { Player } from '@/types/game';
import { cn } from '@/lib/utils';

interface AvatarProps {
  player: Player;
  isCurrentPlayer?: boolean;
  showName?: boolean;
}

export const Avatar = ({ player, isCurrentPlayer = false, showName = true }: AvatarProps) => {
  const getDirectionOffset = () => {
    switch (player.direction) {
      case 'up': return 'rotate-0';
      case 'down': return 'rotate-0';
      case 'left': return '-scale-x-100';
      case 'right': return 'scale-x-100';
    }
  };

  return (
    <div className="absolute flex flex-col items-center" style={{ zIndex: player.position.y + 10 }}>
      {/* Name tag */}
      {showName && (
        <div 
          className={cn(
            "px-1 py-0.5 text-[6px] mb-0.5 whitespace-nowrap",
            isCurrentPlayer ? "gold-text font-bold" : "text-foreground"
          )}
          style={{ 
            background: 'hsl(var(--card) / 0.9)',
            border: '1px solid hsl(var(--border))'
          }}
        >
          {player.name}
        </div>
      )}
      
      {/* Character sprite */}
      <div 
        className={cn(
          "relative w-8 h-10 transition-transform duration-100",
          getDirectionOffset(),
          player.isWalking && "animate-walk"
        )}
      >
        {/* Body */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-7 rounded-t"
          style={{ backgroundColor: player.outfit.clothes }}
        />
        
        {/* Head */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
          style={{ backgroundColor: player.outfit.body }}
        />
        
        {/* Hair */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-2.5 rounded-t-full"
          style={{ backgroundColor: player.outfit.hair }}
        />
        
        {/* Eyes */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-1 h-1 bg-black rounded-full" />
          <div className="w-1 h-1 bg-black rounded-full" />
        </div>
        
        {/* Level indicator for current player */}
        {isCurrentPlayer && (
          <div 
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 text-[5px] gold-text"
            style={{ 
              background: 'hsl(var(--stone-dark))',
              border: '1px solid hsl(var(--gold))'
            }}
          >
            {player.level}
          </div>
        )}
      </div>
    </div>
  );
};
