import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { UserResponse } from '../model'
import { MatDialog } from '@angular/material/dialog';
import { EditCustomClaimsComponent, Data } from '../dialog/edit-custom-claims/edit-custom-claims.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  id: string = "";
  isLoading: boolean = false;
  displayedColumns: string[] = ['verified', 'uid', 'email', 'actions'];
  userResponse?: UserResponse;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private dialog: MatDialog
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

  beforePage(): void {
    this.loadPageData(this.userResponse?.before);
  }

}
