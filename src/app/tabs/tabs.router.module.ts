import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/chat/chat.module').then(m => m.ChatPageModule)
          }
        ]
      },
      {
        path: 'group',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/group/group.module').then(m => m.GroupPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/chat',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/chat',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
