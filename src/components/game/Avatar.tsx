import { Player } from '@/types/game';
import { cn } from '@/lib/utils';
import playerNpc from '@/assets/Tiny RPG Character Asset Pack v1.03 -Free Soldier&Orc\Characters(100x100)\Orc\Orc';

// Props recebidas pelo componente Avatar
interface AvatarProps {
  player: Player;               // Dados completos do jogador
  isCurrentPlayer?: boolean;    // Indica se este avatar é do jogador atual
  showName?: boolean;           // Exibe ou não o nome acima do personagem
}

// Componente de Avatar do jogador no mapa
export const Avatar = ({ player, isCurrentPlayer = false, showName = true }: AvatarProps) => {

  // Função responsável por ajustar a orientação do sprite
  const getDirectionOffset = () => {
    switch (player.direction) {
      case 'up': return 'rotate-0';       // Ainda não há sprite diferente, então sem rotação
      case 'down': return 'rotate-0';     // Igual ao caso acima
      case 'left': return '-scale-x-100'; // Espelha o personagem (vira para a esquerda)
      case 'right': return 'scale-x-100'; // Espelha para a direita
    }
  };

  return (
    // Container principal do avatar
    // A posição absoluta permite posicionamento exato no grid
    // z-index baseado na posição Y para simular profundidade (quem está "mais abaixo" fica por cima)
    <div className="relative flex flex-col items-center" style={{ zIndex: player.position.y + 10 }}>
      
      {/* Name tag (nome acima da cabeça) */}
      {showName && (
        <div 
          className={cn(
            "px-1 py-0.5 text-[6px] mb-0.5 whitespace-nowrap",
            // Destaque especial caso seja o jogador atual
            isCurrentPlayer ? "gold-text font-bold" : "text-foreground"
          )}
          style={{ 
            background: 'hsl(var(--card) / 0.9)',   // Fundo translúcido
            border: '1px solid hsl(var(--border))'  // Borda padrão do tema
          }}
        >
          {player.name}
        </div>
      )}
      
      {/* Sprite completo do personagem */}
      <div 
        className={cn(
          "relative w-8 h-10 transition-transform duration-100", // Animações suaves
          getDirectionOffset(),                                  // Orientação baseada na direção
          player.isWalking && "animate-walk"                     // Animação se estiver andando
        )}
      >
        
        {/* ===== Corpo ===== */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-7 rounded-t"
          style={{ backgroundColor: player.outfit.clothes }}  // Cor da roupa
        />

        {/* ===== Cabeça ===== */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
          style={{ backgroundColor: player.outfit.body }}     // Cor de pele
        />

        {/* ===== Cabelo ===== */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-2.5 rounded-t-full"
          style={{ backgroundColor: player.outfit.hair }}     // Cor do cabelo
        />

        {/* ===== Olhos ===== */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-1 h-1 bg-black rounded-full" />   {/* Olho esquerdo */}
          <div className="w-1 h-1 bg-black rounded-full" />   {/* Olho direito */}
        </div>

        {/* ===== Indicador de nível (só para o jogador atual) ===== */}
        {isCurrentPlayer && (
          <div 
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 text-[5px] gold-text"
            style={{ 
              background: 'hsl(var(--stone-dark))',
              border: '1px solid hsl(var(--gold))'
            }}
          >
            {player.level}  {/* Mostra o nível do jogador atual */}
          </div>
        )}
      </div>
    </div>
  );
};
