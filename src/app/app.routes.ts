import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'signals',
    loadComponent: () =>
      import('./pages/signals/signals.component').then(m => m.SignalsComponent)
  },
  {
    path: 'control-flow',
    loadComponent: () =>
      import('./pages/control-flow/control-flow.component').then(m => m.ControlFlowComponent)
  },
  {
    path: 'defer',
    loadComponent: () =>
      import('./pages/defer/defer.component').then(m => m.DeferComponent)
  },
  {
    path: 'signal-inputs',
    loadComponent: () =>
      import('./pages/signal-inputs/signal-inputs.component').then(m => m.SignalInputsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
