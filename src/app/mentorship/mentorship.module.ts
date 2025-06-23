import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MentorshipPageRoutingModule } from './mentorship-routing.module';
import { MentorshipPage } from './mentorship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentorshipPageRoutingModule
  ],
  declarations: [MentorshipPage]
})
export class MentorshipPageModule {}
