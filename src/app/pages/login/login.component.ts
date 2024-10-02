import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { LoginService } from './login.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, RouterModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);

  hide = signal(true);
  loginForm: FormGroup;
  isLoading = signal(false);

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)]
      })
    }
    )
  }

  get f(): Record<string, AbstractControl> {
    return this.loginForm.controls;
  }

  /**
   * Login a user with email & password
   */
  async singIn() {
    if (this.isLoading() === false && this.loginForm.valid) {
      this.isLoading.set(true);
      try {
        await this.loginService.singIn({ email: this.f['email'].value, password: this.f['password'].value });
        this.router.navigate(['dashboard']);
      } catch (e) {
        const wrapError = e as { message: string };
        this._snackBar.open(wrapError?.message, 'Close', { duration: environment.snackBarDuration });
      }
    }
    this.isLoading.set(false);
  }
}
