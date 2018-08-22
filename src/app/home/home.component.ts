import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordService } from '../word.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  time = 20;
  timerId: any;
  timerStopped: boolean;

  allWords: any;
  lastTwo = [];
  correctAnswer: string;

  constructor(
    private _wS: WordService
  ) { }

  ngOnInit() {
    this._wS.getAllWords().valueChanges()
    .subscribe(data => {
      console.log(data);
      if (data.length < 3) {
        alert('Please add more words, must be at least three');
      } else {
        this.allWords = data;
      }
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  getOneWord() {
    const randomIndex = Math.floor(Math.random() * this.allWords.length);
    if (this.lastTwo.includes(randomIndex)) {
      this.getOneWord();
      return;
    } else {
      if (this.lastTwo.length === 2) {
        this.lastTwo.shift();
        this.lastTwo.push(randomIndex);
      } else {
        this.lastTwo.push(randomIndex);
      }
      const answer = prompt('Translate: '+ this.allWords[randomIndex].word);
      if (answer.toLowerCase() == this.allWords[randomIndex].translation) {
        this.correctAnswer = 'correct';
      } else {
        this.correctAnswer = 'incorrect';
      }
      setTimeout(() => {
        this.correctAnswer = '';
      }, 5000);
    }
    console.log(this.lastTwo);
  }

  initTimer() {
    clearInterval(this.timerId);
    this.getOneWord();
    this.timerId = setInterval(() => {
      this.getOneWord();
    }, this.time*60000);
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.correctAnswer = '';
    this.timerStopped = true;
    setTimeout(() => {
      this.timerStopped = false;
    }, 5000);
  }

}
