import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {
  Auth
} from '@angular/fire/auth';
import { LoginService } from './login.service';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

jest.mock('@angular/fire/auth', () => {
  return {
    Auth: jest.fn(), // Mock the Auth class
  };
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]), LoginService, { provide: Auth, useValue: {} }, // Provide an empty object as a mock Auth instance
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should return loginForm controls', () => {
    expect(component.loginForm.controls).toEqual(component.f);
  });

  it('shoul fail email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
    component.loginForm.controls['email'].setValue("test");
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
    email.setValue("test");
    component.loginForm.controls['email'].setValue("test@test.com");
  });

  it('should call the login method when the Sing In button is clicked', () => {
    jest.spyOn(component, 'singIn');    // Spy on the `login` method
    const button = fixture.nativeElement.querySelector('#singInButton');    // Trigger the button click
    button.dispatchEvent(new Event('click'));
    expect(component.singIn).toHaveBeenCalled();    // Check that the `singIn` method was called
  });

  it('should submit the login form when login form is valid and another submit is not been called', () => {
    jest.spyOn(component, 'singIn');    // Spy on the `login` method
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("Abcd1234*");
    expect(component.loginForm.valid).toBeTruthy();

    const button = fixture.nativeElement.querySelector('#singInButton');      // Trigger the button click
    button.dispatchEvent(new Event('click'));
    expect(component.singIn).toHaveBeenCalled();     // Check that the `singIn` method was called
  });
});
