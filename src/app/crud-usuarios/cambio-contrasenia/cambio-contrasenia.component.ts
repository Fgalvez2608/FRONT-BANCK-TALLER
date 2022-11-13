import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'cambio-contrasenia',
  templateUrl: './cambio-contrasenia.component.html',
  styleUrls: ['./cambio-contrasenia.component.scss']
})
export class CambioContraseniaComponent implements OnInit {

  @Input()  user : any;
  @Output() cambioNombre = new EventEmitter <any>();

  constructor() { }

  ngOnInit(): void {
  }

  updateUserName(): void {
    this.cambioNombre.next(this.user);
    /*
    Swal.fire({
      title: 'Bien!',
      text: 'Do you want to continue',
      icon: 'question',
      confirmButtonText: 'Cool'
    })
    */
  }
}
