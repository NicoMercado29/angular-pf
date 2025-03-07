import { Component, OnInit } from '@angular/core';
import { courseService } from '../../../../core/services/courses.service';
import { Course } from './models';
import {MatDialog} from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

isLoadig = false;

dataSource: Course[] = [];

isAdmin$: Observable<boolean>
constructor(
  private courseService: courseService,
  private matDialog: MatDialog,
  private authService: AuthService,
) {
  this.isAdmin$ = this.authService.isAdmin$;
}
// ngoninit se dispara cuando el componente

handleCoursesUpdate(data: Course[]): void{
this.dataSource = [...data];
}

openFormDialog(editingCourse?: Course): void{
this.matDialog.open(CourseFormDialogComponent, {data :editingCourse})
.afterClosed().subscribe({
  next: (data) => {
    if (!!data){
      if(editingCourse){
        // actualizar
        this.updateCourse(editingCourse.id, data);

      } else {
        // crear
         this.addCourse(data);
      }
    
    }
  }
});
}
updateCourse(id: string ,data: {name: string}){
  this.isLoadig = true;
  this.courseService.updateCourseById(id, data).subscribe({
    next: (data) => this.handleCoursesUpdate(data),
    complete: () => (this.isLoadig = false),

  });
}

addCourse(data: {name: string}): void{
  this.isLoadig = true;
   this.courseService.addCourse (data).subscribe({
        next: (data) => this.handleCoursesUpdate(data),
        complete: () => (this.isLoadig = false),
      });
}


ngOnInit(): void {


  this.isLoadig=true;

  this.courseService.getCourses().subscribe({
    next: (data) => {
      this.handleCoursesUpdate(data);

    },
    complete: () =>{
      this.isLoadig= false;
    },
  });
}
onDelete (id: string):  void{
  if(confirm("¿Esta seguro de eliminar este curso?")){
    this.isLoadig = true;
    this.courseService.deleteCourseById(id).subscribe({
      next: (data) =>{
        this.handleCoursesUpdate(data);
      },
      complete: () => {
        this.isLoadig= false;
      }
    })
  }
}
}
