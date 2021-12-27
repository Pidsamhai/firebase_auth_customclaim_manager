import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomClaimsComponent } from './edit-custom-claims.component';

describe('EditCustomClaimsComponent', () => {
  let component: EditCustomClaimsComponent;
  let fixture: ComponentFixture<EditCustomClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
