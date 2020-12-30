import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomElementsModule } from '../shared/custom-elements/custom-elements.module';
import { UserFormComponent } from './user-form.component';
import { UserFormRoutingModule } from './user-form-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    UserFormRoutingModule,
    FormsModule,
    CustomElementsModule
  ]
})
export class UserFormModule { }
