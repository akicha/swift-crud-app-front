import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserModuleComponent } from './new-user-module.component';

describe('NewUserModuleComponent', () => {
  let component: NewUserModuleComponent;
  let fixture: ComponentFixture<NewUserModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
