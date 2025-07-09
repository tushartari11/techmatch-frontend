import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];
  @Input() isLoading: boolean = false;
  @Output() projectClick = new EventEmitter<Project>();

  onProjectClick(project: Project): void {
    this.projectClick.emit(project);
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  }

  getBudgetDisplay(budget: any): string {
    if (budget.min === budget.max) {
      return `${budget.currency} ${budget.min.toLocaleString()}`;
    }
    return `${
      budget.currency
    } ${budget.min.toLocaleString()} - ${budget.max.toLocaleString()}`;
  }
}
