import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PurchaseComponent } from './purchase/purchase.component';
import { SellComponent } from './sell/sell.component';
import { MatSnackBarModule } from "@angular/material";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { ContestComponent } from './contest/contest.component';
import { MatRadioModule } from '@angular/material/radio';
import { ConflictComponent } from './conflict/conflict.component';
import { CancelComponent } from './cancel/cancel.component';
import { MatSelectModule } from '@angular/material/select';
import { ResetComponent } from './reset/reset.component';

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
    ResetComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
