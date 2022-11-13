import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { LayoutComponent } from './layout/layout.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
registerLocaleData(en);
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CambioContraseniaComponent } from './crud-usuarios/cambio-contrasenia/cambio-contrasenia.component';
import { HttpClientModule } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CrudMecanicosComponent } from './crud-mecanicos/crud-mecanicos.component';
@NgModule({
  declarations: [
    AppComponent,
    CrudUsuariosComponent,
    LayoutComponent,
    CrudVehiculosComponent,
    CambioContraseniaComponent,
    CrudMecanicosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NzSpaceModule,
    AppRoutingModule,
    NzDividerModule,
    NzTableModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzButtonModule, NzModalModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
