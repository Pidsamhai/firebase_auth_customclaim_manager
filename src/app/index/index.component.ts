import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Database, ref, object, DatabaseReference, push } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { listVal, objectVal, QueryChange } from 'rxfire/database';
import { Observable, Subscription } from 'rxjs';
import { CreateTemplateComponent } from '../dialog/create-template/create-template.component';
import { DeleteTemplateComponent, DeleteTemplateData } from '../dialog/delete-template/delete-template.component';
import { DisPlayTemplate, Template } from '../model/template.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  token: string = "";
  projects: DisPlayTemplate[] = [];
  private subscription$: Subscription | undefined;
  displayedColumns: string[] = ['name', 'actions'];

  @ViewChild('fileInput', { read: ElementRef, static: true }) filePicker: any;

  constructor(
    private db: Database,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    const templateRef = ref(this.db, "template");
    this.subscription$ = listVal<DisPlayTemplate>(templateRef)
      .subscribe((items) => this.projects = items ?? []);
  }

  pickFile(): void {
    this.dialog.open(CreateTemplateComponent, {
      width: "50%",
    })
  }

  actionDelete(id: string) {
    this.dialog.open(DeleteTemplateComponent, {
      width: "50%",
      data: <DeleteTemplateData> { id: id }
    })
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

}
