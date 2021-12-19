import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  template: ""
})
export class LogoutComponent implements OnInit {

  constructor(
      private route: Router, 
      private auth: Auth
    ) { }

  async ngOnInit(): Promise<void> {
    await signOut(this.auth);
    this.route.navigate(['login']);
  }
}
