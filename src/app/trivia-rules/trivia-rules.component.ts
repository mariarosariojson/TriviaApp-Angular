import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { OnInit } from '@angular/core';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-trivia-rules',
  templateUrl: './trivia-rules.component.html',
  styleUrls: ['./trivia-rules.component.css'],
})
export class TriviaRulesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: string = '';
  selectedDifficulty: string = '';

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => {
        this.categories = response.data.trivia_categories;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  constructor(private router: Router) {}

  startGame() {
    const queryParams = {
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
    };
    this.router.navigate(['/game'], { queryParams });
  }
}
