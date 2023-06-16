import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trivia-results',
  templateUrl: './trivia-results.component.html',
  styleUrls: ['./trivia-results.component.css'],
})
export class TriviaResultsComponent implements OnInit {
  sessionToken: string = '';
  points: number = 0;
  correctAnswers: string[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.sessionToken = params['sessionToken'];

      if (this.sessionToken) {
        this.fetchResults();
      }
    });
  }

  fetchResults() {
    const url = `https://opentdb.com/api_token.php?command=request=${this.sessionToken}`;

    this.http.get<any>(url).subscribe((response) => {
      this.points = response.correctly_answered;
      this.correctAnswers = response.correct_answers;
    });
  }

  backToStart() {
    this.router.navigate(['/welcome']);
  }
}
