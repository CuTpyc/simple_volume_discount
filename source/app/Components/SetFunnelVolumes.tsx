import React, { useState } from 'react';
import { Card, Button, TextField, Select, Checkbox } from '@shopify/polaris';
import { XIcon } from '@shopify/polaris-icons';

type DiscountLevel = {
  volume: string;
  discountType: string;
  discount: string;
  description: string;
  label: string;
};

function DiscountConfiguration() {
  const [discountLevels, setDiscountLevels] = useState<DiscountLevel[]>([
    { volume: '3', discountType: '%', discount: '5', description: '5% discount', label: '-5%' },
  ]);

  const [autoLabels, setAutoLabels] = useState(true);

  const handleAddDiscountLevel = () => {
    setDiscountLevels([
      ...discountLevels,
      { volume: '', discountType: '%', discount: '', description: '', label: '' },
    ]);
  };

  const handleRemoveDiscountLevel = (index: number) => {
    setDiscountLevels(discountLevels.filter((_, i) => i !== index));
  };

  const updateDiscountLevel = (index: number, field: keyof DiscountLevel, value: string) => {
    const updatedLevels = discountLevels.map((level, i) =>
      i === index ? { ...level, [field]: value } : level
    );
    setDiscountLevels(updatedLevels);
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
            onChange={(value) => updateDiscountLevel(index, 'volume', value)}
            autoComplete="off"
          />

          <Select
            label="Discount Type"
            options={[{ label: '%', value: '%' }, { label: 'Amount', value: 'amount' }]}
            value={level.discountType}
            onChange={(value) => updateDiscountLevel(index, 'discountType', value)}
          />

          <TextField
            label="Discount"
            type="number"
            value={level.discount}
            onChange={(value) => updateDiscountLevel(index, 'discount', value)}
            autoComplete="off"
          />

          <TextField
            label="Description"
            value={level.description}
            onChange={(value) => updateDiscountLevel(index, 'description', value)}
            autoComplete="off"
          />

          <TextField
            label="Label"
            value={level.label}
            onChange={(value) => updateDiscountLevel(index, 'label', value)}
            autoComplete="off"
          />
        </div>
      ))}

      <Button onClick={handleAddDiscountLevel}>Add more</Button>

      <Checkbox
        label="Automatic labels (recommended)"
        checked={autoLabels}
        onChange={(newChecked) => setAutoLabels(newChecked)}
      />
    </Card>
  );
}

export default DiscountConfiguration;
