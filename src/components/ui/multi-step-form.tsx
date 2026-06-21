import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

const multiStepFormVariants = cva(
  "flex flex-col",
  {
    variants: {
      size: {
        default: "md:w-[700px]",
        sm: "md:w-[550px]",
        lg: "md:w-[850px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface MultiStepFormProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof multiStepFormVariants> {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  onBack: () => void;
  onNext: () => void;
  onClose?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  footerContent?: React.ReactNode;
  stepTitles?: string[];
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  ({
    className,
    size,
    currentStep,
    totalSteps,
    title,
    description,
    onBack,
    onNext,
    onClose,
    backButtonText = "Back",
    nextButtonText = "Next Step",
    footerContent,
    stepTitles,
    children,
    ...props
  }, ref) => {
    const progress = Math.round((currentStep / totalSteps) * 100);

    return (
      <Card ref={ref} className={cn(multiStepFormVariants({ size }), className)} {...props}>
        <CardHeader className="relative">
          <div className="flex items-center justify-between pr-8">
            <CardTitle className="font-sans tracking-tight">{title}</CardTitle>
          </div>
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              aria-label="Close"
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <CardDescription>{description}</CardDescription>
            <div className="flex-1 flex items-center w-full mt-2">
              <Stepper value={currentStep} className="w-full">
                <StepperNav className="gap-3 w-full flex-row">
                  {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepIndex) => {
                    const title = stepTitles ? stepTitles[stepIndex - 1] : `Step ${stepIndex}`;
                    return (
                      <StepperItem key={stepIndex} step={stepIndex} className="relative flex-1 items-start w-full min-w-0">
                        <StepperTrigger className="flex flex-col items-start justify-center gap-1.5 grow w-full p-0 m-0 bg-transparent border-0 focus-visible:ring-0 cursor-default pointer-events-none">
                          <div className="relative rounded-full h-1 w-full shrink-0 border-0 overflow-hidden bg-zinc-800">
                            <motion.div 
                              initial={false}
                              animate={{ width: stepIndex <= currentStep ? "100%" : "0%" }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="absolute left-0 top-0 h-full bg-cyan-500 shadow-[0_0_8px_rgba(8,145,178,0.5)]"
                            />
                          </div>
                          <div className="flex flex-col items-start max-w-full overflow-hidden w-full">
                            <StepperTitle className={cn(
                              "text-start font-sans font-bold text-[10px] uppercase tracking-widest truncate w-full",
                              stepIndex <= currentStep ? "text-zinc-100" : "text-zinc-500"
                            )}>
                              {title}
                            </StepperTitle>
                          </div>
                        </StepperTrigger>
                      </StepperItem>
                    );
                  })}
                </StepperNav>
              </Stepper>
            </div>
        </CardHeader>

        <CardContent className="relative min-h-[300px] overflow-hidden px-0">
          <Carousel index={currentStep - 1} disableDrag>
            <CarouselContent transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}>
              {children}
            </CarouselContent>
          </Carousel>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div>{footerContent}</div>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <button 
                onClick={onBack}
                className="w-[140px] h-8 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-ring/50 bg-gradient-to-b from-[#2a2a2f] to-[#121214] border border-white/10 hover:border-white/20 hover:from-[#323238] hover:to-[#171719] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_4px_16px_rgba(0,0,0,0.4)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] active:translate-y-[1px] text-white"
              >
                {backButtonText}
              </button>
            )}
            <Button className="w-[140px]" onClick={onNext}>
              {nextButtonText}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

MultiStepForm.displayName = "MultiStepForm";

export { MultiStepForm };
