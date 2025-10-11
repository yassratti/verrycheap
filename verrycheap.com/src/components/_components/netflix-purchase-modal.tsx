"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";

interface NetflixPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetflixPurchaseModal = ({ isOpen, onClose }: NetflixPurchaseModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium-monthly");
  const [isYearly, setIsYearly] = useState<boolean>(false);

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

  const plans = [
    {
      id: "premium",
      name: "Netflix Premium",
      monthlyPrice: 22,
      yearlyPrice: 100,
      monthlyOriginalPrice: 22,
      yearlyOriginalPrice: 220,
      allowsMonthly: true,
      allowsYearly: true
    },
    {
      id: "standard",
      name: "Netflix Standard", 
      monthlyPrice: 15,
      yearlyPrice: 80,
      monthlyOriginalPrice: 15,
      yearlyOriginalPrice: 168,
      allowsMonthly: true,
      allowsYearly: true
    },
    {
      id: "basic",
      name: "Netflix Basic",
      monthlyPrice: 10,
      yearlyPrice: 50,
      monthlyOriginalPrice: 10,
      yearlyOriginalPrice: 120,
      allowsMonthly: false, // Basic solo permite anual
      allowsYearly: true
    }
  ];

  // Filtrar planes disponibles según el switch
  const availablePlans = plans.filter(plan => 
    isYearly ? plan.allowsYearly : plan.allowsMonthly
  );

  // Actualizar plan seleccionado si no está disponible
  useEffect(() => {
    const availablePlans = plans.filter(plan => 
      isYearly ? plan.allowsYearly : plan.allowsMonthly
    );
    
    if (!availablePlans.find(plan => plan.id === selectedPlan)) {
      setSelectedPlan(availablePlans[0]?.id || "");
    }
  }, [isYearly, selectedPlan]);

  const handlePurchase = () => {
    if (selectedPlan) {
      const plan = plans.find(p => p.id === selectedPlan);
      const price = isYearly ? plan?.yearlyPrice : plan?.monthlyPrice;
      console.log("Purchasing plan:", selectedPlan, "Price:", price, "Period:", isYearly ? "Yearly" : "Monthly");
      onClose();
    }
  };

  // No renderizar nada si el modal no está abierto
  if (!isOpen) return null;

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
          {/* Switch para alternar entre mensual/anual */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-sm font-medium ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
              Yearly
            </span>
          </div>

          <div className="space-y-4">
            {availablePlans.map((plan) => {
              const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const originalPrice = isYearly ? plan.yearlyOriginalPrice : plan.monthlyOriginalPrice;
              const period = isYearly ? "Yearly" : "Monthly";
              
              return (
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
                          {period}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${currentPrice}</p>
                      <p className="text-sm text-gray-500 line-through">
                        ${originalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
