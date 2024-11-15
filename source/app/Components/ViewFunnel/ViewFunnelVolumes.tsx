import React, { useState } from 'react';
import { Card, Button, TextField, Checkbox } from '@shopify/polaris';
import { XIcon } from '@shopify/polaris-icons';

type DiscountLevel = {
  volume: string;
  discount: string;
  description: string;
  label: string;
  isCustomDescription: boolean;
};

function ViewDiscountConfiguration() {
  const [discountVolume, setDiscountVolume] = useState("3");
  const [discountAmount, setDiscountAmount] = useState("5");

  const [discountLevels, setDiscountLevels] = useState<DiscountLevel[]>([
    {
      volume: `${discountVolume}`,
      discount: `${discountAmount}`,
      description: `${discountAmount}% discount`,
      label: `-${discountAmount}%`,
      isCustomDescription: false,
    },
  ]);

  const [autoLabels, setAutoLabels] = useState(true);

  const handleAddDiscountLevel = () => {
    setDiscountLevels([
      ...discountLevels,
      { volume: '0', discount: '0', description: '', label: '', isCustomDescription: false },
    ]);
  };

  const handleRemoveDiscountLevel = (index: number) => {
    setDiscountLevels(discountLevels.filter((_, i) => i !== index));
  };

  const updateDiscountLevel = (index: number, field: keyof DiscountLevel, value: string) => {
    const sanitizedValue = parseInt(value) < 0 ? '0' : value; // Предотвращаем отрицательные значения
    const updatedLevels = discountLevels.map((level, i) => {
      if (i === index) {
        const updatedLevel = { ...level, [field]: sanitizedValue };

        if (autoLabels && field === 'discount') {
          updatedLevel.label = `-${sanitizedValue}%`;
        }

        if (autoLabels && field === 'discount' && !updatedLevel.isCustomDescription) {
          updatedLevel.description = `${sanitizedValue}% discount`;
        }

        return updatedLevel;
      }
      return level;
    });
    setDiscountLevels(updatedLevels);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedLevels = discountLevels.map((level, i) =>
      i === index
        ? { ...level, description: value, isCustomDescription: true }
        : level
    );
    setDiscountLevels(updatedLevels);
  };

  const handleAutoLabelsChange = (newChecked: boolean) => {
    setAutoLabels(newChecked);
    if (newChecked) {
      const updatedLevels = discountLevels.map((level) => ({
        ...level,
        label: `-${level.discount}%`,
        description: level.isCustomDescription ? level.description : `${level.discount}% discount`,
      }));
      setDiscountLevels(updatedLevels);
    }
  };

  return (
    <Card>
      {discountLevels.map((level, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Button icon={XIcon} onClick={() => handleRemoveDiscountLevel(index)} />

          <TextField
            label="Volume"
            type="number"
            value={level.volume}
            onChange={(value) => {
              updateDiscountLevel(index, 'volume', value);
              setDiscountVolume(value);
            }}
            autoComplete="off"
          />

          <TextField
            label="Discount"
            type="number"
            value={level.discount}
            onChange={(value) => {
              updateDiscountLevel(index, 'discount', value);
              setDiscountAmount(value);
            }}
            autoComplete="off"
          />

          <TextField
            label="Description"
            value={level.description}
            onChange={(value) => handleDescriptionChange(index, value)}
            autoComplete="off"
          />

          <TextField
            label="Label"
            value={level.label}
            onChange={(value) => updateDiscountLevel(index, 'label', value)}
            autoComplete="off"
            disabled={autoLabels}
          />
        </div>
      ))}

      <Button onClick={handleAddDiscountLevel}>Add more</Button>

      <Checkbox
        label="Automatic labels (recommended)"
        checked={autoLabels}
        onChange={handleAutoLabelsChange}
      />

      {/* Скрытое поле для передачи всех уровней скидок */}
      <input
        type="hidden"
        name="discountLevelsJSON"
        value={JSON.stringify(
          discountLevels.map(({volume, discount}) => ({volume, discount}))
        )}
      />
    </Card>
  );
}

export default ViewDiscountConfiguration;
