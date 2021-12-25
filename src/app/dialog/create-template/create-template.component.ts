import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Database, DatabaseReference, ref } from '@angular/fire/database';
import { MatDialogRef } from '@angular/material/dialog';
import { child, set } from 'firebase/database';
import Credential from 'src/app/model/credential.model';
import { Template } from 'src/app/model/template.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  @ViewChild('fileInput', {read: ElementRef, static: true })
  fileInput: any;
  reader: string = "";
  project: Template[] = []
  private readonly templateDoc: DatabaseReference = ref(this.db, "template");
  isProgress: boolean = false;

  constructor(
    private db: Database,
    private dialogRef: MatDialogRef<CreateTemplateComponent>
  ) { }

  ngOnInit(): void {
  }


  openFIleChooser(): void {
    this.fileInput.nativeElement.click();
  }

  async fileInputChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    try {
      const credential = new Credential(JSON.parse(await input.files?.item(0)?.text()!));
      const template: Template = new Template(
        uuid.v4(),
        credential.projectId,
        `https://console.firebase.google.com/project/${credential.projectId}/overview`,
        credential,
      );
      if(!this.project.find((item) => item.credential?.projectId == template.credential?.projectId)) {
        this.project.push(template);
      }
    } catch (error) {
      this.reader = "Error cannot parse File"
    } finally {
      input.value = '';
    }
  }

  save() {
    this.dialogRef.disableClose = true;
    this.isProgress = true;
    Promise.all(
      this.project.map((p) => set(child(this.templateDoc, p.id), p))
    ).finally(() => {
        this.dialogRef.disableClose = false;
        this.isProgress = false;
      }
    )
    .then(_ => this.dialogRef.close())
    .catch((err) => this.reader = err)
  }

}
