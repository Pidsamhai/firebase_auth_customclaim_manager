import { Component, OnInit } from '@angular/core';
import { Auth, getIdToken } from '@angular/fire/auth';
import { from, take } from 'rxjs';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  idToken: string = "";

  constructor(
    private auth: Auth
  ) { }

  ngOnInit(): void {
    from(getIdToken(this.auth.currentUser!))
    .pipe(
      take(1)
    ).subscribe((token) => this.idToken = token)
  }

}
