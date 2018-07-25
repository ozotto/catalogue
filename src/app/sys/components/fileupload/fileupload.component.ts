import {Component, Input, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {BACKEND_URL} from '../../constants';
import {Picture} from '../../../ev-artgeneve/models/pictures';

const URL = BACKEND_URL + '/artgeneve/pictures/';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  @Input() fileUploadLimit: number;
  @Input() rattachedInstanceId: number;
  @Input() fieldToUpdate: string;
  uploadedImages: Picture[];

  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;

  constructor() {
    console.log('construc');
    this.uploadedImages = new Array();
  }

  ngOnInit() {
    this.uploader = new FileUploader({url: URL, queueLimit: this.fileUploadLimit});
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('image', fileItem.file.rawFile);
      form.append(this.fieldToUpdate, this.rattachedInstanceId);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: number, headers: any) => {
      console.log('Gniaaa response');
      console.log(response);
      // const res = JSON.parse(response);
      // console.log(res.image);
      this.uploadedImages.push(JSON.parse(response)); //push(response);
      console.log('gniaaa 1');
      console.log(this.uploadedImages);
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // public uploadAllImages() {
  //   console.log(this.uploadedImages);
  // }

}
