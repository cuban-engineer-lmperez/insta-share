import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {
  Auth
} from '@angular/fire/auth';

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
      imports: [LoginComponent, { provide: Auth, useValue: {}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return loginForm controls', () => {
    expect(component.loginForm.controls).toEqual(component.f);
  });

  it('should call the login method when the Sing In button is clicked', () => {
    // Spy on the `login` method
    jest.spyOn(component, 'singIn');

    // Trigger the button click
    const button = fixture.nativeElement.querySelector('#singInButton');
    button.dispatchEvent(new Event('click'));

    // Check that the `singIn` method was called
    expect(component.singIn).toHaveBeenCalled();
  });
});
