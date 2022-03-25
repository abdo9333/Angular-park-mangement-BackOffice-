import { Component, Input, OnInit } from '@angular/core';
import { TreeService } from 'src/app/services/tree.service';
import { Tree } from 'src/app/models/tree/tree.model';

@Component({
  selector: 'app-tree-details',
  templateUrl: './tree-details.component.html',
  styleUrls: ['./tree-details.component.scss']
})
export class TreeDetailsComponent implements OnInit {

    trees ?: Tree[];
    currentTree: Tree = {};
    currentIndex = -1;
    name = '';
  
  constructor( private treeService: TreeService) { }

  ngOnInit(): void {
    this.getAllTrees();
  }

  getAllTrees(){
    this.treeService.getAll()
      .subscribe({
        next: (data) => {
          this.trees = data;
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.getAllTrees();
    this.currentTree = {};
    this.currentIndex = -1;
  }
  setActiveTree(tree: Tree, index: number): void {
    this.currentTree = tree;
    this.currentIndex = index;
  }


}
