import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { SellComponent } from './pages/sell/sell.component';
import { MatSnackBarModule } from "@angular/material";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { ContestComponent } from './pages/contest/contest.component';
import { MatRadioModule } from '@angular/material/radio';
import { ConflictComponent } from './pages/conflict/conflict.component';
import { CancelComponent } from './pages/cancel/cancel.component';
import { MatSelectModule } from '@angular/material/select';
import { ResetComponent } from './pages/reset/reset.component';
import { HistoryComponent } from './pages/history/history.component';
import { MatTableModule } from '@angular/material/table';
import { SellRequestsComponent } from './pages/sell-requests/sell-requests.component';
import { TimeoutComponent } from './pages/timeout/timeout.component';
import { TncComponent } from './pages/tnc/tnc.component';
import { HelpComponent } from './pages/help/help.component';
import { SettingComponent } from './pages/setting/setting.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AddRequestsComponent } from './pages/add-requests/add-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ConfirmComponent,
    PurchaseComponent,
    SellComponent,
    ContestComponent,
    ConflictComponent,
    CancelComponent,
    ResetComponent,
    HistoryComponent,
    SellRequestsComponent,
    TimeoutComponent,
    TncComponent,
    HelpComponent,
    SettingComponent,
    ChangePasswordComponent,
    AddRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
