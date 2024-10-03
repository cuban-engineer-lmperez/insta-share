import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the logout method when the Logout button is clicked', () => {
    jest.spyOn(component, 'logout');    // Spy on the `logout` method
    const button = fixture.nativeElement.querySelector('#logoutButton');    // Trigger the button click
    button.dispatchEvent(new Event('click'));
    expect(component.logout).toHaveBeenCalled();    // Check that the `singIn` method was called
  });
});
