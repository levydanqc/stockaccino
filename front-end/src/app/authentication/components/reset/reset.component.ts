import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export type EditorType = 'request' | 'confirm' | 'reset';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  editor: EditorType = 'request';
  code: number = 1000000;
  message!: string;
  emailRequested: string = 'void';
  @Input() getEmailError!: () => string;
  email!: FormControl;
  form!: FormGroup;
  @Output()
  onSubmit = new EventEmitter<string>();

  constructor(private controlContainer: ControlContainer, private router: Router,) {}

  showRequest() {
    return this.editor == 'request';
  }
  showConfirm() {
    return this.editor == 'confirm';
  }
  showReset() {
    return this.editor == 'reset';
  }

  submit(event: string) {
    this.onSubmit.emit();
    if (this.form.get('email')?.valid) {
      if (event == 'request') {
        this.request();
      } else if (event == 'confirm') {
        let codeClient = (<HTMLInputElement>document.getElementById("codeForm")).value;
        if (!isNaN(+codeClient)) {
          this.confirm(+codeClient);
        }
        else {
          this.message = "Vous devez entrez le code constitué de 6 chiffres."
        }
      } else if (event == 'reset') {
        this.reset();
      }
    }
  }

  request() {
    // TODO: Valider l'adresse courriel
    // TODO: Envoyer le code par courriel à emailClient
    this.emailRequested = 'temporaire@debug.com';
    this.editor = 'confirm';
    var codeGenere = Math.floor(100000 + Math.random() * 900000);

    // Temporairement, le code est envoyé dans la page pour debug
    this.code = codeGenere;
  }

  confirm(codeClient: number) {
    var codeCorrect = this.code;
    if (codeCorrect === codeClient) {
      this.editor = 'reset';
    } else {
      this.message = "Le code est incorrect.";
    }
  }

  reset() {
    // TODO: Reset le password du bon user
  }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.email = this.form.get('email') as FormControl;
  }
}
