import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

// Request = envoyer un email pour demander un changement de mot de passe
// Confirm = confirmaton du code envoyé à l'adresse courriel
// Reset = changement du mot de passe
export type EditorType = 'request' | 'confirm' | 'reset';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  editor: EditorType = 'request';
  code: number = 1000000;
  emailRequested: string = 'void';
  @Input() getEmailError!: () => string;
  email!: FormControl;
  form!: FormGroup;
  @Output()
  onSubmit = new EventEmitter<string>();

  constructor(private controlContainer: ControlContainer) {}

  get showRequest() {
    return this.editor == 'request';
  }
  get showConfirm() {
    return this.editor == 'confirm';
  }
  get showReset() {
    return this.editor == 'reset';
  }

  switchForm(type: EditorType) {
    this.editor = type;
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
    if (codeCorrect == codeClient){
      this.editor = 'reset';
    }
    else {
      // TODO: Return une erreur
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
