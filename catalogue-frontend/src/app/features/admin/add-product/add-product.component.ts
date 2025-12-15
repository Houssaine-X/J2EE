import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      prix: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      categoryName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Add default placeholder image
      const newProduct: Omit<Product, 'id'> = {
        ...this.productForm.value,
        imageUrl: 'https://via.placeholder.com/300x300?text=Product+Image',
        disponible: true
      };

      this.productService.addProduct(newProduct).subscribe({
        next: (product) => {
          this.successMessage = 'Product added successfully!';
          this.isSubmitting = false;
          this.productForm.reset();

          // Redirect to products list after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Failed to add product. Please try again.';
          this.isSubmitting = false;
          console.error('Error adding product:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}

