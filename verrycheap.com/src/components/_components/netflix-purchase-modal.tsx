"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

interface NetflixPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetflixPurchaseModal = ({ isOpen, onClose }: NetflixPurchaseModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium-monthly");

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

  const plans = [
    {
      id: "premium-monthly",
      name: "Netflix Premium",
      period: "Monthly",
      price: 22,
      originalPrice: 22
    },
    {
      id: "premium-yearly",
      name: "Netflix Premium",
      period: "Yearly",
      price: 100,
      originalPrice: 220
    },
    {
      id: "standard-monthly",
      name: "Netflix Standard",
      period: "Monthly",
      price: 15,
      originalPrice: 15
    },
   
  ];

  const handlePurchase = () => {
    if (selectedPlan) {
      // Aquí puedes agregar la lógica de compra
      console.log("Purchasing plan:", selectedPlan);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-1 sm:p-5 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <Card
        className="relative w-full max-w-md mx-4 my-8 p-6 bg-white shadow-2xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          

          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedPlan === plan.id}
                      onCheckedChange={() => setSelectedPlan(plan.id)}
                      className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {plan.period}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${plan.price}</p>
                    <p className="text-sm text-gray-500 line-through">
                      ${plan.originalPrice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button
              onClick={handlePurchase}
              disabled={!selectedPlan}
            //   w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors
              className="w-full text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Purchase
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NetflixPurchaseModal;
