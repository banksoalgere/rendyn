"use client";

import { getPickerInputClearableDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-input-clearable.demo';
import { getPickerInputConfiguratorDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-input-configurator.demo';
import { getPickerInputIconDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-input-icon.demo';
import { getPickerInputModalDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-input-modal.demo';
import { getPickerInputMultipleDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-input-multiple.demo';
import { getPickerInputRangeDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-input-range.demo';
import { getPickerInputUsageDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-input-usage.demo';
import { getPickerInputValueFormatterDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/picker-input-value-formatter.demo';

export function getSharedPickerInputDemos(component: React.FC<any>) {
  return {
    usage: getPickerInputUsageDemo(component),
    multiple: getPickerInputMultipleDemo(component),
    range: getPickerInputRangeDemo(component),
    configurator: getPickerInputConfiguratorDemo(component),
    modal: getPickerInputModalDemo(component),
    icon: getPickerInputIconDemo(component),
    clearable: getPickerInputClearableDemo(component),
    valueFormatter: getPickerInputValueFormatterDemo(component),
  };
}
