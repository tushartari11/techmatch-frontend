import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  template: `
    <div class="file-upload-container">
      <div
        class="upload-area"
        [class.dragover]="isDragOver"
        (drop)="onDrop($event)"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (click)="fileInput.click()"
      >
        <input
          type="file"
          #fileInput
          (change)="onFileSelected($event)"
          [accept]="accept"
          style="display: none"
        />

        <div class="upload-content" *ngIf="!selectedFile">
          <i class="fas fa-cloud-upload-alt upload-icon"></i>
          <p>
            Drag & drop your CV here or <span class="browse-text">browse</span>
          </p>
          <small>PDF, DOC, DOCX up to 5MB</small>
        </div>

        <div class="file-info" *ngIf="selectedFile">
          <i class="fas fa-file-alt"></i>
          <span class="file-name">{{ selectedFileName }}</span>
          <button
            type="button"
            class="remove-button"
            (click)="removeFile($event)"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div class="upload-progress" *ngIf="uploadProgress > 0">
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="uploadProgress"></div>
        </div>
        <span class="progress-text">{{ uploadProgress }}%</span>
      </div>

      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      .file-upload-container {
        width: 100%;
      }

      .upload-area {
        border: 2px dashed #ccc;
        border-radius: 8px;
        padding: 24px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }

      .upload-area:hover,
      .upload-area.dragover {
        border-color: #007bff;
        background-color: #f8f9fa;
      }

      .upload-icon {
        font-size: 48px;
        color: #ccc;
        margin-bottom: 16px;
      }

      .browse-text {
        color: #007bff;
        font-weight: 500;
        text-decoration: underline;
      }

      .file-info {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 4px;
        border: 1px solid #dee2e6;
      }

      .file-info i {
        color: #007bff;
      }

      .file-name {
        flex: 1;
        text-align: left;
      }

      .remove-button {
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
      }

      .remove-button:hover {
        background: #c82333;
      }

      .upload-progress {
        margin-top: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .progress-bar {
        flex: 1;
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: #007bff;
        transition: width 0.3s ease;
      }

      .progress-text {
        font-size: 0.875rem;
        color: #666;
      }

      .error-message {
        color: #dc3545;
        font-size: 14px;
        margin-top: 8px;
      }
    `,
  ],
})
export class FileUploadComponent {
  @Input() accept: string = '.pdf,.doc,.docx';
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileRemoved = new EventEmitter<void>();

  selectedFile: File | null = null;
  selectedFileName: string = '';
  isDragOver: boolean = false;
  uploadProgress: number = 0;
  errorMessage: string = '';

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  private processFile(file: File): void {
    const validation = this.validateFile(file);

    if (!validation.valid) {
      this.errorMessage = validation.message ?? 'Invalid file';
      return;
    }

    this.selectedFile = file;
    this.selectedFileName = file.name;
    this.errorMessage = '';
    this.fileSelected.emit(file);
  }

  private validateFile(file: File): { valid: boolean; message?: string } {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (file.size > maxSize) {
      return { valid: false, message: 'File size must be less than 5MB' };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: 'Only PDF, DOC, and DOCX files are allowed',
      };
    }

    return { valid: true };
  }

  removeFile(event: Event): void {
    event.stopPropagation();
    this.selectedFile = null;
    this.selectedFileName = '';
    this.uploadProgress = 0;
    this.errorMessage = '';
    this.fileRemoved.emit();
  }
}
