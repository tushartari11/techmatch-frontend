import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="pagination-container" *ngIf="totalPages > 1">
      <div class="pagination-info">
        <span>
          Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} results
        </span>
      </div>

      <nav class="pagination-nav">
        <ul class="pagination">
          <!-- Previous button -->
          <li class="page-item" [class.disabled]="currentPage === 0">
            <button
              class="page-link"
              (click)="onPageChange(currentPage - 1)"
              [disabled]="currentPage === 0"
              aria-label="Previous"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
          </li>

          <!-- First page -->
          <li
            class="page-item"
            [class.active]="currentPage === 0"
            *ngIf="showFirstPage"
          >
            <button class="page-link" (click)="onPageChange(0)">1</button>
          </li>

          <!-- First ellipsis -->
          <li class="page-item disabled" *ngIf="showFirstEllipsis">
            <span class="page-link">...</span>
          </li>

          <!-- Page numbers -->
          <li
            class="page-item"
            [class.active]="page === currentPage"
            *ngFor="let page of visiblePages"
          >
            <button class="page-link" (click)="onPageChange(page)">
              {{ page + 1 }}
            </button>
          </li>

          <!-- Last ellipsis -->
          <li class="page-item disabled" *ngIf="showLastEllipsis">
            <span class="page-link">...</span>
          </li>

          <!-- Last page -->
          <li
            class="page-item"
            [class.active]="currentPage === totalPages - 1"
            *ngIf="showLastPage"
          >
            <button class="page-link" (click)="onPageChange(totalPages - 1)">
              {{ totalPages }}
            </button>
          </li>

          <!-- Next button -->
          <li
            class="page-item"
            [class.disabled]="currentPage === totalPages - 1"
          >
            <button
              class="page-link"
              (click)="onPageChange(currentPage + 1)"
              [disabled]="currentPage === totalPages - 1"
              aria-label="Next"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [
    `
      .pagination-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 2rem 0;
        padding: 1rem 0;
        border-top: 1px solid #e9ecef;
      }

      .pagination-info {
        color: #666;
        font-size: 0.9rem;
      }

      .pagination {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 4px;
      }

      .page-item {
        display: flex;
      }

      .page-link {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        margin: 0;
        border: 1px solid #dee2e6;
        background: white;
        color: #007bff;
        text-decoration: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        min-width: 40px;
      }

      .page-link:hover:not(:disabled) {
        background: #e9ecef;
        border-color: #adb5bd;
      }

      .page-link:disabled {
        color: #6c757d;
        cursor: not-allowed;
        background: #f8f9fa;
        border-color: #dee2e6;
      }

      .page-item.active .page-link {
        background: #007bff;
        color: white;
        border-color: #007bff;
      }

      .page-item.active .page-link:hover {
        background: #0056b3;
        border-color: #0056b3;
      }

      .page-item.disabled .page-link {
        color: #6c757d;
        cursor: not-allowed;
        background: transparent;
        border-color: transparent;
      }

      .fas {
        font-size: 0.8rem;
      }

      @media (max-width: 768px) {
        .pagination-container {
          flex-direction: column;
          gap: 1rem;
        }

        .pagination-info {
          order: 2;
        }

        .pagination-nav {
          order: 1;
        }
      }

      @media (max-width: 480px) {
        .page-link {
          padding: 6px 8px;
          min-width: 32px;
          font-size: 0.8rem;
        }
      }
    `,
  ],
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChanged = new EventEmitter<number>();

  private readonly maxVisiblePages = 5;

  get startItem(): number {
    return this.currentPage * this.pageSize + 1;
  }

  get endItem(): number {
    const end = (this.currentPage + 1) * this.pageSize;
    return Math.min(end, this.totalItems);
  }

  get visiblePages(): number[] {
    const delta = Math.floor(this.maxVisiblePages / 2);
    let start = Math.max(0, this.currentPage - delta);
    let end = Math.min(this.totalPages - 1, this.currentPage + delta);

    // Adjust start if we're near the end
    if (end - start < this.maxVisiblePages - 1) {
      start = Math.max(0, end - this.maxVisiblePages + 1);
    }

    // Adjust end if we're near the beginning
    if (end - start < this.maxVisiblePages - 1) {
      end = Math.min(this.totalPages - 1, start + this.maxVisiblePages - 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  get showFirstPage(): boolean {
    return this.visiblePages.length > 0 && this.visiblePages[0] > 0;
  }

  get showLastPage(): boolean {
    return (
      this.visiblePages.length > 0 &&
      this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1
    );
  }

  get showFirstEllipsis(): boolean {
    return this.visiblePages.length > 0 && this.visiblePages[0] > 1;
  }

  get showLastEllipsis(): boolean {
    return (
      this.visiblePages.length > 0 &&
      this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 2
    );
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }
}
