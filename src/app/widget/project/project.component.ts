import { Component, Input, OnInit } from '@angular/core';
import { Template } from 'src/app/model/template.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() 
  project!: Template;

  constructor() { }

  ngOnInit(): void {
  }

}
