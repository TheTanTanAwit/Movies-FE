import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64VideoPlayerComponent } from './base64-video-player.component';

describe('Base64VideoPlayerComponent', () => {
  let component: Base64VideoPlayerComponent;
  let fixture: ComponentFixture<Base64VideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Base64VideoPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Base64VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
