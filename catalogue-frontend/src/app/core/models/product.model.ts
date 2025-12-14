export interface Product {
  id?: number;
  nom: string;
  description?: string;
  prix: number;
  stockQuantity: number;
  imageUrl?: string;
  disponible?: boolean;
  categoryName: string;
  categoryDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

