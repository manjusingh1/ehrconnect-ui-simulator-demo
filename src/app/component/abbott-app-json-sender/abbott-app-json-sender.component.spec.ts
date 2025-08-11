import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbottAppJsonSenderComponent } from './abbott-app-json-sender.component';

describe('AbbottAppJsonSenderComponent', () => {
  let component: AbbottAppJsonSenderComponent;
  let fixture: ComponentFixture<AbbottAppJsonSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbbottAppJsonSenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbbottAppJsonSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
