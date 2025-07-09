import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreelancerProfile } from '../../../../core/models/freelancer-profile.model';

@Component({
  selector: 'app-freelancer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './freelancer-list.component.html',
  styleUrl: './freelancer-list.component.scss',
})
export class FreelancerListComponent {
  @Input() freelancers: FreelancerProfile[] = [];
  @Input() isLoading: boolean = false;
  @Output() freelancerClick = new EventEmitter<FreelancerProfile>();
  @Output() contactClick = new EventEmitter<FreelancerProfile>();

  onFreelancerClick(freelancer: FreelancerProfile): void {
    this.freelancerClick.emit(freelancer);
  }

  onContactClick(event: Event, freelancer: FreelancerProfile): void {
    event.stopPropagation();
    this.contactClick.emit(freelancer);
  }

  getAvailabilityClass(availability: string): string {
    switch (availability) {
      case 'Available':
        return 'available';
      case 'Busy':
        return 'busy';
      case 'Not Available':
        return 'not-available';
      default:
        return '';
    }
  }

  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < Math.floor(rating));
  }

  getExperienceLevel(years: number): string {
    if (years < 2) return 'Entry';
    if (years < 5) return 'Intermediate';
    return 'Expert';
  }

  /**
   * Get profile image source with fallback
   */
  getProfileImageSrc(freelancer: FreelancerProfile): string {
    if (freelancer.profileImage) {
      return freelancer.profileImage;
    }
    // Use a reliable default image or placeholder service
    return this.getDefaultAvatar();
  }

  /**
   * Handle image loading errors
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.getDefaultAvatar();
  }

  /**
   * Get default avatar - multiple fallback options
   */
  private getDefaultAvatar(): string {
    // Option 1: Try local asset first
    const localAvatar = 'assets/images/default-avatar.png';

    // Option 2: Use placeholder service as ultimate fallback
    const placeholderAvatar =
      'https://via.placeholder.com/150x150/e0e0e0/666666?text=User';

    // Option 3: Use generated avatar service
    const generatedAvatar =
      'https://ui-avatars.com/api/?name=User&background=4ecdc4&color=fff&size=150';

    return generatedAvatar; // Use generated avatar as most reliable option
  }
}
