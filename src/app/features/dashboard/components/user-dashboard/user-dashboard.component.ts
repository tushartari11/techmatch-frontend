import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your project management dashboard</p>
      </div>

      <div class="dashboard-content">
        <div class="dashboard-cards">
          <div class="dashboard-card">
            <h3>Projects</h3>
            <p>Manage and browse available projects</p>
            <a routerLink="/projects" class="card-link">View Projects</a>
          </div>

          <div class="dashboard-card">
            <h3>Freelancers</h3>
            <p>Find talented freelancers for your projects</p>
            <a routerLink="/freelancers" class="card-link">View Freelancers</a>
          </div>

          <div class="dashboard-card">
            <h3>Create Profile</h3>
            <p>Create your freelancer profile</p>
            <a routerLink="/create-profile" class="card-link">Create Profile</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .dashboard-header {
        text-align: center;
        margin-bottom: 3rem;

        h1 {
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        p {
          color: #6c757d;
          font-size: 1.2rem;
        }
      }

      .dashboard-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .dashboard-card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        p {
          color: #6c757d;
          margin-bottom: 1.5rem;
        }

        .card-link {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #4ecdc4;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;

          &:hover {
            background: #3db8b0;
            transform: translateY(-2px);
          }
        }
      }
    `,
  ],
})
export class UserDashboardComponent {
  constructor() {}
}
