import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-spinner">
      <div class="spinner">
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
      </div>
      <p class="loading-text">Loading...</p>
    </div>
  `,
  styles: [
    `
      .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      .spinner {
        width: 40px;
        height: 40px;
        position: relative;
        margin-bottom: 1rem;
      }

      .spinner-blade {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #007bff;
        animation: spin 1.2s linear infinite;
      }

      .spinner-blade:nth-child(1) {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        animation-delay: 0s;
      }

      .spinner-blade:nth-child(2) {
        top: 6px;
        right: 6px;
        animation-delay: -0.1s;
      }

      .spinner-blade:nth-child(3) {
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        animation-delay: -0.2s;
      }

      .spinner-blade:nth-child(4) {
        bottom: 6px;
        right: 6px;
        animation-delay: -0.3s;
      }

      .spinner-blade:nth-child(5) {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        animation-delay: -0.4s;
      }

      .spinner-blade:nth-child(6) {
        bottom: 6px;
        left: 6px;
        animation-delay: -0.5s;
      }

      .spinner-blade:nth-child(7) {
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        animation-delay: -0.6s;
      }

      .spinner-blade:nth-child(8) {
        top: 6px;
        left: 6px;
        animation-delay: -0.7s;
      }

      .spinner-blade:nth-child(9) {
        top: 3px;
        left: 50%;
        transform: translateX(-50%);
        animation-delay: -0.8s;
      }

      .spinner-blade:nth-child(10) {
        top: 10px;
        right: 10px;
        animation-delay: -0.9s;
      }

      .spinner-blade:nth-child(11) {
        top: 50%;
        right: 3px;
        transform: translateY(-50%);
        animation-delay: -1s;
      }

      .spinner-blade:nth-child(12) {
        bottom: 10px;
        right: 10px;
        animation-delay: -1.1s;
      }

      @keyframes spin {
        0%,
        20%,
        80%,
        100% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }

      .loading-text {
        color: #666;
        font-size: 0.9rem;
        margin: 0;
      }
    `,
  ],
})
export class LoadingSpinnerComponent {}
