import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, DocumentData, Firestore, getDocs, query, QuerySnapshot, updateDoc } from '@angular/fire/firestore';
import { environment } from '../../../../../environments/environment';
import { FileStatus } from './file-status.enum';

@Injectable({ providedIn: 'root' })
export class FilesManagementService {
  private firestore = inject(Firestore);

  /**
   * Create a new file entry on DB
   * @param fileDoc contains the file metadata to be created
   */
  async createFile(fileDoc: { userId: string, filename: string, storageRef: string }) {
    const path: string = environment.collections.files(fileDoc.userId);
    const filesCollection = collection(this.firestore, path);
    const createdFile = await addDoc(filesCollection, { ...fileDoc, status: FileStatus.Pending, storage: fileDoc.storageRef })
    return createdFile.id;
  }

  /**
   * Get the files of the user
   * @param userId 
   * @returns the list of files snapshot
   */
  async getFiles(userId: string | undefined): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> {
    if (userId) {
      const path: string = environment.collections.files(userId);
      const filesCollection = collection(this.firestore, path);
      return getDocs(query(filesCollection));
    }
    return undefined;
  }

  /**
   * Update the status and filename on files
   * @param fileDoc contains the file metadata to be updated
   */
  async updateFile(fileDoc: { userId: string, fileId: string, filename?: string, status?: FileStatus }) {
    const path: string = environment.collections.files(fileDoc.userId);
    const fileDocRed = doc(this.firestore, `${path}/${fileDoc.fileId}`);
    const preparedDoc: { [key: string]: any; } = {};
    if (fileDoc.status) preparedDoc['status'] = fileDoc.status;
    if (fileDoc.filename) preparedDoc['filename'] = fileDoc.filename;
    if(Object.keys(preparedDoc).length > 0) {
      await updateDoc(fileDocRed, { ...preparedDoc });
    }
  }

}
