import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMecanicosComponent } from './crud-mecanicos.component';

describe('CrudMecanicosComponent', () => {
  let component: CrudMecanicosComponent;
  let fixture: ComponentFixture<CrudMecanicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudMecanicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudMecanicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
