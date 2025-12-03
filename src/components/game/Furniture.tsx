import { Furniture as FurnitureType } from '@/types/game';
import { cn } from '@/lib/utils';

interface FurnitureProps {
  furniture: FurnitureType;
}

export const Furniture = ({ furniture }: FurnitureProps) => {
  const renderFurniture = () => {
    switch (furniture.type) {
      case 'table':
        return (
          <div className="w-10 h-8 relative">
            <div className="absolute inset-x-1 top-0 h-2 bg-wood-light rounded-t border-2 border-wood-dark" />
            <div className="absolute inset-x-2 top-2 bottom-0 bg-wood-dark" />
          </div>
        );
      
      case 'chair':
        return (
          <div 
            className="w-5 h-6 relative"
            style={{ transform: `rotate(${furniture.rotation}deg)` }}
          >
            <div className="absolute bottom-0 left-0.5 w-1 h-3 bg-wood-dark" />
            <div className="absolute bottom-0 right-0.5 w-1 h-3 bg-wood-dark" />
            <div className="absolute bottom-2 inset-x-0 h-2 bg-wood-light border border-wood-dark rounded-t" />
            <div className="absolute top-0 inset-x-0 h-3 bg-wood-light border border-wood-dark rounded-t" />
          </div>
        );
      
      case 'torch':
        return (
          <div className="w-3 h-8 relative torch-glow">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-wood-dark" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4 bg-torch-orange rounded-full animate-pulse" />
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-torch-yellow rounded-full" />
          </div>
        );
      
      case 'barrel':
        return (
          <div className="w-7 h-8 relative">
            <div className="absolute inset-0 bg-wood-dark rounded-lg" />
            <div className="absolute inset-x-0.5 top-1 h-1 bg-stone-dark rounded" />
            <div className="absolute inset-x-0.5 bottom-1 h-1 bg-stone-dark rounded" />
            <div className="absolute inset-x-1 inset-y-2 bg-wood-light rounded" />
          </div>
        );
      
      case 'chest':
        return (
          <div className="w-8 h-6 relative">
            <div className="absolute inset-0 bg-wood-dark rounded border-2 border-stone-dark" />
            <div className="absolute inset-x-0.5 top-0.5 h-2 bg-wood-light rounded-t" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full" />
          </div>
        );
      
      default:
        return <div className="w-6 h-6 bg-stone-dark rounded" />;
    }
  };

  return (
    <div 
      className="absolute flex items-center justify-center"
      style={{ zIndex: furniture.position.y + 5 }}
    >
      {renderFurniture()}
    </div>
  );
};
