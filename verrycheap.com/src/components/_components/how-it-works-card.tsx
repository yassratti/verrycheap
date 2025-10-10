"use client";

import { Card } from "../ui/card";
import { useEffect } from "react";

interface HowItWorksCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksCard = ({ isOpen, onClose }: HowItWorksCardProps) => {
  // Desactivar scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function para restaurar scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // No renderizar nada si el modal no está abierto
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
      onClick={onClose} // Cerrar al hacer clic en el fondo
    >
      <Card 
        className="relative max-w-md w-full p-6 bg-white/90 dark:bg-zinc-900/90 shadow-2xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()} // Prevenir que se cierre al hacer clic en el card
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="pt-4">
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              onClick={onClose}
            >
              Learn More
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HowItWorksCard;
