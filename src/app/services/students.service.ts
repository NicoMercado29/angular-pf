// ///proviene de angular core es nativo
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// ///rxjs de aca sale el observable
// import { map, Observable } from 'rxjs';
// ///esta ruteado
// @Injectable({
//   providedIn: 'root'
// })

// export class StudentsService {
//   private studentUrl = 'assents/students.json';

//   constructor(
//     private http: HttpClient
//   ) { }

// ///esto se utiliza para manejar la data ...observable es un flujo de datos que se puede observar
// ///getstudents es para subscribirse , observable es el suscriptor
//   getStudents(): Observable<any[]>{
//     ///en el return va lo que devuelve el backend
//     return this.http.get<any[]>(this.studentUrl);
//   }
//   getStudentById(id:string): Observable<any>{
//     return this.http.get<any[]>(this.studentUrl).pipe(
//       ///find busca ,maps lo recorre los objetos
//       map(students => students.find(student => student.id === id))
//     );
//   }

// }
