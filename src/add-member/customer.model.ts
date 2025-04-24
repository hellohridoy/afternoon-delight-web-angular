// customer.model.ts
import {Country} from "./add-member.component";

export interface Customer {
  id?: number;
  username: string;
  phone: string;
  email: string;
  country: Country;
  additionalInfo?: Map<string, object>;
  imageName?: string;
  cvName?: string;
  createdAt?: Date;
}
