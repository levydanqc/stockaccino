import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  @Input() getEmailError!: () => string;
  email!: FormControl;
  form!: FormGroup;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.email = this.form.get('email') as FormControl;
  }

  onSubmit() {
    
  }
}
