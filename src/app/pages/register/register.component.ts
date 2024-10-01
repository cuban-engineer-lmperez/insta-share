import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RegisterService } from './register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private _snackBar = inject(MatSnackBar);

  hide = signal(true);
  confirmHide = signal(true);
  registerForm: FormGroup;
  passwordsDontMatch = signal(false);

  constructor(private registerService: RegisterService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)]
      }),
    },
      { validators: this.checkMatchingPassword }
    )
  }

  get f(): Record<string, AbstractControl> {
    return this.registerForm.controls;
  }

  /**
   * Create a new account with the register form data
   */
  async singUp() {
    if (this.registerForm.valid) {
      try {
        await this.registerService.singUp({ email: this.f['username'].value, password: this.f['password'].value });
      } catch (e) {
        const wrapError = e as { message: string };
        this._snackBar.open(wrapError?.message, 'Close', { duration: environment.snackBarDuration });
      }
    }
  }

  checkMatchingPassword: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const passNotMatch = password && confirmPassword && password.value !== confirmPassword.value;
    let passwordErrors = password?.errors || null;
    let confirmPasswordErrors = password?.errors || null;
    if (passNotMatch === true) {
      password?.setErrors({ ...passwordErrors, passwordNoMatch: true });
      confirmPassword?.setErrors({ ...confirmPasswordErrors, passwordNoMatch: true });
    } else {
      delete passwordErrors?.['passwordNoMatch'];
      if (passwordErrors && Object.keys(passwordErrors as object).length === 0) passwordErrors = null
      delete confirmPasswordErrors?.['passwordNoMatch'];
      if (confirmPasswordErrors && Object.keys(confirmPasswordErrors as object).length === 0) confirmPasswordErrors = null
      password?.setErrors(passwordErrors);
      confirmPassword?.setErrors(confirmPasswordErrors);
    }
    return passNotMatch === true ? { passwordNoMatch: true } : null;
  };

}

