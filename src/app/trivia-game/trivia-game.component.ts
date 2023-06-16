import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css'],
})
export class TriviaGameComponent implements OnInit {
  category: number = 0;
  difficulty: string = '';
  sessionToken: string = '';
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: any = null;
  selectedAnswer: string = '';
  timer: any = null;
  timeRemaining: number = 31;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.category = +params['category'];
      this.difficulty = params['difficulty'];
      this.sessionToken = '';

      this.startGame();
    });
  }

  startGame() {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = '';
    this.timeRemaining = 31;

    this.fetchSessionToken().then(() => {
      this.fetchQuestions();
    });
  }

  fetchSessionToken() {
    return this.http
      .get<any>('https://opentdb.com/api_token.php?command=request')
      .toPromise()
      .then((response) => {
        this.sessionToken = response.token;
      });
  }

  fetchQuestions() {
    const url = `https://opentdb.com/api.php?amount=7`;

    axios
      .get(url)
      .then((response) => {
        this.questions = response.data.results;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.currentQuestion.answers = [
          ...this.currentQuestion.incorrect_answers,
          this.currentQuestion.correct_answer,
        ];
        this.currentQuestion.correctIndex =
          this.currentQuestion.answers.indexOf(
            this.currentQuestion.correct_answer
          );
        this.currentQuestion.points = 1;
        this.startTimer();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedAnswer = '';
      this.timeRemaining = 31;
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    clearInterval(this.timer);
    this.router.navigate(['/results'], {
      queryParams: { sessionToken: this.sessionToken },
    });
  }
}
