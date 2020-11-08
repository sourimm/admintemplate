import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'brain-breaks',
        loadChildren: './brain-breaks/brain-breaks.module#BrainBreaksModule'
    },
    {
        path: 'guided-breathing',
        loadChildren: './guided-breathing/guided-breathing.module#GuidedBreathingModule'
    },
    {
        path: 'guided-visualizations',
        loadChildren: './guided-visualizations/guided-visualizations.module#GuidedVisualizationsModule'
    },
    {
        path: 'mindful-exercises',
        loadChildren: './mindful-exercises/mindful-exercises.module#MindfulExercisesModule'
    },
    {
        path: 'printable-resources',
        loadChildren: './printable-resources/printable-resources.module#PrintableResourcesModule'
    },
    {
        path: 'printable-resources-categories',
        loadChildren: './printable-resources-categories/printable-resources-categories.module#PrintableResourcesCategoriesModule'
    },
    {
        path: 'relaxation-stories',
        loadChildren: './relaxation-stories/relaxation-stories.module#RelaxationStoriesModule'
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomResourcesRoutingModule { }
