import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface Data {
  message: string
}

@Component({
  selector: 'app-copy-message',
  templateUrl: './copy-message.component.html',
})
class CopyMessageComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: Data
  ) { }

  ngOnInit(): void {
  }

}

export { CopyMessageComponent, Data }
