import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Move all the landing page content from main-layout here -->
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Project platform for freelancers</h1>
            <p class="hero-subtitle">
              More than 5,370 freelance projects are waiting for you right now
            </p>
            <div class="hero-search">
              <input
                type="text"
                placeholder="Search for projects..."
                class="search-input"
              />
              <button class="search-btn" routerLink="/projects">
                Search now
              </button>
            </div>
          </div>
          <div class="hero-image">
            <div class="hero-illustration">
              <div class="hero-graphic"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- All other sections from main-layout component -->
      <!-- Stats Section, Features Section, Services Section, etc. -->
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
