import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoColegiosComponent } from './listado-colegios.component';

describe('ListadoColegiosComponent', () => {
  let component: ListadoColegiosComponent;
  let fixture: ComponentFixture<ListadoColegiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoColegiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoColegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
