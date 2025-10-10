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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function para restaurar scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = "unset";
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
          <h2 className="text-2xl font-bold">
            How it works {"(it's super simple)"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            1️⃣ Share your contact info, we prefer Discord for faster delivery,
            but email works too
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            2️⃣ Pick your subscription
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            3️⃣ Choose if you want us to create a new account or activate it on
            yours {"(DM the creator on Discord if you prefer your own account)"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            4️⃣ We pay for the plan
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            5️⃣ You get your account ready, either a new one with login details
            or your own upgraded to premium
          </p>
          <div className="pt-6 border-t mt-6 flex flex-col gap-5">
            <p className="text-gray-400 dark:text-gray-300">
              The whole process takes less than a minute to set up, and
              you&apos;ll receive your account in under 12 hours. You can
              contact the creator anytime on Discord replies are super fast and
              friendly
            </p>
            <p className=" dark:text-gray-300">
              Thanks for trusting us, enjoy your premium plan!
            </p>
          </div>
          
          {/* Botón de cerrar */}
          <div className="pt-4">
            <button 
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              close
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HowItWorksCard;
