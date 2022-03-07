import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SportService } from 'src/app/services/sport.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Sport } from 'src/app/models/sport/sport.model';
import { Observable, of, catchError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';

//file
export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}
// file end
@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.scss'],
})
export class SportListComponent implements OnInit {
  //file
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  form: FormGroup;

  // origin = this.window.location.origin;

  @Input() viewMode = false;
  @Input() currentSport: Sport = {
    name: '',
    discription: '',
    categorie: '',
  };

  message = '';

  constructor(
    private sportService: SportService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getSport(this.route.snapshot.params['id']);
    }
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      discription: [null, [Validators.required]],
      categorie: [null, [Validators.required]],
      sportImage: [null],
    });
  }

  getSport(id: string): void {
    this.sportService.get(id).subscribe({
      next: (data) => {
        this.currentSport = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateSport(): void {
    this.message = '';
    this.sportService
      .update(this.currentSport.id, this.currentSport)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This sport was updated successfully!';
        },
        error: (e) => console.error(e),
      });
  }

  deleteSport(): void {
    this.sportService.delete(this.currentSport.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/sport-details']);
      },
      error: (e) => console.error(e),
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
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.sportService
      .uploadProfileImage(formData, this.currentSport.id)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total
              );
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload failed');
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.form.patchValue({ sportImage: event.body.sportImage });
        }
      });
  }

  // end upload image
}
