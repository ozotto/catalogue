import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {BACKEND_URL} from '../../../constants';
import {Picture} from './picture';

const URL = BACKEND_URL + '/livre/authors/';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  @Input() fileUploadLimit: number;
  @Input() rattachedInstanceId: number;
  @Input() fieldToUpdate: string;
  @Output() authorIdReturned = new EventEmitter<boolean>();
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
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      console.log('Gniaaa response');
      console.log(response);
      const res = JSON.parse(response);
      console.log(res.image);
      this.uploadedImages.push(JSON.parse(response)); //push(response);
      console.log('gniaaa 1');
      console.log(res);
      console.log(res.id);

      this.authorIdReturned.emit(res.id);
    };

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // public uploadAllImages() {
  //   console.log(this.uploadedImages);
  // }

}
