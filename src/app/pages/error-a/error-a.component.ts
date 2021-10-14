import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-error-a',
  templateUrl: './error-a.component.html',
  styleUrls: ['./error-a.component.css']
})
export class ErrorAComponent implements OnInit {

  status: '405';

  constructor( ) { }

  ngOnInit(): void {
  }

}
