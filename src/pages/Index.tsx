import { useGameState } from '@/hooks/useGameState';
import { GameRoom } from '@/components/game/GameRoom';
import { ChatPanel } from '@/components/game/ChatPanel';
import { PlayerStats } from '@/components/game/PlayerStats';
import { Inventory } from '@/components/game/Inventory';
import { MiniMap } from '@/components/game/MiniMap';
import { ControlsHelp } from '@/components/game/ControlsHelp';

const Index = () => {
  const { player, room, npcs, messages, sendMessage } = useGameState();

  return (
    <div className="min-h-screen bg-background p-2 md:p-4 flex flex-col">
      {/* Header */}
      <header className="pixel-panel px-4 py-2 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🐉</span>
          <h1 className="text-sm gold-text hidden sm:block">Dragon's Realm</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-muted-foreground">Online: 127</span>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </header>

      {/* Main game layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-2 min-h-0">
        {/* Left sidebar - Stats & Mini Map */}
        <aside className="lg:w-48 flex flex-row lg:flex-col gap-2">
          <div className="flex-1 lg:flex-none">
            <PlayerStats player={player} />
          </div>
          <div className="hidden lg:block">
            <MiniMap room={room} player={player} npcs={npcs} />
          </div>
          <div className="hidden lg:block">
            <ControlsHelp />
          </div>
        </aside>

        {/* Center - Game Room */}
        <main className="flex-1 flex items-center justify-center overflow-auto">
          <GameRoom room={room} player={player} npcs={npcs} />
        </main>

        {/* Right sidebar - Inventory & Chat */}
        <aside className="lg:w-56 flex flex-col gap-2 min-h-0">
          <div className="flex-1 min-h-0 lg:max-h-[50%]">
            <Inventory />
          </div>
          <div className="flex-1 min-h-0 lg:min-h-[200px]">
            <ChatPanel 
              messages={messages} 
              onSendMessage={sendMessage}
              currentPlayerId={player.id}
            />
          </div>
        </aside>
      </div>

      {/* Mobile controls hint */}
      <div className="lg:hidden pixel-panel p-2 mt-2 text-center">
        <p className="text-[8px] text-muted-foreground">
          Use WASD ou setas do teclado para mover seu personagem
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-2 text-center">
        <p className="text-[6px] text-muted-foreground">
          Dragon's Realm © 2024 - Um mundo de aventuras te espera
        </p>
      </footer>
    </div>
  );
};

export default Index;
