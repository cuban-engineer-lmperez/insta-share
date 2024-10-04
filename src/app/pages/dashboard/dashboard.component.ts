import { Component, inject, OnDestroy, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { FilesManagementComponent } from './components/files-management/files-management.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, FilesManagementComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;
  @ViewChild(MatMenu) menu: MatMenu | undefined;
  @ViewChildren(MatMenuItem) itemInstances: QueryList<MatMenuItem> | undefined;
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  loggedUser = signal('-');

  constructor(private router: Router) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      this.loggedUser.set(aUser?.displayName || aUser?.email || '-');
    })
  }

  /**
   * Sign out of offline app
   */
  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
