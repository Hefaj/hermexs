import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';

export const appRoutes: Route[] = [
  {
    path: 'creator',
    loadChildren: () =>
      loadRemote<typeof import('creator/Routes')>('creator/Routes').then(
        (m) => m!.remoteRoutes
      ),
  },
  {
    path: 'erp',
    loadChildren: () =>
      loadRemote<typeof import('erp/Routes')>('erp/Routes').then(
        (m) => m!.remoteRoutes
      ),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
