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
    if (app.android) {
      this.confirmAndroid();
    } else if (app.ios) {
      this.confirmIphone();
    }
    // Or, just use nartivescript dialogs module:
    //this.confirm();
  }

  confirm() {
    var options = {
      title: 'Survey',
      message: 'Am I boring you?',
      okButtonText: "Yes",
      cancelButtonText: "Hell Yes"
    };
    dialogs.confirm(options).then(result => {
      this.label = result ? 'Yes Clicked!' : 'Hell Yes Clicked!';
    }).catch(e => {
      console.log(e);
    });

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


  confirmIphone() {
    //API GUIDE: https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIAlertController_class/

    let alertController = UIAlertController
      .alertControllerWithTitleMessagePreferredStyle('Survey', 'Am I boring you?', UIAlertControllerStyle.UIAlertControllerStyleAlert);

    alertController.addAction(UIAlertAction.actionWithTitleStyleHandler('Yes', UIAlertActionStyle.UIAlertActionStyleDefault, (arg) => {
      this.ngZone.run(() => this.label = 'Yes Clicked!');
    }));
    alertController.addAction(UIAlertAction.actionWithTitleStyleHandler('Hell Yes', UIAlertActionStyle.UIAlertActionStyleDefault, (arg) => {
      this.ngZone.run(() => this.label = 'Hell Yes Clicked!');
    }));
    var viewController = app.ios.rootController;
    viewController.presentModalViewControllerAnimated(alertController, true);
  }
}
