import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Initialize any required data or subscriptions
  }

  onSearchProjects(searchTerm: string): void {
    // Handle project search
    console.log('Searching for:', searchTerm);
  }

  onNewsletterSubscribe(email: string): void {
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
  }

  onLearnMore(): void {
    // Handle learn more action
    console.log('Learn more clicked');
  }
}
