"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Progress } from "../ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, MessageCircle, User, Lock, Check } from "lucide-react";

interface NetflixPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetflixPurchaseModal = ({ isOpen, onClose }: NetflixPurchaseModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium-yearly");
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'discord' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    discordUsername: '',
    password: ''
  });

  const steps = [
    'Select Plan',
    'Choose Option', 
    'Delivery Method',
    'Complete'
  ];

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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleOptionSelect = (option: 'create' | 'activate') => {
    if (option === 'create') {
      setCurrentStep(2); // Skip to delivery method for create
    } else {
      setCurrentStep(3); // Go to activate form
    }
  };

  const handleDeliveryMethodSelect = (method: 'email' | 'discord') => {
    setDeliveryMethod(method);
  };

  const handleFormSubmit = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    const price = isYearly ? plan?.yearlyPrice : plan?.monthlyPrice;
    console.log("Processing:", {
      step: currentStep,
      plan: selectedPlan,
      price: price,
      period: isYearly ? "Yearly" : "Monthly",
      deliveryMethod,
      formData
    });
    onClose();
  };

  const resetModal = () => {
    setCurrentStep(0);
    setDeliveryMethod(null);
    setFormData({ email: '', discordUsername: '', password: '' });
  };

  // Reset modal when it closes
  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  // No renderizar nada si el modal no está abierto
  if (!isOpen) return null;

  const pageVariants = {
    initial: { 
      opacity: 0,
      x: 50,
      scale: 0.95
    },
    in: { 
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: { 
      opacity: 0,
      x: -50,
      scale: 0.95
    }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.4
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="plan-selection"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-6"
          >
            {/* Switch para alternar entre mensual/anual */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-blue-600"
              />
              <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                Yearly
              </span>
            </div>

            <div className="space-y-3">
              {availablePlans.map((plan) => {
                const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
                const originalPrice = isYearly ? plan.yearlyOriginalPrice : plan.monthlyOriginalPrice;
                const period = isYearly ? "Yearly" : "Monthly";
                
                return (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
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
                          <p className="text-sm text-gray-600">
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
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="option-selection"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose your option</h2>
              <p className="text-sm text-gray-600">How would you like to proceed?</p>
            </div>

            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 border-gray-200 hover:border-green-300 hover:bg-green-50"
                onClick={() => handleOptionSelect('create')}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">Create New Account</h3>
                    <p className="text-sm text-gray-600">We'll create a new Netflix account with your subscription</p>
                  </div>
                  <Check className="h-5 w-5 text-gray-400" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                onClick={() => handleOptionSelect('activate')}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">Activate on Existing Account</h3>
                    <p className="text-sm text-gray-600">Add the subscription to your current Netflix account</p>
                  </div>
                  <Check className="h-5 w-5 text-gray-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="delivery-method"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Where do you want to receive the account?</h2>
              <p className="text-sm text-gray-600">Choose your preferred delivery method</p>
            </div>

            {!deliveryMethod ? (
              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => handleDeliveryMethodSelect('email')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">Email</h3>
                      <p className="text-sm text-gray-600">We'll send the account details to your email</p>
                    </div>
                    <Check className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  onClick={() => handleDeliveryMethodSelect('discord')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <MessageCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">Discord</h3>
                      <p className="text-sm text-gray-600">We'll send the account details via Discord</p>
                    </div>
                    <Check className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeliveryMethod(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {deliveryMethod === 'email' ? 'Enter your email' : 'Enter your Discord username'}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {deliveryMethod === 'email' ? 'Email Address' : 'Discord Username'}
                    </label>
                    <input
                      type={deliveryMethod === 'email' ? 'email' : 'text'}
                      value={deliveryMethod === 'email' ? formData.email : formData.discordUsername}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        [deliveryMethod === 'email' ? 'email' : 'discordUsername']: e.target.value
                      }))}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder={deliveryMethod === 'email' ? 'your@email.com' : 'username#1234'}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="activate-account"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Activate on your account</h2>
              <p className="text-sm text-gray-600">Enter your account details to activate the subscription</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discord Username</label>
                <input
                  type="text"
                  value={formData.discordUsername}
                  onChange={(e) => setFormData(prev => ({ ...prev, discordUsername: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="username#1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your Netflix password"
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const getProgressValue = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedPlan !== "";
      case 1:
        return false; // No direct proceed, user must select option
      case 2:
        return deliveryMethod && (
          (deliveryMethod === 'email' && formData.email) ||
          (deliveryMethod === 'discord' && formData.discordUsername)
        );
      case 3:
        return formData.discordUsername && formData.email && formData.password;
      default:
        return false;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-1 sm:p-5 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <Card
        className="relative w-full max-w-md mx-4 my-8 p-6 bg-white shadow-2xl backdrop-blur-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {steps[currentStep]}
            </span>
          </div>
          <Progress value={getProgressValue()} className="h-2" />
        </div>

        {/* Content Area */}
        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>

          {currentStep === 1 ? (
            <div className="text-sm text-gray-500">
              Select an option above
            </div>
          ) : (
            <Button
              onClick={currentStep === steps.length - 1 ? handleFormSubmit : handleNext}
              disabled={!canProceed()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {currentStep === steps.length - 1 ? 'Complete Purchase' : 'Next'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NetflixPurchaseModal;
