import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  ///capturamos el click para que haga la funcion del menu
 @Output () drawerToggle = new EventEmitter();
}
