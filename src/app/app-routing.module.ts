import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginPageModule)
  },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'group', loadChildren: './pages/group/group.module#GroupPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'resetpassword', loadChildren: './pages/resetpassword/resetpassword.module#ResetpasswordPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'users', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: 'requests', loadChildren: './pages/requests/requests.module#RequestsPageModule' },
  { path: 'friends', loadChildren: './pages/friends/friends.module#FriendsPageModule' },
  { path: 'block', loadChildren: './pages/block/block.module#BlockPageModule' },
  { path: 'pages', loadChildren: './notifications/pages/pages.module#PagesPageModule' }//,5306952178573244. 365, 
  //{ path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
