import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Auth, User, user } from '@angular/fire/auth';
import { of } from 'rxjs';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { By } from '@angular/platform-browser';

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
let dom: { parentNode: { querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; }; };

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authMock: jest.Mocked<Auth>;
  beforeEach(async () => {
    (user as jest.Mock).mockReturnValue(of(null)); // Mock the user observable to return null
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, MatMenuModule],
      providers: [{ provide: Auth, useValue: {} }, { provide: MatMenuTrigger, useValue: matMenuTriggerMock }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dom = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the logout method when the Logout button is clicked', async () => {
    jest.spyOn(component, 'logout');    // Spy on the `logout` method
    //const footerLoader = await loader.getChildLoader('#actions-menu');
    // Open the menu
    const menuTrigger = fixture.debugElement.query(By.css('#actions-menu')).nativeElement;
    menuTrigger.click();
    //menuTrigger.triggerEventHandler('click', {});
    // Find the menu item and click it
    fixture.detectChanges();
    await fixture.whenStable();
    const menuItem = fixture.debugElement.query(By.css('#logoutButton')).nativeElement;
    // dom.parentNode.querySelector('#logoutButton').click();
    menuItem.click();
    fixture.detectChanges();
    await fixture.whenStable();
    // Assert the expected behavior
    expect(component.logout).toHaveBeenCalled();
  });

  it('should call signOut and navigate to login on logout', async () => {
    jest.spyOn(component, 'logout');
    expect(component.logout).toHaveBeenCalled();
    // expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spy = jest.spyOn(component.userSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
