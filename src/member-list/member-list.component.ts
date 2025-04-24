// member-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {MemberListService} from "./member-list.service";
import {SafeUrl} from "@angular/platform-browser";
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080' // Your backend URL
};
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private customerService: MemberListService,    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.members = data,
      error: (err) => console.error('Error loading members:', err)
    });
  }

  downloadImage(customerId: number, fileName: string): void {
    this.customerService.downloadImage(customerId).subscribe(blob => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  downloadCv(customerId: number, fileName: string): void {
    this.customerService.downloadCv(customerId).subscribe(blob => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  imagePreviews: { [key: number]: SafeUrl } = {};

  loadImagePreview(member: any): void {
    if (!member.id || this.imagePreviews[member.id]) return;

    this.customerService.getImage(member.id).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      this.imagePreviews[member.id] = this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }

  downloadCV(member: any): void {
    const downloadUrl = `${environment.apiBaseUrl}/download/cv/${member.cvUploadDownload}`;
    window.open(downloadUrl, '_blank');
  }
  // Generate image URL with debug logging
  getImageDownloadUrl(member: any): SafeUrl {
    if (!member?.imageName) {
      return '';
    }

    const url = `http://localhost:8080/download/${member.imageName}`;
    console.log('Generated image URL:', url); // Debug logging

    // Use sanitizer for safety if needed
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // Handle image loading errors
  handleImageError(event: Event) {
    console.warn('Error loading profile image', event);
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
