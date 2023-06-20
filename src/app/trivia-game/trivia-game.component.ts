import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css'],
})
export class TriviaGameComponent implements OnInit {
  category: string = '';
  difficulty: string = '';
  sessionToken: string = '';
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: any = null;
  selectedAnswer: string = '';
  timer: any = null;
  timeRemaining: number = 31;
  correctAnswers: string[] = [];
  points: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'];
      this.difficulty = params['difficulty'];
      this.sessionToken = params['sessionToken'];
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

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  fetchQuestions() {
    const url = `https://opentdb.com/api.php?amount=7&type=multiple`;

    axios
      .get(url)
      .then((response) => {
        this.questions = response.data.results;

        this.questions.forEach((question) => {
          const allAnswers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          const shuffledAnswers = this.shuffleArray<string>(allAnswers);

          question.answers = shuffledAnswers.map((answer) => answer);
          question.correctIndex = shuffledAnswers.indexOf(
            question.correct_answer
          );
          question.points = 1;
        });

        this.currentQuestion = this.questions[this.currentQuestionIndex];
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

  selectAnswer(answer: string, index: number) {
    this.selectedAnswer = answer;

    if (index === this.currentQuestion.correctIndex) {
      this.correctAnswers.push(this.selectedAnswer.toString());
      this.points++;
    }
    setTimeout(() => {
      this.nextQuestion();
    }, 1000);
    console.log(this.correctAnswers);
  }
  
  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];

      const allAnswers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ];
      const shuffledAnswers = this.shuffleArray<string>(allAnswers);

      this.currentQuestion.answers = shuffledAnswers;
      this.currentQuestion.correctIndex = shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );

      this.selectedAnswer = '';
      this.timeRemaining = 31;
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    sessionStorage.setItem('points', this.points.toString());
    sessionStorage.setItem(
      'correctAnswers',
      JSON.stringify(this.correctAnswers)
    );
    clearInterval(this.timer);
    this.router.navigate(['/results'], {
      queryParams: { sessionToken: this.sessionToken },
    });
  }
}
