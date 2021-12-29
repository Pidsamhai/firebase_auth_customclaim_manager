import {Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { User, UserResponse } from '../model'
import { MatDialog } from '@angular/material/dialog';
import { EditCustomClaimsComponent, Data } from '../dialog/edit-custom-claims/edit-custom-claims.component';
import { LoggerService } from '../services/logger/logger.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  id: string = "";
  isLoading: boolean = false;
  displayedColumns: string[] = ['verified', 'uid', 'email', 'actions'];
  users: Array<User> = [];
  private _userResponse?: UserResponse;

  get userResponse(): UserResponse | undefined {
      return this._userResponse;
  }
  
  private set userResponse(value: UserResponse | undefined) {
      this._userResponse = value;
      this.users = value?.data ?? [];
  }
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private dialog: MatDialog,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1))
      .subscribe({
        next: (params) => this.id = params["template_id"],
        complete: () => this.loadPageData()
      });
  }

  refreshTable(): void {
    this.loadPageData();
  }

  private loadPageData(pageToken?: string) {
    this.isLoading = true;
    this.api.getUsers(this.id, pageToken)
      .pipe(take(1))
      .subscribe({
        next: res => this.userResponse = res,
        complete: () => this.isLoading = false
      });
  }

  nextPage(): void {
    this.loadPageData(this.userResponse?.next);
  }

  openEditCustomClaimsDialog(uid: string): void {
    this.dialog.open(EditCustomClaimsComponent, {
      width: "100%",
      data: <Data>{
        templateId: this.id,
        id: uid
      }
    })
  }

  filterCall(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterUsers = this.userResponse?.data.filter(e => e.email.includes(input.value) || e.uid.includes(input.value));
    this.users = filterUsers ?? [];
  }
}
