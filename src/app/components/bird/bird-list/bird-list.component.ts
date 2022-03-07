import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BirdsService } from 'src/app/services/birds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Bird } from 'src/app/models/bird/bird.model';
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
  selector: 'app-bird-list',
  templateUrl: './bird-list.component.html',
  styleUrls: ['./bird-list.component.scss']
})
export class BirdListComponent implements OnInit {

    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

    file: File = {
      data: null,
      inProgress: false,
      progress: 0
    };
  
    form: FormGroup;

    @Input() viewMode = false;
    @Input() currentBird: Bird = {
    name: '',
    discription: '',
    species: ''
  };

  message = '';

  constructor(
    private birdService: BirdsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
        this.message = '';
        this.getBird(this.route.snapshot.params["id"]);
      }
      this.form = this.formBuilder.group({
        id: [{value: null, disabled: true}, [Validators.required]],
        name: [null, [Validators.required]],
        discription: [null, [Validators.required]],
        species : [null, [Validators.required]],
        birdImage: [null]
      });
  }
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

    this.birdService.uploadProfileImage(formData, this.currentBird.id).pipe(
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
          this.form.patchValue({BirdImage: event.body.BirdImage});
        }
      })
  }

  // end upload image

  getBird(id: string): void {
    this.birdService.get(id)
      .subscribe({
        next: (data) => {
          this.currentBird = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateBird(): void {
    this.message = '';
    this.birdService.update(this.currentBird.id, this.currentBird)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Bird was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteBird(): void {
    this.birdService.delete(this.currentBird.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/Bird-details']);
        },
        error: (e) => console.error(e)
      });
  }
  

}
