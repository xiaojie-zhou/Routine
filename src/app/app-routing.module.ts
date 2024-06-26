import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sleep-timer',
    loadChildren: () => import('./sleep-timer/sleep-timer.module').then( m => m.SleepTimerPageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('./log/log.module').then( m => m.LogPageModule)
  },
  {
    path: 'sleepiness',
    loadChildren: () => import('./sleepiness/sleepiness.module').then( m => m.SleepinessPageModule)
  },
  {
    path: 'log-sleepiness',
    loadChildren: () => import('./log-sleepiness/log-sleepiness.module').then( m => m.LogSleepinessPageModule)
  },
  {
    path: 'recom',
    loadChildren: () => import('./recom/recom.module').then( m => m.RecomPageModule)
  },
  {
    path: 'step',
    loadChildren: () => import('./step/step.module').then( m => m.StepPageModule)
  },
  {
    path: 'ave',
    loadChildren: () => import('./ave/ave.module').then( m => m.AvePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
