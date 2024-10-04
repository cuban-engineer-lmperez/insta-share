import { Component, inject, signal } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { ref, Storage, uploadBytesResumable, UploadTask } from '@angular/fire/storage';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-files-manageent',
  standalone: true,
  imports: [MatIconModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './files-management.component.html',
  styleUrl: './files-management.component.scss'
})
export class FilesManagementComponent {
  file!: File;
  private auth: Auth = inject(Auth);
  private _snackBar = inject(MatSnackBar);
  user$ = user(this.auth);
  userSubscription: Subscription;
  private readonly storage = inject(Storage);
  loggedUser: { uid: string | undefined } = {
    uid: undefined
  };
  requiredFileType: string | undefined;
  uploadProgress = signal(-1);
  fileName = signal('');
  uploadTaskRef: UploadTask | undefined;

  constructor(private router: Router) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      this.loggedUser = { uid: aUser?.uid };
    })
    this.requiredFileType = '*';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
      console.log(this.file);
      this.fileName.set(this.file.name);
    }
  }

  uploadFile(): void {
    if (this.loggedUser?.uid && this.fileName()) {
      this.uploadProgress.set(0);
      const storageRef = ref(this.storage, `uploads/${this.loggedUser?.uid}/${this.fileName()}`);
      this.uploadTaskRef = uploadBytesResumable(storageRef, this.file);
      this.uploadTaskRef.on('state_changed',
        (snapshot) => {
           //Calculate and set the upload progress
           this.uploadProgress.set(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        },
        (error) => {console.log(error);},
        () => {
           //Upload is complete
           this._snackBar.open('Filed uploaded', 'Close', { duration: environment.snackBarDuration });
           this.reset();
          ;
        }
     );
      // save file metadata

    } else {
      console.error('The user is not logged in');
      this.router.navigate(['login']);
    }
  }

  cancelUpload() {
    // this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress.set(-1);
    this.fileName.set('');
    this.uploadTaskRef?.cancel();
  }
}
