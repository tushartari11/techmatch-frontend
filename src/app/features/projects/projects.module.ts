import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Components
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectFiltersComponent } from './components/project-filters/project-filters.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

@NgModule({
  declarations: [
    ProjectCardComponent,
    ApplicationFormComponent,
    ProjectDetailsComponent,
    ProjectFiltersComponent,
    ProjectListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    ProjectCardComponent,
    ApplicationFormComponent,
    ProjectDetailsComponent,
    ProjectFiltersComponent,
    ProjectListComponent,
  ],
})
export class ProjectsModule {}
