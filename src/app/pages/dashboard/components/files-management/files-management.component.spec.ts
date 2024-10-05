import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilesManagementComponent } from './files-management.component';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { ref, Storage, uploadBytesResumable, UploadTask } from '@angular/fire/storage';

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

describe('FilesManageentComponent', () => {
  let component: FilesManagementComponent;
  let fixture: ComponentFixture<FilesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesManagementComponent],
      providers: [{ provide: Auth, useValue: {} }, { provide: Firestore, useValue: {} },  { provide: Storage, useValue: {} }]
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
});
