import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models/index';
import { generateRandomString } from '../../../../shared/utils';
import { StudentsService } from '../../../../core/services/students.service';


@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions',];
 



  ///para pushear los estudiantes inscriptos//tenemos la interface en el index.ts//
  students: Student[] = [];
  selectedStudent: any;

  isLoading = false;


  studentForm : FormGroup;
//formulario//
  constructor(private fb: FormBuilder, 
    private studentService: StudentsService
  )
  
  
  {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null,[Validators.required]],

    });

  }
  ngOnInit(): void {

    this.isLoading = true;
  // este ciclo se ejecuta despues del constructor,al incializar el componente
   this.studentService.getStudentsPromise()
  //  para atrapar una promesa satifactoria de la promesa usamos el then
   .then((students) => {
    this.students = students;
   })
  //  despues de que la promesa se cumple lo declaramos en false para mostrar la pagina
   .finally(()=>{
     this.isLoading = false;
   });
  
  }
  // ///aca nos suscribimos 
  // ngOnInit(): void {
  //   this.studentService.getStudents().subscribe(data =>{
  //     this.students = data;
  //   });
  

  onSubmit(){
    ///si es invalido marcamos el input en rojo///
    if (this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }
    ///si el formulario es valido
    else {
      console.log(this.studentForm.value);

      ////para pushear estudiante
      this.students = [
        ...this.students,{
          id: generateRandomString(6),
          ...this.studentForm.value,
        },
      ];
      this.studentForm.reset();
    }
  }
  onDelete(id: string){
    if(confirm("¿Esta seguro que desea eliminar al estudiante?")){
      this.students = this.students.filter(student => student.id !== id);
    }
    
  }
// /entramos al archivo de servicios le pasamos id 
//   getStudentDetails(id: string){
//     this.studentService.getStudentById(id).subscribe(student => {
//       this.selectedStudent = student;
//     });
//   }

}
