"use client";

import * as React from 'react';
import { OpenDialog, CloseDialog } from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/crud-dashboard/hooks/useDialogs/useDialogs';

const DialogsContext = React.createContext<{
  open: OpenDialog;
  close: CloseDialog;
} | null>(null);

export default DialogsContext;
