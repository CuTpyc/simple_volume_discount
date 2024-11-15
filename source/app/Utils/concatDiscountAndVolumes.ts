interface VolumeDiscount {
  volume: string;
  discount: string;
}

export function concatenateVolumeAndDiscount(data: VolumeDiscount[]): { volumes: string, discounts: string } {
  const volumes = data.map(item => item.volume).join(', ');
  const discounts = data.map(item => item.discount).join(', ');

  return {
    volumes,
    discounts
  };
}
