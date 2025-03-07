////los servicios para ser utilizados en los componentes tienen que llevar el injetable 
import { Injectable } from "@angular/core";
import { Student } from "../../modules/dashboard/pages/students/models";
import { generateRandomString } from "../../shared/utils";
import { Observable, Subscriber } from "rxjs";
///este servicio lo vamos a poder utilizar en cualquier componente sin importarlo en el modulo

@Injectable ({providedIn: 'root'})
export class StudentsService {
    ///los servicios se encarga de manejar la informacion de los servicios externos

// esta promesa va a devolver un array de estudiantes
    getStudentsPromise(): Promise<Student[]>{
    // cuando declaramos una promesa tenemos que hacer ambos casos , si se cumple y no se cumple, el resolve es si se resuelve , el reject es si no se resuelve
        return new Promise<Student[]>((resolve, reject) => {

            setTimeout(() => {
                resolve([{
                    "id":generateRandomString(6),"name":"Nicolas","lastName":"Mercado"},
                    {"id":generateRandomString(6),"name":"Patricio","lastName":"Mercado"},
                    {"id":generateRandomString(6),"name":"Mariela","lastName":"Hildebrandt"},
                ])
            }, 3000);

        })
    }

// observable 
// variable retorna un array de estudiantes
// para ver el valor del observable nos tenemos que suscribir
// aca emitimos los estudiantes
getStudentsObservable(): Observable<Student[]>{
    return new Observable<Student[]>((subscriber) =>{
        setTimeout(() => {
             subscriber.next([{
            "id":generateRandomString(6),"name":"Nicolas","lastName":"Mercado"},
            {"id":generateRandomString(6),"name":"Patricio","lastName":"Mercado"},
            {"id":generateRandomString(6),"name":"Mariela","lastName":"Hildebrandt"},
        ]);

         subscriber.complete();

        }, 3000);
        // metodo complete notifica al suscriptor que este observable ya no va a emitir mas datos 

    });
}
}