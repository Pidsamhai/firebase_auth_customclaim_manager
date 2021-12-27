import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss']
})
export class CustomPaginatorComponent implements OnInit {
  @Output()
  onNext = new EventEmitter();
  @Output()
  onBefore = new EventEmitter();

  @Input()
  disableNext: boolean = false;
  @Input()
  disableBefore: boolean = false;
  @Input()
  isLoading: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  nextClick(): void {
    this.onNext.emit();
  }


  beforeClick(): void {
    this.onBefore.emit();
  }

}
