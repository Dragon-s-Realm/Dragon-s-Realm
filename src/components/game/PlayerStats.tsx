// Importa o tipo Player da estrutura global do jogo
import { Player } from '@/types/game';

// Importa ícones do pacote lucide-react
import { Heart, Droplet, Shield, Sword } from 'lucide-react';

// Define as props esperadas: o componente recebe um Player
interface PlayerStatsProps {
  player: Player;
}

// Componente responsável por exibir o painel de status do jogador
export const PlayerStats = ({ player }: PlayerStatsProps) => {

  // Calcula porcentagem da vida atual comparando com o máximo
  const healthPercent = (player.health / player.maxHealth) * 100;

  // Calcula porcentagem de mana atual comparando com o máximo
  const manaPercent = (player.mana / player.maxMana) * 100;

  return (
    // Painel externo estilizado em pixel art
    <div className="pixel-panel p-1.5">

      {/* Header com avatar + nome + level */}
      <div className="flex items-center gap-2.5 mb-3">

        {/* Mini avatar do jogador (feito com formas simples para estilo retrô) */}
        <div className="w-10 h-10 stone-panel flex items-center justify-center">
          <div className="w-6 h-7 absolute">

            {/* Corpo / roupa */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-5 rounded-t"
              style={{ backgroundColor: player.outfit.clothes }}
            />

            {/* Pele / rosto */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
              style={{ backgroundColor: player.outfit.body }}
            />

            {/* Cabelo */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 rounded-t-full"
              style={{ backgroundColor: player.outfit.hair }}
            />
          </div>
        </div>

        {/* Nome e level do jogador */}
        <div className="flex-1">
          <div className="text-[10px] gold-text mb-0.5">{player.name}</div>
          <div className="text-[8px] text-muted-foreground">Level {player.level}</div>
        </div>
      </div>

      {/* ======================= */}
      {/*       HEALTH BAR        */}
      {/* ======================= */}

      <div className="mb-2.5">
        {/* Texto e ícone */}
        <div className="flex items-center gap-1 mb-0.5">
          <Heart size={10} className="text-health" />
          <span className="text-[7px] text-foreground">
            {player.health}/{player.maxHealth}
          </span>
        </div>

        {/* Barra de vida (fundo) */}
        <div className="h-2 bg-stone-dark rounded overflow-hidden border border-border">
          {/* Barra interna (preenchimento animado) */}
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${healthPercent}%`,
              background: 'linear-gradient(180deg, hsl(0 70% 55%) 0%, hsl(0 70% 40%) 100%)'
            }}
          />
        </div>
      </div>

      {/* ======================= */}
      {/*        MANA BAR         */}
      {/* ======================= */}

      <div className="mb-3">
        <div className="flex items-center gap-1 mb-0.5">
          <Droplet size={10} className="text-mana" />
          <span className="text-[7px] text-foreground">
            {player.mana}/{player.maxMana}
          </span>
        </div>

        {/* Barra de mana (fundo) */}
        <div className="h-2 bg-stone-dark rounded overflow-hidden border border-border">
          {/* Barra interna (preenchimento animado) */}
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${manaPercent}%`,
              background: 'linear-gradient(180deg, hsl(210 70% 55%) 0%, hsl(210 70% 40%) 100%)'
            }}
          />
        </div>
      </div>

      {/* ======================= */}
      {/*      QUICK STATS        */}
      {/* ======================= */}

      <div className="grid grid-cols-2 gap-1">

        {/* Ataque do jogador */}
        <div className="stone-panel p-1 flex items-center gap-1">
          <Sword size={10} className="text-primary" />
          <span className="text-[7px]">ATK: 45</span>
        </div>

        {/* Defesa do jogador */}
        <div className="stone-panel p-1 flex items-center gap-1">
          <Shield size={10} className="text-accent" />
          <span className="text-[7px]">DEF: 32</span>
        </div>
      </div>
    </div>
  );
};
