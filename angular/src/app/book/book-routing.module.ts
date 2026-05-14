import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from './book.component';

import { CreatebookComponent } from './createbook/createbook.component';
import { EditbookComponent } from './editbook/editbook.component';
const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreatebookComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit/:id',
    component: EditbookComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}