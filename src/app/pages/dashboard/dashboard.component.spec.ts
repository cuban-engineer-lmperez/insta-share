import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Auth, user } from '@angular/fire/auth';
import { of } from 'rxjs';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

jest.mock('@angular/fire/auth', () => {
  return {
    Auth: jest.fn().mockImplementation(() => {
      return {
        signOut: jest.fn().mockResolvedValue(null)
      };
    }),
    User: jest.fn(), // Mock the User class
    user: jest.fn(() => of({ displayName: 'Test User', email: 'test@test.com' })),
  };
});

const matMenuTriggerMock = {
  openMenu: jest.fn(),
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authMock: jest.Mocked<Auth>;
  let overlayContainerElement: HTMLElement;
  beforeEach(async () => {
    (user as jest.Mock).mockReturnValue(of(null)); // Mock the user observable to return null
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NoopAnimationsModule, MatMenuModule],
      providers: [{ provide: Auth, useValue: {} }, { provide: MatMenuTrigger, useValue: matMenuTriggerMock }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.scroll(0, 0);
    overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the logout method when the Logout button is clicked', fakeAsync(() => {
    jest.spyOn(component, 'logout');    // Spy on the `logout` method
    fixture.detectChanges();
    component?.trigger?.openMenu(); // Open the menu
    fixture.detectChanges();
    tick(500);
    const menuItem = <HTMLElement>overlayContainerElement.querySelector('#logoutButton');
    expect(menuItem).not.toBeNull();
    menuItem.click();   // Find the menu item and click it
    fixture.detectChanges();
    tick(500);
    expect(component.logout).toHaveBeenCalled();
  }));

  it('should unsubscribe on ngOnDestroy', () => {
    const spy = jest.spyOn(component.userSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
