import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  word: string;
  translation: string;

  constructor(
    private _wS: WordService
  ) { }

  ngOnInit() {
  }

  setNewWord() {
    if (!this.word || !this.translation) {
      alert('Please enter both values');
      return;
    } else if (this.word.trim().length >= 2 && this.translation.trim().length >= 2) {
      this._wS.setNewWord(this.word, this.translation);
      console.log('saved - ' + this.word + ' / ' + this.translation);
      this.word = '';
      this.translation = '';
    } else {
      alert('Words must be at least 2 letters');
    }
  }

}
