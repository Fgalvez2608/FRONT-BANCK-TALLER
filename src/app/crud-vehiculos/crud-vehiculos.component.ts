import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import format from 'date-fns/format';

interface Vehi {
  placa: string;
  tipo: string;
  marca: string;
  linea: string;
  modelo: string;
  cilindraje: string;
  capacidad: string;
  paisOrigen: string;
  idPropietario: string;
}

@Component({
  selector: 'crud-vehiculos',
  templateUrl: './crud-vehiculos.component.html',
  styleUrls: ['./crud-vehiculos.component.scss'],
})
export class CrudVehiculosComponent implements OnInit {
  vehiCurrent: Vehi = {
    placa: '',
    tipo: '',
    marca: '',
    linea: '',
    modelo: '',
    cilindraje: '',
    capacidad: '',
    paisOrigen: '',
    idPropietario: '',
  };

  showForm = false;
  modeForm = 'adicion';

  campoBuscar = '';
  listVehi: Vehi[] = [];
  formVehi: FormGroup = new FormGroup({});

  constructor(
    private requestBack: RequestBackendService,
    private fb: FormBuilder
  ) {
    this.formVehi = this.fb.group({
      placa: [''],
      tipo: [''],
      marca: [''],
      linea: [''],
      modelo: [''],
      cilindraje: [''],
      capacidad: [''],
      paisOrigen: [''],
      idPropietario: [''],
    });

  }

  ngOnInit(): void {
    this.getVehiculos();
  }

  getVehiculos() {
    const entity = '/vehiculos';
    this.requestBack.getData(entity).subscribe({
      next: (data) => {
        console.log('next');
        this.listVehi = data;
      },
      error: (error) => {
        console.log('error: ' + error);
        this.listVehi = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  getVehiFilter() {
    this.requestBack.getDataVehi('vehiculos', this.campoBuscar).subscribe({
      next: (data) => {
        console.log('next');
        this.listVehi = data;
      },
      error: (error) => {
        console.log('error: ' + error);
        this.listVehi = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

    vehiculo(vehiculo: Vehi): void {
    console.log(vehiculo);
    this.vehiCurrent = vehiculo;
  }

  updateVehiName(newVehi: Vehi): void {
    const copiaLista = JSON.parse(JSON.stringify(this.listVehi));

    this.requestBack
      .updateData('vehiculos', newVehi.placa, JSON.stringify(newVehi))
      .subscribe({
        next: (data) => {
          for (const i in copiaLista) {
            if (copiaLista[i].idUsuario == newVehi.placa) {
              copiaLista[i] = newVehi;
            }
          }
          this.listVehi = copiaLista;
        },
        error: (error) => {
          console.log('error: ' + error);
          this.listVehi = [];
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  clickVehi(vehiculo: Vehi): void {
    console.log(vehiculo);
    this.vehiCurrent = JSON.parse(JSON.stringify(vehiculo));
  }

  saveVehi(): void {
    const datosVehi = this.formVehi.getRawValue();
    delete datosVehi['idPropietario'];
    this.requestBack.addData('vehiculos', JSON.stringify(datosVehi)).subscribe({
      next: (data) => {
        this.showForm = false;
        const cloneList = JSON.parse(JSON.stringify(this.listVehi));
        cloneList.unshift(data);
        this.listVehi = cloneList;
        Swal.fire(
          'Muy Bien!!!',
          'Se Ha Agregado El Vehiculo Con Exito',
          'success'
        );
      },
      error: (error) => {
        console.log('error: ' + error);
        this.listVehi = [];
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  deleteVehi(code: string): void {
    Swal.fire({
      title: 'Estas seguro de Eliminar el Vehiculo?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.requestBack.deleteData('vehiculos', code).subscribe({
          next: (data) => {
            const cloneList = JSON.parse(JSON.stringify(this.listVehi));
            for (const i in cloneList) {
              if (cloneList[i].placa == code) {
                cloneList.splice(Number(i), 1);
                break;
              }
            }
            this.listVehi = cloneList;
            Swal.fire('Eliminado!', '', 'success');
          },
          error: (error) => {
            console.log('error: ' + error);
            this.listVehi = [];
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }

  selecVehiEdit(vehiculo: any): void {
    this.showForm = true;
    this.modeForm = 'edicion';
    const vehiEdit = JSON.parse(JSON.stringify(vehiculo));
    this.formVehi.patchValue(vehiEdit);
  }

  editVehi(): void {
    const newVehi = this.formVehi.getRawValue();
    this.requestBack
      .updateData('vehiculos', newVehi.placa, newVehi)
      .subscribe({
        next: (data) => {
          this.showForm = false;
          this.getVehiculos();
          Swal.fire('Excelente!!', 'Has Editado Correctamente la Informacion de tu Vehiculo', 'success');
        },
        error: (error) => {
          console.log('error: ' + error);
          Swal.fire('Error', 'Ha Ocurrido un Error en el proceso', 'error');
          this.listVehi = [];
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  handleCancel(): void {
    this.showForm = false;
  }

  setShowForm(): void {
    this.showForm = !this.showForm;
  }

  }




