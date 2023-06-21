import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  selectedCategory: number = 0;
  selectedDifficulty: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get<any>('https://opentdb.com/api_category.php').subscribe(
      (response) => {
        this.categories = response.trivia_categories;
        console.log(this.categories);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onCategoryChange(categoryId: number) {
    this.selectedCategory = categoryId;
    console.log(this.selectedCategory);
  }

  startGame() {
    const queryParams = {
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
    };
    this.router.navigate(['/game'], { queryParams });
  }
}
