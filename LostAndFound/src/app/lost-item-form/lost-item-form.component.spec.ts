import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostItemFormComponent } from './lost-item-form.component';

describe('LostItemFormComponent', () => {
  let component: LostItemFormComponent;
  let fixture: ComponentFixture<LostItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LostItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
