import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RegisterService } from './register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { Auth, authState, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, RouterModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  private _snackBar = inject(MatSnackBar);
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  hide = signal(true);
  confirmHide = signal(true);
  registerForm: FormGroup;
  passwordsDontMatch = signal(false);
  isLoading = signal(false);

  constructor(private registerService: RegisterService, private router: Router) {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    })
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
    if (this.isLoading() === false && this.registerForm.valid) {
      this.isLoading.set(true);
      try {
        const user = await this.registerService.singUp({ email: this.f['username'].value, password: this.f['password'].value });
        console.log(user);
        this._snackBar.open('User created', 'Close', { duration: environment.snackBarDuration });
        this.router.navigate(['login']);
      } catch (e) {
        const wrapError = e as { message: string };
        this._snackBar.open(wrapError?.message, 'Close', { duration: environment.snackBarDuration });
      }
      this.isLoading.set(false);
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

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }

}

