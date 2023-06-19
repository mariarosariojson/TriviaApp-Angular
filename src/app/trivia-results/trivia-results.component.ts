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
      this.fetchResults();
    });
  }

  fetchResults() {
    this.http
      .get<any>(
        `https://opentdb.com/api.php?amount=10&token=b5ea3369e1698750a9578df33bed156014706e2362cb77f46aafe90c4dec151c`
      )
      .toPromise()
      .then((response) => {
        this.points = response.results.reduce((total: number, result: any) => {
          if (result.correct_answer === result.selected_answer) {
            total += 1;
            this.correctAnswers.push(result.question);
          }
          return total;
        }, 0);
      });
  }

  backToStart() {
    this.router.navigate(['/welcome']);
  }
}
