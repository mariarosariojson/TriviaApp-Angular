import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trivia-results',
  templateUrl: './trivia-results.component.html',
  styleUrls: ['./trivia-results.component.css'],
})
export class TriviaResultsComponent implements OnInit {
  sessionToken: string = '';
  points: number = 0;
  correctAnswers: string[] = [];
  incorrectAnswers: string[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.sessionToken = params['sessionToken'];
      this.points = parseInt(sessionStorage.getItem('points') || '0');
      this.correctAnswers = JSON.parse(
        sessionStorage.getItem('correctAnswers') || '[]'
      );
      this.incorrectAnswers = JSON.parse(
        sessionStorage.getItem('incorrectAnswers') || '[]'
      );
    });
  }

  backToStart() {
    this.router.navigate(['/welcome']);
  }
}
