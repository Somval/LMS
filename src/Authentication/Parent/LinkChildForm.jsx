import React, { useState } from 'react';
import LinkChildOptionSelect from './LinkChildOptionSelect';
import EnterLinkCodeForm from './EnterLinkCodeForm';

export default function LinkChildForm({ onNext }) {
  const [selectedOption, setSelectedOption] = useState(null); // Nothing pre-selected
  const [subStep, setSubStep] = useState(1); // 1 = Selection, 2 = Enter Link Code

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option === 'link') {
      setSubStep(2); // Switches view on click
    }
  };

  const handleBackToOptions = () => {
    setSubStep(1);
    setSelectedOption(null);
  };

  return (
    <div className="w-full">
      {subStep === 1 ? (
        <LinkChildOptionSelect
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
        />
      ) : (
        <EnterLinkCodeForm onBack={handleBackToOptions} onNext={onNext} />
      )}
    </div>
  );
}