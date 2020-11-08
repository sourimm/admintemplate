import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListHelpComponent} from './list-help/list-help.component';
import {CreateHelpComponent} from './create-help/create-help.component';
import {ListCategoriesComponent} from './list-categories/list-categories.component';

const routes: Routes = [
  {
    path: 'categories',
    component: ListCategoriesComponent,
    data: {
      title: 'Helps'
    }
  },
  {
    path: 'article/list',
    component: ListHelpComponent,
    data: {
      title: 'Articles'
    }
  },
  {
    path: 'article/add',
    component: CreateHelpComponent,
    data: {
      title: 'Add Article'
    }
  },
  {
    path: 'article/edit/:id',
    component: CreateHelpComponent,
    data: {
      title: 'Edit Article'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
