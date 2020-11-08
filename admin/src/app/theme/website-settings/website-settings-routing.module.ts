import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FooterSectionComponent} from './footer-section/footer-section.component';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'what-we-do',
        loadChildren: './what-we-do/what-we-do.module#WhatWeDoModule'
    },
    {
        path: 'more-from-us',
        loadChildren: './more-from-us/more-from-us.module#MoreFromUsModule'
    },
    {
        path: 'footer-section',
        component: FooterSectionComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteSettingsRoutingModule { }
