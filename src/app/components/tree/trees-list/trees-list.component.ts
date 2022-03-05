import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TreeService } from 'src/app/services/tree.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Tree } from 'src/app/models/tree/tree.model';
import { Observable, of, catchError } from 'rxjs';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

//file
export interface File {
    data: any;
    progress: number;
    inProgress: boolean;
  }
  // file end
@Component({
  selector: 'app-trees-list',
  templateUrl: './trees-list.component.html',
  styleUrls: ['./trees-list.component.scss']
})
export class TreesListComponent implements OnInit {

    //file 
    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

    file: File = {
      data: null,
      inProgress: false,
      progress: 0
    };
  
    form: FormGroup;

   // origin = this.window.location.origin;


    @Input() viewMode = false;
    @Input() currentTree: Tree = {
    name: '',
    discription: '',
    historique: ''
  };

  message = '';

  constructor(
    private treeService: TreeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
        this.message = '';
        this.getTree(this.route.snapshot.params["id"]);
      }
      this.form = this.formBuilder.group({
        id: [{value: null, disabled: true}, [Validators.required]],
        name: [null, [Validators.required]],
        discription: [null, [Validators.required]],
        historique : [null, [Validators.required]],
        treeImage: [null]
      });
  }

  // upload image 
  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    }
  }
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.treeService.uploadProfileImage(formData).pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of('Upload failed');
      })).subscribe((event: any) => {
        if(typeof (event) === 'object') {
          this.form.patchValue({treeImage: event.body.treeImage});
        }
      })
  }
/*
  update() {
    this.treeService.updateOne(this.form.getRawValue()).subscribe();
  }*/

  
  // end upload image

  getTree(id: string): void {
    this.treeService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTree = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateTree(): void {
    this.message = '';
    this.treeService.update(this.currentTree.id, this.currentTree)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tree was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTree(): void {
    this.treeService.delete(this.currentTree.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }
  

}
