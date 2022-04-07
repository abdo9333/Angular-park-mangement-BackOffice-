import { Component, OnInit } from '@angular/core';
import { TreeService } from 'src/app/services/tree.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {  FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-tree',
  templateUrl: './add-tree.component.html',
  styleUrls: ['./add-tree.component.scss']
})
export class AddTreeComponent implements OnInit {

    add_tree_Form : FormGroup;
    
  constructor(
    private router: Router,
    private treeService: TreeService
  ) { }

  ngOnInit(): void {
    this.add_tree_Form = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        discription:  new FormControl(null, [Validators.required, Validators.minLength(3)]),
        historique:  new FormControl(null, [Validators.required, Validators.minLength(3)])
      });
  }

  onSubmitAddTree() {
    if(this.add_tree_Form.invalid) {
        return;
      }
      this.treeService.create(this.add_tree_Form.value).pipe(
        map(token => this.router.navigate(['/tree-details']))
      ).subscribe()
    
  }
 
}
