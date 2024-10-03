import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {  AuthGuard, hasCustomClaim, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'; 

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['/dashboard']);
const adminOnly = () => hasCustomClaim('admin');    // For RBAC security
const belongsToAccount = (next: { params: { id: any; }; }) => hasCustomClaim(`account-${next.params.id}`); // For ABAC security

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectLoggedInToItems } },
    { path: 'register', component: RegisterComponent,canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
