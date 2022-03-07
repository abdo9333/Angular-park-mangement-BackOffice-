import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './components2/login/login.component';
import { TreeDetailsComponent } from './components/tree/tree-details/tree-details.component';
import { AddTreeComponent } from './components/tree/add-tree/add-tree.component';
import { TreesListComponent } from './components/tree/trees-list/trees-list.component';
import { AddBirdComponent } from './components/bird/add-bird/add-bird.component';
import { BirdDetailsComponent } from './components/bird/bird-details/bird-details.component';
import { BirdListComponent } from './components/bird/bird-list/bird-list.component';
import { SportDetailsComponent } from './components/sport/sport-details/sport-details.component';
import { AddSportComponent } from './components/sport/add-sport/add-sport.component';
import { SportListComponent } from './components/sport/sport-list/sport-list.component';
const routes: Routes = [
    {
        path:'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path:'login',
        component: LoginComponent
    },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
          // birds routing
      { path: 'addBird', component: AddBirdComponent},
      { path: 'bird-details', component: BirdDetailsComponent},
      { path: 'bird-list/:id', component: BirdListComponent},
      // trees routing
      { path: 'tree-details', component: TreeDetailsComponent },
      { path: 'tree-list/:id', component: TreesListComponent },
      { path: 'add-tree', component: AddTreeComponent },
      // sport routing
      { path: 'sport-details', component: SportDetailsComponent },
      { path: 'tree-list/:id', component: SportListComponent },
      { path: 'add-tree', component: AddSportComponent },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
