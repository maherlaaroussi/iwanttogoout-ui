import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDeadComponent } from './player-dead.component';

describe('PlayerDeadComponent', () => {
  let component: PlayerDeadComponent;
  let fixture: ComponentFixture<PlayerDeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerDeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
