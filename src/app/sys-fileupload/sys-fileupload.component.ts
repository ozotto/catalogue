import {Component, Input, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Artwork} from '../ev-artgeneve/artworks/artwork';

const URL = 'http://127.0.0.1:8000/artgeneve/pictures/';


@Component({
  selector: 'app-sys-fileupload',
  templateUrl: './sys-fileupload.component.html',
  styleUrls: ['./sys-fileupload.component.scss']
})
export class SysFileuploadComponent implements OnInit {
  @Input() fileUploadLimit: number;

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;

  constructor() { }

  ngOnInit() {
    this.uploader = new FileUploader({url: URL, queueLimit: this.fileUploadLimit});
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('image', fileItem.file.rawFile);
      form.append('artwork', 1);
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
