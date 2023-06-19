import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TriviaResultsComponent } from './trivia-results.component';

describe('TriviaResultsComponent', () => {
  let component: TriviaResultsComponent;
  let fixture: ComponentFixture<TriviaResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaResultsComponent],
    });
    fixture = TestBed.createComponent(TriviaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});

