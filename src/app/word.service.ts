import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class WordService {

  constructor(
    private afs: AngularFirestore
  ) { }

  setNewWord(word, translation) {
    return this.afs.collection('Words').add({
      'created': new Date().getTime(),
      'word': word,
      'translation': translation
    });
  }

  getAllWords() {
    return this.afs.collection('Words', ref => ref.orderBy('created', 'desc'));
  }

  updateWord(id, word, translation) {
    return this.afs.doc<any>(`Words/${id}`).update({'word': word, 'translation': translation});
  }

  deleteWord(id) {
    return this.afs.doc<any>(`Words/${id}`).delete();
  }

}