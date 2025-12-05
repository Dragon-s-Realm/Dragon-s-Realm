import { Keyboard } from 'lucide-react';

export const ControlsHelp = () => {
  return (
    <div className="pixel-panel p-2">
      <div className="flex items-center gap-1 mb-2">
        <Keyboard size={10} className="text-primary" />
        <span className="text-[8px] gold-text">Controles</span>
      </div>

      <div className="grid grid-cols-3 gap-1 w-fit mx-auto mb-2">
        <div />
        <div className="stone-panel w-5 h-5 flex items-center justify-center text-[8px]">W</div>
        <div />
        <div className="stone-panel w-5 h-5 flex items-center justify-center text-[8px]">A</div>
        <div className="stone-panel w-5 h-5 flex items-center justify-center text-[8px]">S</div>
        <div className="stone-panel w-5 h-5 flex items-center justify-center text-[8px]">D</div>
      </div>

      <p className="text-[6px] text-muted-foreground text-center">
        Use WASD ou setas para mover
      </p>
    </div>
  );
};
