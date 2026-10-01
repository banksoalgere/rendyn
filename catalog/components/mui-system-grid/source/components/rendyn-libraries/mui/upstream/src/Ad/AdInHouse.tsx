"use client";

import AdDisplay, { type AdParameters } from '@/components/rendyn-libraries/mui/upstream/src/Ad/AdDisplay';

export default function AdInHouse(props: { ad: Omit<AdParameters, 'poweredby' | 'label'> }) {
  const { ad } = props;

  return <AdDisplay ad={{ poweredby: 'MUI', label: `in-house-${ad.name}`, ...ad }} />;
}
