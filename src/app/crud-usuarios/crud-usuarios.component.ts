import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import format from 'date-fns/format';

interface Person {
  idUsuario: string;
  nombre: string;
  telefono: number;
  fechaNacimiento: string;
  contrasenia: string;
}

@Component({
  selector: 'crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.scss'],
})
export class CrudUsuariosComponent implements OnInit {
  userCurrent: Person = {
    idUsuario: '',
    nombre: '',
    telefono: 0,
    fechaNacimiento: '',
    contrasenia: '',
  };

  showForm = false;
  modeForm = 'adicion';

  campoBuscar = '';
  sedes: any = [];
  sedeCurrent = '';
  listOfData: Person[] = [];
  formUser: FormGroup = new FormGroup({});

  constructor(
    private requestBack: RequestBackendService,
    private fb: FormBuilder
  ) {
    this.getSedes();

    this.formUser = this.fb.group({
      idUsuario: [''],
      nombre: [''],
      telefono: [''],
      fechaNacimiento: [new Date()],
      contrasenia: ['1111'],
      sedeId: [''],
    });
  }

  ngOnInit(): void {}

  getUsuarios(sede: string) {
    const entity = 'sedes/' + sede + '/usuarios';
    this.requestBack.getData(entity).subscribe({
      next: (data) => {
        console.log('next');
        this.listOfData = data;
      },
      error: (error) => {
        console.log('error: ' + error);
        this.listOfData = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  getSedes() {
    this.requestBack.getData('sedes').subscribe({
      next: (data) => {
        this.sedes = data;
        this.sedeCurrent = data[0].idsede;
        this.getUsuarios(this.sedeCurrent);
      },
      error: (error) => {
        console.log('error: ' + error);
        this.sedes = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  getUsuariosFilter() {
    this.requestBack.getData('usuarios', this.campoBuscar).subscribe({
      next: (data) => {
        console.log('next');
        this.listOfData = data;
      },
      error: (error) => {
        console.log('error: ' + error);
        this.listOfData = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  user(user: Person): void {
    console.log(user);
    this.userCurrent = user;
  }

  updateUserName(newUser: Person): void {
    const copiaLista = JSON.parse(JSON.stringify(this.listOfData));

    this.requestBack
      .updateData('usuarios', newUser.idUsuario, JSON.stringify(newUser))
      .subscribe({
        next: (data) => {
          for (const i in copiaLista) {
            if (copiaLista[i].idUsuario == newUser.idUsuario) {
              copiaLista[i] = newUser;
            }
          }
          this.listOfData = copiaLista;
        },
        error: (error) => {
          console.log('error: ' + error);
          this.listOfData = [];
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  clickUser(user: Person): void {
    console.log(user);
    this.userCurrent = JSON.parse(JSON.stringify(user));
  }

  saveUser(): void {
    const datosUser = this.formUser.getRawValue();
    datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);
    datosUser['sedeId'] = this.sedeCurrent;
    delete datosUser['idUsuario'];
    this.requestBack.addData('usuarios', JSON.stringify(datosUser)).subscribe({
      next: (data) => {
        //this.getUsuarios();
        this.showForm = false;
        const cloneList = JSON.parse(JSON.stringify(this.listOfData));
        cloneList.unshift(data);
        this.listOfData = cloneList;
        Swal.fire(
          'Muy Bien!!!',
          'Se Ha Agregado El Usuario Con Exito',
          'success'
        );
      },
      error: (error) => {
        console.log('error: ' + error);
        this.listOfData = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  deleteUser(code: string): void {
    Swal.fire({
      title: 'Estas seguro de Eliminar al Usuario?',
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancel',
      //denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success');

        this.requestBack.deleteData('usuarios', code).subscribe({
          next: (data) => {
            const cloneList = JSON.parse(JSON.stringify(this.listOfData));
            for (const i in cloneList) {
              if (cloneList[i].idUsuario == code) {
                cloneList.splice(Number(i), 1);
                break;
              }
            }
            this.listOfData = cloneList;
            Swal.fire('Eliminado!', '', 'success');
          },
          error: (error) => {
            console.log('error: ' + error);
            this.listOfData = [];
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }

  selecUserEdit(user: any): void {
    this.showForm = true;
    this.modeForm = 'edicion';
    const userEdit = JSON.parse(JSON.stringify(user));
    //const array = user.fechaNacimiento.split("T");
    const fecha = user.fechaNacimiento.split('T')[0];
    //userEdit['fechaNacimiento'] = new Date(userEdit['fechaNacimiento']);
    userEdit['fechaNacimiento'] = fecha;
    this.formUser.patchValue(userEdit);
  }

  editUser(): void {
    const newUser = this.formUser.getRawValue();
    newUser['fechaNacimiento'] = new Date(newUser['fechaNacimiento']);
    this.requestBack
      .updateData('usuarios', newUser.idUsuario, newUser)
      .subscribe({
        next: (data) => {
          this.showForm = false;
          this.getUsuarios(this.sedeCurrent);
          Swal.fire('Excelente!!', 'Has Editado Correctamente', 'success');
        },
        error: (error) => {
          console.log('error: ' + error);
          Swal.fire('Error', 'Ha Ocurrido un Error en el proceso', 'error');
          this.listOfData = [];
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  changeSede(): void {
    this.getUsuarios(this.sedeCurrent);
  }

  handleCancel(): void {
    this.showForm = false;
  }

  setShowForm(): void {
    this.showForm = !this.showForm;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'd-LLL-yyyy');
  }
}
