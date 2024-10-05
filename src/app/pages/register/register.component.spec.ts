import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterService } from './register.service';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

jest.mock('@angular/fire/auth', () => {
  return {
    Auth: jest.fn(), // Mock the Auth class
  };
});

jest.mock('@angular/fire/firestore', () => {
  return {
    Firestore: jest.fn(), // Mock the Auth class
  };
});

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]), RegisterService, { provide: Auth, useValue: {} }, { provide: Firestore, useValue: {} }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return registerForm controls', () => {
    expect(component.registerForm.controls).toEqual(component.f);
  });

  it('should fail form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('shoul fail email field validity', () => {
    const email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();
    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
    component.registerForm.controls['email'].setValue("test");
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
    email.setValue("test");
    component.registerForm.controls['email'].setValue("test@test.com");
  });

  it('should call the register method when the register button is clicked', () => {
    // Spy on the `register` method
    jest.spyOn(component, 'singUp');
    // Trigger the button click
    const button = fixture.nativeElement.querySelector('#registerButton');
    button.dispatchEvent(new Event('click'));
    // Check that the `register` method was called
    expect(component.singUp).toHaveBeenCalled();
  });

  it('should submit the login form when login form is valid and another submit is not been called', () => {
    jest.spyOn(component, 'singUp');    // Spy on the `login` method
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['email'].setValue("test@test.com");
    component.registerForm.controls['password'].setValue("Abcd1234*");
    component.registerForm.controls['confirmPassword'].setValue("Abcd1234*");
    expect(component.registerForm.valid).toBeTruthy();
    const button = fixture.nativeElement.querySelector('#registerButton');      // Trigger the button click
    button.dispatchEvent(new Event('click'));
    expect(component.singUp).toHaveBeenCalled();     // Check that the `singIn` method was called
  });
});
