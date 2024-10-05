import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FilesManagementComponent } from './files-management.component';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../../login/login.component';

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

jest.mock('@angular/fire/firestore', () => {
  return {
    Firestore: jest.fn(), // Mock the Firestore class
  };
});


jest.mock('@angular/fire/storage', () => {
  return {
    Storage: jest.fn(), // Mock the Storage class
    ref: jest.fn(), // Mock the ref function
    uploadBytesResumable: jest.fn(), // Mock the uploadBytesResumable function
    UploadTask: jest.fn(), // Mock the UploadTask function
  };
});

describe('FilesManagementComponent', () => {
  let component: FilesManagementComponent;
  let fixture: ComponentFixture<FilesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesManagementComponent, NoopAnimationsModule,
        RouterModule.forRoot(
          [{ path: 'login', component: LoginComponent }]
        )],
      providers: [{ provide: Auth, useValue: {} }, { provide: Firestore, useValue: {} }, { provide: Storage, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(FilesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload the file', () => {
    jest.spyOn(component, 'uploadFile');    // Spy on the `uploadFile` method
    const button = fixture.nativeElement.querySelector('#fileUpload');    // Trigger the button click
    button.dispatchEvent(new Event('click'));
    expect(component.uploadFile).toHaveBeenCalled();
  });

  it('should attach the file onFileSelected', () => {
    jest.spyOn(component, 'onFileSelected');    // Spy on the `uploadFile` method
    component.onFileSelected(new Event('input'));
    fixture.detectChanges();
    expect(component.onFileSelected).toHaveBeenCalled();
  });
  
  it('should cancel the file upload', fakeAsync(() => {
    jest.spyOn(component, 'cancelUpload');    // Spy on the `uploadFile` method
    fixture.detectChanges();
    component.uploadProgress.set(0);
    fixture.detectChanges();
    tick(500);
    const button = fixture.nativeElement.querySelector('#cancelUpload');    // Trigger the button click
    button.dispatchEvent(new Event('click'));
    expect(component.cancelUpload).toHaveBeenCalled();
  }));

  it('should reset the file upload', () => {
    jest.spyOn(component, 'reset');    // Spy on the `reset` method
    component.reset();
    expect(component.uploadProgress()).toEqual(-1);
    expect(component.fileName()).toEqual('');    
    expect(component.reset).toHaveBeenCalled();
  });
  
  it('should load datastore', async () => {
    jest.spyOn(component, 'initLoadDatastore');    // Spy on the `reset` method
    await component.initLoadDatastore();
    expect(component.initLoadDatastore).toHaveBeenCalled();
  });
  
});
