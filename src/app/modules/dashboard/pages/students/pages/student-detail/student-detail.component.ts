import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {
  studentId: string;
  fullName: string;
  // activate roud es un objeto que tiene informacion de la ruta cargada
  constructor(private activetedRouter: ActivatedRoute){
    this.studentId = this.activetedRouter.snapshot.params['id'];
    const name= this.activetedRouter.snapshot.queryParams['name'];
    const lastName= this.activetedRouter.snapshot.queryParams['lastName'];

    this.fullName = `${name} ${lastName}`;
  }

}
