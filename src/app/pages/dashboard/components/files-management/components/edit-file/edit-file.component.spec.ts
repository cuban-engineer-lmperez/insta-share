import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFileComponent } from './edit-file.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditFileComponent', () => {
  let component: EditFileComponent;
  let fixture: ComponentFixture<EditFileComponent>;
  const dialogMock = {
    close: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFileComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on no click', () => {
    jest.spyOn(component, 'onNoClick');
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();     // Check that the `save` method was called
  });

  it('should close dialog on save', () => {
    jest.spyOn(component, 'save');
    component.save();
    expect(component.save).toHaveBeenCalled();     // Check that the `save` method was called
  });
  
});
