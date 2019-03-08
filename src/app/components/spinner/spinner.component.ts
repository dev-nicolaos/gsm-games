import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gsm-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() color: string;
  spinnerColor: string;

  constructor() { }

  ngOnInit() {
    const color = this.color || '#fff';
    this.spinnerColor = `${color} transparent`;
  }

}
