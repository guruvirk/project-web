import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserGuard } from './guards/user.guard';
import { ConfirmComponent } from './confirm/confirm.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SellComponent } from './sell/sell.component';
import { ContestComponent } from './contest/contest.component';
import { ConflictComponent } from './conflict/conflict.component';
import { CancelComponent } from './cancel/cancel.component';
import { ResetComponent } from './reset/reset.component';
import { HistoryComponent } from './history/history.component';
import { SellRequestsComponent } from './sell-requests/sell-requests.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm/:id', component: ConfirmComponent },
  { path: 'contest/:id', component: ContestComponent, canActivate: [UserGuard] },
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  { path: 'buy', component: PurchaseComponent, canActivate: [UserGuard] },
  { path: 'sell', component: SellComponent, canActivate: [UserGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [UserGuard] },
  {
    path: 'conflict', component: ConflictComponent, canActivate: [UserGuard],
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
