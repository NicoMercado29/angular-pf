import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective {

  constructor(
    private elementRef: ElementRef
  ) { 
    ///aca modificamos desde la llave que envuelve el elemento, es un componente que no tiene html pero lo absorbo de aca
  }

}
