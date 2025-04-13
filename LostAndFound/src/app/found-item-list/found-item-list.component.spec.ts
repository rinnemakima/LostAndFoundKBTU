import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundItemListComponent } from './found-item-list.component';

describe('FoundItemListComponent', () => {
  let component: FoundItemListComponent;
  let fixture: ComponentFixture<FoundItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
