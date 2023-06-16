import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trivia-results',
  templateUrl: './trivia-results.component.html',
  styleUrls: ['./trivia-results.component.css'],
})
export class TriviaResultsComponent implements OnInit {
  sessionToken: string = '';
  score!: number;
  correctAnswers: string | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.sessionToken = params['sessionToken'];

      if (this.sessionToken) {
        this.fetchResults();
      }
    });
  }

  fetchResults() {
    const url = `https://opentdb.com/api.php?command=getScore&token=${this.sessionToken}`;

    this.http.get<any>(url).subscribe((response) => {
      this.score = response.correctly_answered;
      this.correctAnswers = response.correct_answers;
    });
  }
}
