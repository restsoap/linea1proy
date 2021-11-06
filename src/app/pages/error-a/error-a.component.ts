import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-a',
  templateUrl: './error-a.component.html',
  styleUrls: ['./error-a.component.css']
})
export class ErrorAComponent implements OnInit {

  status: '405';

  constructor() { }

  ngOnInit(): void {
  }

}
