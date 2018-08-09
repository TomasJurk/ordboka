import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service';

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.scss']
})
export class AllWordsComponent implements OnInit {

  allWords: any;

  constructor(
    private _wS: WordService
  ) { }

  ngOnInit() {
    this.getAllWords();
  }

  getAllWords() {
    this._wS.getAllWords().snapshotChanges()
    .subscribe(data => {
      this.allWords = data.map(da => {
        return {
          id: da.payload.doc.id,
          wordObj: da.payload.doc.data()
        }
      });
    });
  }

  updateWord(id, word, translation) {
    this._wS.updateWord(id, word, translation);
    this.getAllWords();
  }

  deleteWord(id) {
    this._wS.deleteWord(id);
    this.getAllWords();
  }
}
