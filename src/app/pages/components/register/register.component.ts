import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;
  registerForm: FormGroup;
  incorrectCredentials = false;

  constructor() {
    this.registerForm = new FormGroup({
      username: new FormControl('', {
        updateOn: 'submit',
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        updateOn: 'submit',
        validators: [Validators.required]
      })
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  register() {
    // Implement
  }
}
