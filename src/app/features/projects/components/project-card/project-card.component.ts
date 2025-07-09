import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  template: `
    <div class="project-card" (click)="onClick()">
      <div class="card-header">
        <div class="project-info">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="company-name">{{ project.company }}</p>
        </div>
        <div class="project-meta">
          <span class="project-type" [class]="getTypeClass()">{{
            project.type
          }}</span>
          <span class="posted-date">{{ project.posted | date : 'MMM d' }}</span>
        </div>
      </div>

      <div class="card-body">
        <p class="project-description">{{ getDescription() }}</p>

        <div class="project-details">
          <div class="detail-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ project.location }}</span>
            <span class="remote-badge" *ngIf="project.remote">Remote</span>
          </div>

          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>{{ project.duration }}</span>
          </div>

          <div class="detail-item" *ngIf="project.budget">
            <i class="fas fa-dollar-sign"></i>
            <span>{{ project.budget }}</span>
          </div>

          <div class="detail-item">
            <i class="fas fa-user"></i>
            <span>{{ project.experience }}</span>
          </div>
        </div>

        <div class="skills-container">
          <span class="skill-tag" *ngFor="let skill of getDisplaySkills()">
            {{ skill }}
          </span>
          <span class="more-skills" *ngIf="project.skills.length > 5">
            +{{ project.skills.length - 5 }} more
          </span>
        </div>
      </div>

      <div class="card-footer">
        <span class="deadline">
          <i class="fas fa-calendar-alt"></i>
          Deadline: {{ project.deadline | date : 'MMM d, yyyy' }}
        </span>
        <button class="apply-button" (click)="onApplyClick($event)">
          Apply Now
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .project-card {
        background: white;
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #e0e0e0;
      }

      .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }

      .project-title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 4px;
        color: #333;
      }

      .company-name {
        color: #666;
        font-size: 1rem;
        margin: 0;
      }

      .project-meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 4px;
      }

      .project-type {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 500;
      }

      .project-type.full-time {
        background: #e3f2fd;
        color: #1976d2;
      }
      .project-type.part-time {
        background: #f3e5f5;
        color: #7b1fa2;
      }
      .project-type.contract {
        background: #e8f5e8;
        color: #388e3c;
      }
      .project-type.freelance {
        background: #fff3e0;
        color: #f57c00;
      }

      .posted-date {
        color: #666;
        font-size: 0.9rem;
      }

      .project-description {
        color: #555;
        line-height: 1.5;
        margin-bottom: 16px;
      }

      .project-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: #666;
      }

      .detail-item i {
        color: #007bff;
        width: 16px;
      }

      .remote-badge {
        background: #e8f5e8;
        color: #388e3c;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.8rem;
        margin-left: 8px;
      }

      .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .skill-tag {
        background: #f8f9fa;
        color: #495057;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        border: 1px solid #e9ecef;
      }

      .more-skills {
        color: #007bff;
        font-size: 0.8rem;
        font-weight: 500;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
        border-top: 1px solid #e0e0e0;
      }

      .deadline {
        color: #666;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .apply-button {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.3s ease;
      }

      .apply-button:hover {
        background: #0056b3;
      }

      @media (max-width: 768px) {
        .project-details {
          grid-template-columns: 1fr;
        }

        .card-footer {
          flex-direction: column;
          gap: 12px;
          align-items: stretch;
        }

        .apply-button {
          width: 100%;
        }
      }
    `,
  ],
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() apply = new EventEmitter<Project>();

  onClick(): void {
    // Navigation handled by parent component
  }

  onApplyClick(event: Event): void {
    event.stopPropagation();
    this.apply.emit(this.project);
  }

  getTypeClass(): string {
    return this.project.type.toLowerCase().replace(' ', '-');
  }

  getDescription(): string {
    return this.project.description.length > 200
      ? this.project.description.substring(0, 200) + '...'
      : this.project.description;
  }

  getDisplaySkills(): string[] {
    return this.project.skills.slice(0, 5);
  }
}
