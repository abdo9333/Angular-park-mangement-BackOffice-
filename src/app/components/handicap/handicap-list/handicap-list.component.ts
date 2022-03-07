import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HandicapService } from 'src/app/services/handicap.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Handicap } from 'src/app/models/handicap/handicap.model';
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
  selector: 'app-handicap-list',
  templateUrl: './handicap-list.component.html',
  styleUrls: ['./handicap-list.component.scss'],
})
export class HandicapListComponent implements OnInit {
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
  @Input() currentHandicap: Handicap = {
    name: '',
    discription: '',
    historique: '',
  };

  message = '';

  constructor(
    private handicapService: HandicapService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getHandicap(this.route.snapshot.params['id']);
    }
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      discription: [null, [Validators.required]],
      historique: [null, [Validators.required]],
      handicapImage: [null],
    });
  }

  getHandicap(id: string): void {
    this.handicapService.get(id).subscribe({
      next: (data) => {
        this.currentHandicap = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateHandicap(): void {
    this.message = '';
    this.handicapService
      .update(this.currentHandicap.id, this.currentHandicap)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This handicap was updated successfully!';
        },
        error: (e) => console.error(e),
      });
  }

  deleteHandicap(): void {
    this.handicapService.delete(this.currentHandicap.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/handicap-details']);
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

    this.handicapService
      .uploadProfileImage(formData, this.currentHandicap.id)
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
          this.form.patchValue({ handicapImage: event.body.handicapImage });
        }
      });
  }

  // end upload image
}
