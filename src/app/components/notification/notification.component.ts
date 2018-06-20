import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gsm-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() message: string;
  @Output() dismissed = new EventEmitter();

  constructor() { }

  dismiss() {
    this.dismissed.emit();
  }

}
