import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AllWordsComponent } from './all-words/all-words.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-new', component: AddNewComponent },
  { path: 'all-words', component: AllWordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
