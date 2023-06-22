import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { TrackingFormComponent } from './components/tracking-form/tracking-form.component';
import { GoalComponent } from './components/goal/goal.component';

const routeConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'tracking',
    component: TrackingFormComponent,
    title: 'Tracking Form',
  },
  {
    path: 'history',
    component: HistoryComponent,
    title: 'History',
  },
  /*
  {
    path: 'goal',
    component: GoalComponent,
    title: 'Goals',
  },
  {
    path: 'reminder',
    component: ReminderComponent,
    title: 'Reminders',
  },
  */
];

export default routeConfig;
