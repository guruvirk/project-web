import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellRequestsComponent } from './sell-requests.component';

describe('SellRequestsComponent', () => {
  let component: SellRequestsComponent;
  let fixture: ComponentFixture<SellRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
