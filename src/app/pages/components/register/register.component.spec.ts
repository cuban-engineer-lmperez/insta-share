import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, BrowserAnimationsModule],
      providers: [provideRouter([])],
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

  it('should call the register method when the register button is clicked', () => {
    // Spy on the `register` method
    jest.spyOn(component, 'register');

    // Trigger the button click
    const button = fixture.nativeElement.querySelector('#registerButton');
    button.dispatchEvent(new Event('click'));

    // Check that the `register` method was called
    expect(component.register).toHaveBeenCalled();
  });
});
