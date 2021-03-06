import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ViewController } from 'ionic-angular';

@Component({
  selector: "page-item-create",
  templateUrl: "item-create.html"
})
export class ItemCreatePage {
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  @ViewChild("fileInput") fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera
  ) {
    this.form = formBuilder.group({
      profilePic: [""],
      name: ["", Validators.required],
      about: [""]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {}

  getPicture() {
    if (this.camera["installed"]()) {
      this.camera
        .getPicture({
          targetWidth: 96,
          targetHeight: 96
        })
        .then(
          data => {
            this.form.patchValue({
              profilePic: "data:image/jpg;base64," + data
            });
          },
          err => {
            alert("Unable to take photo");
          }
        );
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let input = this.fileInput.nativeElement;

    var reader = new FileReader();
    reader.onload = readerEvent => {
      input.parentNode.removeChild(input);

      var imageData = (readerEvent.target as any).result;
      this.form.patchValue({ profilePic: imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return "url(" + this.form.controls["profilePic"].value + ")";
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) {
      return;
    }
    this.viewCtrl.dismiss(this.form.value);
  }
}
