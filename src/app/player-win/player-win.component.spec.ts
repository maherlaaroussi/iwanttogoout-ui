import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerWinComponent } from './player-win.component';

describe('PlayerWinComponent', () => {
  let component: PlayerWinComponent;
  let fixture: ComponentFixture<PlayerWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerWinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
