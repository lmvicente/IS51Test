import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ITest {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<any> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.tests = await this.testScores();
  }

  async testScores() {
    let tests = JSON.parse(localStorage.getItem('tests'));
    if (tests && tests.length > 0) {
    } else {
      tests = await this.loadJSON();
    }
    console.log('tests ... ', this.tests);
    this.tests = tests;
    return tests;
  }

  async loadJSON() {
    const tests = await this.http.get('assets/tests.json').toPromise();
    return tests.json();
  }

  deleteItem(index: number) {
    this.tests.splice(index, 1);
  }

  addTest() {
    const test: ITest = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    }
    this.tests.unshift(test);
    this.saveToLocalStorage();

  }
  saveToLocalStorage() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
  }

  saveItems() {
    this.saveToLocalStorage();
  }

  computeGrade(i = 0) {
// not finished, just placeholders
    return {
      testName: "Vicente, Leah",
      totalPossible: "450",
      totalReceived: "350",
      totalPercentage: (350/450) * 100 + "%",
      finalGrade: "C"
    };
  }

  computedScore() {
    const data =  this.computeGrade();
    this.router.navigate(['home', data]);
  }
}

