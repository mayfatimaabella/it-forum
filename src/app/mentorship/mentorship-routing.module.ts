import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorshipPage } from './mentorship.page';

const routes: Routes = [
  {
    path: '',
    component: MentorshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorshipPageRoutingModule {}
