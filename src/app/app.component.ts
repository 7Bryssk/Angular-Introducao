import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlunosService } from './../app/services/alunos.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ProjectsService } from './services/projects.service';

import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'meu-app';
  nome = 'Bruno';
  isVisible = true;
  myValue = 3;
  myList = [1, 3, 5, 7, 9, 50];
  alunos = [];
  searchText = '';
  projects = [];
  isAlive = true;

  constructor(
    private alunosService: AlunosService,
    private projectService: ProjectsService
  ) {
    this.alunos = this.alunosService.getAlunos();
  }

  ngOnInit() {
    this.projectService.projects
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(
        projects => {
          this.projects = projects;
        }
      )
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  handleClick() {
    alert('Hi!');
  }

  getProjects() {
    this.projectService.getProjects(this.searchText);
  }

}