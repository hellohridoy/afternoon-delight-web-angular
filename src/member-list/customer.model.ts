// customer.model.ts
export interface Customer {
  id: number;
  username: string;
  phone: string;
  email: string;
  country: string;
  additionalInfo: any;
  cvUploadDownload: number;
  imageName: string;
  imageType: string;
  imageUploadDownload: number;
  cvName: string;
  cvType: string;
  imageData: any;
  cvData: any;
  createdAt: string;
}
