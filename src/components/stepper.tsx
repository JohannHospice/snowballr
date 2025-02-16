'use client';
import { ArrowLeft } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Button } from './ui/button';

export const StepperContext = React.createContext({
  index: 0,
  length: 0,
  next: () => {},
  previous: () => {},
});

export const useStepper = () => React.useContext(StepperContext);

export const StepperProvider = (props: { children: React.ReactNode[] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => {
      return prev === 0 ? 0 : prev - 1;
    });
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      return prev < props.children.length - 1 ? prev + 1 : prev;
    });
  }, [props.children.length]);

  return (
    <StepperContext.Provider
      value={{
        index: currentStep,
        length: props.children.length,
        next: nextStep,
        previous: previousStep,
      }}
    >
      {props.children.length === 0 ? null : props.children[currentStep]}
    </StepperContext.Provider>
  );
};

export const StepperHeading = (props: {
  title: string;
  children: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => (
  <div className='space-y-4 flex flex-col'>
    <h2 className='text-2xl font-bold flex items-center'>
      <props.icon className='h-8 w-8 inline-block mr-2' />
      {props.title}
    </h2>
    <p className='text-lg text-gray-600'>{props.children}</p>
  </div>
);

export const StepperFooter = (props: {
  isSkippable?: boolean;
  isNextDisabled?: boolean;
}) => {
  const { index, length, next, previous } = useStepper();

  return (
    <div className='flex justify-between flex-wrap mt-8'>
      {index > 0 ? (
        <Button variant='ghost' onClick={previous}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          <span className='hidden sm:inline-block'>
            Retour à l&apos;étape précédente
          </span>
        </Button>
      ) : (
        <div />
      )}
      <div className='flex gap-4 ml-4 justify-end flex-1'>
        {props.isSkippable && (
          <Button variant='outline' onClick={next}>
            Passer
          </Button>
        )}
        <Button type='submit' disabled={props.isNextDisabled}>
          {index === length - 1 ? 'Envoyer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
};
