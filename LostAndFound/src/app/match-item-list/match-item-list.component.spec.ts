import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchItemListComponent } from './match-item-list.component';

describe('MatchItemListComponent', () => {
  let component: MatchItemListComponent;
  let fixture: ComponentFixture<MatchItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
