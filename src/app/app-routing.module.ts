import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { TncComponent } from './pages/tnc/tnc.component';
import { HelpComponent } from './pages/help/help.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { ContestComponent } from './pages/contest/contest.component';
import { UserGuard } from './guards/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { SettingComponent } from './pages/setting/setting.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { SellComponent } from './pages/sell/sell.component';
import { HistoryComponent } from './pages/history/history.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ConflictComponent } from './pages/conflict/conflict.component';
import { TimeoutComponent } from './pages/timeout/timeout.component';
import { CancelComponent } from './pages/cancel/cancel.component';
import { SellRequestsComponent } from './pages/sell-requests/sell-requests.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'tnc', component: TncComponent },
  { path: 'help', component: HelpComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm/:id', component: ConfirmComponent },
  { path: 'contest/:id', component: ContestComponent, canActivate: [UserGuard] },
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  { path: 'home/:status', component: HomeComponent, canActivate: [UserGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [UserGuard] },
  { path: 'buy', component: PurchaseComponent, canActivate: [UserGuard] },
  { path: 'sell', component: SellComponent, canActivate: [UserGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [UserGuard] },
  { path: 'change', component: ChangePasswordComponent, canActivate: [UserGuard] },
  {
    path: 'conflict', component: ConflictComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'timeout', component: TimeoutComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'cancel', component: CancelComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'sell-req', component: SellRequestsComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
