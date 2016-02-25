import {Component, Input, NgZone} from "angular2/core";
var dialogs = require("ui/dialogs");
var app = require("application");

@Component({
  selector: "App",
  directives: [],
  template: `
<Label [text]="label" (tap)="showConfirmDialog()" class="demo-label"></Label>
`
})
export class AppComponent {
  public label = 'Hello Bash';

  constructor(private ngZone: NgZone) {
  }

  showConfirmDialog() {
    this.confirmAndroid();
  }

  confirmAndroid() {
    //API Guide: http://developer.android.com/guide/topics/ui/dialogs.html

    let builder = new android.app.AlertDialog.Builder(app.android.currentContext, 0);
    builder.setTitle('Survey')
      .setMessage('Am I boring you?')
      .setPositiveButton('Yes', new android.content.DialogInterface.OnClickListener({
        onClick: (dialog, id: number) => {
          this.ngZone.run(() => {
            dialog.cancel();
            this.label = 'Yes Clicked!';
          });
        }
      }))
      .setNegativeButton('Hell Yes', new android.content.DialogInterface.OnClickListener({
        onClick: (dialog, id: number) => {
          this.ngZone.run(() => {
            dialog.cancel();
            this.label = 'Hell Yes Clicked';
          });
        }
      }));

    builder.show();
  }
}
