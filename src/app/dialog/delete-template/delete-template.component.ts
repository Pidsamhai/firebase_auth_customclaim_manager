import { Component, Inject, Input, OnInit } from '@angular/core';
import { Database, DatabaseReference, ref, remove } from '@angular/fire/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { child } from 'firebase/database';

interface DeleteTemplateData {
  id: string
}

@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  styleUrls: ['./delete-template.component.scss']
})
class DeleteTemplateComponent implements OnInit {
  isProgress: boolean = false;
  private templateRef: DatabaseReference = ref(this.db, 'template');

  constructor(
    private dialogRef: MatDialogRef<DeleteTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteTemplateData,
    private db: Database
  ) {
  }

  ngOnInit(): void {

  }

  delete(): void {
    this.isProgress = true;
    remove(child(this.templateRef, this.data.id))
      .finally(() => {
        this.isProgress = false;
        this.dialogRef.close();
      })
  }
}

export { DeleteTemplateComponent, DeleteTemplateData }
