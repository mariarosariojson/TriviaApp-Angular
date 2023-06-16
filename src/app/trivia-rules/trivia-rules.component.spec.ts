import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaRulesComponent } from './trivia-rules.component';

describe('TriviaRulesComponent', () => {
  let component: TriviaRulesComponent;
  let fixture: ComponentFixture<TriviaRulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaRulesComponent]
    });
    fixture = TestBed.createComponent(TriviaRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
