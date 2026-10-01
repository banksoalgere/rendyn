"use client";

import { Grid, GridColProps } from '@mantine/core';
import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper.module.css';

export function ColWrapper({ children, ...others }: GridColProps) {
  return (
    <Grid.Col {...others}>
      <div className={classes.col}>
        <div className={classes.label}>{children}</div>
      </div>
    </Grid.Col>
  );
}
