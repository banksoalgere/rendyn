"use client";

import { getPickerDeselectDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-deselect.demo';
import { getPickerMultipleDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-multiple.demo';
import { getPickerNumberOfColumnsDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-numberOfColumns.demo';
import { getPickerRangeDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-range.demo';
import { getPickerSingleRangeDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-singleRange.demo';
import { getPickerSizeConfiguratorDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-sizeConfigurator.demo';
import { getPickerUsageDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-usage.demo';

export function getSharedPickerDemos(component: React.FC<any>) {
  return {
    usage: getPickerUsageDemo(component),
    range: getPickerRangeDemo(component),
    multiple: getPickerMultipleDemo(component),
    deselect: getPickerDeselectDemo(component),
    singleRange: getPickerSingleRangeDemo(component),
    numberOfColumns: getPickerNumberOfColumnsDemo(component),
    sizeConfigurator: getPickerSizeConfiguratorDemo(component),
  };
}
