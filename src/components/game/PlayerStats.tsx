import { Player } from '@/types/game';
import { Heart, Droplet, Shield, Sword } from 'lucide-react';

interface PlayerStatsProps {
  player: Player;
}

export const PlayerStats = ({ player }: PlayerStatsProps) => {
  const healthPercent = (player.health / player.maxHealth) * 100;
  const manaPercent = (player.mana / player.maxMana) * 100;

  return (
    <div className="pixel-panel p-2">
      <div className="flex items-center gap-2 mb-2">
        {/* Mini avatar */}
        <div className="w-10 h-10 stone-panel flex items-center justify-center">
          <div className="w-6 h-7 relative">
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-5 rounded-t"
              style={{ backgroundColor: player.outfit.clothes }}
            />
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
              style={{ backgroundColor: player.outfit.body }}
            />
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 rounded-t-full"
              style={{ backgroundColor: player.outfit.hair }}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="text-[10px] gold-text mb-0.5">{player.name}</div>
          <div className="text-[8px] text-muted-foreground">Level {player.level}</div>
        </div>
      </div>

      {/* Health bar */}
      <div className="mb-2">
        <div className="flex items-center gap-1 mb-0.5">
          <Heart size={10} className="text-health" />
          <span className="text-[7px] text-foreground">{player.health}/{player.maxHealth}</span>
        </div>
        <div className="h-2 bg-stone-dark rounded overflow-hidden border border-border">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${healthPercent}%`,
              background: 'linear-gradient(180deg, hsl(0 70% 55%) 0%, hsl(0 70% 40%) 100%)'
            }}
          />
        </div>
      </div>

      {/* Mana bar */}
      <div className="mb-3">
        <div className="flex items-center gap-1 mb-0.5">
          <Droplet size={10} className="text-mana" />
          <span className="text-[7px] text-foreground">{player.mana}/{player.maxMana}</span>
        </div>
        <div className="h-2 bg-stone-dark rounded overflow-hidden border border-border">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${manaPercent}%`,
              background: 'linear-gradient(180deg, hsl(210 70% 55%) 0%, hsl(210 70% 40%) 100%)'
            }}
          />
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-1">
        <div className="stone-panel p-1 flex items-center gap-1">
          <Sword size={10} className="text-primary" />
          <span className="text-[7px]">ATK: 45</span>
        </div>
        <div className="stone-panel p-1 flex items-center gap-1">
          <Shield size={10} className="text-accent" />
          <span className="text-[7px]">DEF: 32</span>
        </div>
      </div>
    </div>
  );
};
