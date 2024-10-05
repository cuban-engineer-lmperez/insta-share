import { TestBed } from '@angular/core/testing';
import { FilesManagementService } from './files-management.service';
import { Firestore, addDoc, getDocs, updateDoc, doc, collection, query } from '@angular/fire/firestore';
import { ref, Storage, uploadBytesResumable, UploadTask } from '@angular/fire/storage';

jest.mock('@angular/fire/firestore', () => {
  return {
    Firestore: jest.fn(), // Mock the Auth class
    addDoc: jest.fn(), // Mock the addDoc function
    getDocs: jest.fn(), // Mock the collection function
    updateDoc: jest.fn(), // Mock the collection function
    doc: jest.fn(), // Mock the collection function
    collection: jest.fn(), // Mock the collection function
    query: jest.fn(), // Mock the collection function
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

describe('FilesManagementService', () => {
  let service: FilesManagementService;
  let firestoreMock: jest.Mocked<Firestore>;

  beforeEach(() => {
    (addDoc as jest.Mock).mockResolvedValue({}); // Mock the return value
    (getDocs as jest.Mock).mockResolvedValue({}); // Mock the return value 
    (updateDoc as jest.Mock).mockResolvedValue({}); // Mock the return value
    (doc as jest.Mock).mockResolvedValue({}); // Mock the return value 
    (collection as jest.Mock).mockResolvedValue({}); // Mock the return value 
    (query as jest.Mock).mockResolvedValue({}); // Mock the return value
    TestBed.configureTestingModule({
      providers: [
        FilesManagementService,
        { provide: Firestore, useValue: {} }, { provide: Storage, useValue: {} },
      ],
    });
    service = TestBed.inject(FilesManagementService);
    firestoreMock = TestBed.inject(Firestore) as jest.Mocked<Firestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the files', async () => {
    await service.getFiles('testId');
    expect(getDocs).toHaveBeenCalled();
  });

  it('should get the createFile', async () => {
    await service.createFile({ filename: 'test1', storage: 'storage/test', userId: 'userId' });
    expect(addDoc).toHaveBeenCalled();
  });

  it('should get the update a file', async () => {
    await service.updateFile({ filename: 'test1', userId: 'userId', fileId: 'fileTest1' });
    expect(getDocs).toHaveBeenCalled();
  });
});
