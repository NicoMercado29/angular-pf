import { Injectable } from "@angular/core";
import { concatMap, delay, Observable, of } from "rxjs";
import { generateRandomString } from "../../shared/utils";
import { Course } from "../../modules/dashboard/pages/courses/models";
// import { Course } from '../../modules/dashboard/pages/courses/models/index';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment.development";
// el servicio envia la informacion a mi componente

let MY_FAKE_DATABASE: Course[] = [
    {
        id:generateRandomString(6),
        name: 'JavaScript'
    },
{
    id:generateRandomString(6),
    name: 'Angular'
},
{
    id:generateRandomString(6),
    name:'RxJs'
}
]


@Injectable ({providedIn: 'root'})
export class courseService {

    constructor(private httpClient:HttpClient) {}

    updateCourseById(id:string, data:{name: string}): Observable<Course[]> {
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.map((course) => course.id === id ? {...course, ...data}:course);
        return this.getCourses();
    }

    addCourse(payload: { name : string }): Observable<Course[]>{

        // // agregar 
        // MY_FAKE_DATABASE.push({
        //     ...payload,
        //     id:generateRandomString(6)
        // });
        return (
         this.httpClient.post<Course>(`${environment.baseApiUrl}/courses`, payload)
        .pipe(concatMap(() => this.getCourses()))
        );
    }

getCourses(): Observable<Course[]>{
    // return of([...MY_FAKE_DATABASE]).pipe(delay(1000))
    return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`);
}
deleteCourseById(id: string): Observable<Course[]>{
    return this.httpClient.delete<Course>(`&{environment.baseApiUrl}/courses/${id}`).pipe(concatMap(()=> this.getCourses()))
// MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter(course => course.id != id);
// return this.getCourses();
}
}