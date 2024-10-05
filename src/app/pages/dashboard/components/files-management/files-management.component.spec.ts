import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesManagementComponent } from './files-management.component';

describe('FilesManageentComponent', () => {
  let component: FilesManagementComponent;
  let fixture: ComponentFixture<FilesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesManagementComponent]
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
    expect(component.uploadFile).toHaveBeenCalled();
  });
});
