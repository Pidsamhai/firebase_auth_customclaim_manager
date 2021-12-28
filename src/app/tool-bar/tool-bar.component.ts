import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Auth, User, onAuthStateChanged, Unsubscribe } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit, OnDestroy {
  
  isDevMode: boolean = !environment.production;
  user: User | null = null;
  get isLoggedIn() : boolean {
    return this.user != null;
  }

  private dispose: Unsubscribe | null = null;


  constructor(
    private auth: Auth,
    public dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.dispose?.call("cancel");
  }

  async ngOnInit(): Promise<void> {
    this.dispose = onAuthStateChanged(this.auth, (user) => this.user = user)
  }
}
