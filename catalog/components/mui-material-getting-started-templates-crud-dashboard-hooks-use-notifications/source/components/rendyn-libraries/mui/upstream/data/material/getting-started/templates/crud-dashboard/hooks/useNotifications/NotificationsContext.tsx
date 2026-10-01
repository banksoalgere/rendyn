"use client";

import * as React from 'react';
import { ShowNotification, CloseNotification } from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/crud-dashboard/hooks/useNotifications/useNotifications';

const NotificationsContext = React.createContext<{
  show: ShowNotification;
  close: CloseNotification;
} | null>(null);

export default NotificationsContext;
