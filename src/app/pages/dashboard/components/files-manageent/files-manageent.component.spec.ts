import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesManageentComponent } from './files-manageent.component';

describe('FilesManageentComponent', () => {
  let component: FilesManageentComponent;
  let fixture: ComponentFixture<FilesManageentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesManageentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesManageentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
