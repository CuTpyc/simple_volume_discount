import { TextField } from '@shopify/polaris';
import React from 'react';

export default function ViewFunellName({ funnelName }: { funnelName: string }) {
  return (
    <TextField
      label="Name"
      type="text"
      value={funnelName} // Просто отображаем значение
      readOnly // Устанавливаем поле только для чтения
      helpText="This is the funnel name"
      autoComplete="off"
    />
  );
}
