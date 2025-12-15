import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { AppState } from '../../store/app.state';
import * as CartSelectors from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, BadgeModule, ButtonModule, TooltipModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartItemCount$: Observable<number>;

  menuItems: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Produits',
      icon: 'pi pi-shopping-bag',
      routerLink: '/products'
    },
    {
      label: 'Catégories',
      icon: 'pi pi-tags',
      items: [
        { label: 'Électronique', routerLink: '/products' },
        { label: 'Vêtements', routerLink: '/products' },
        { label: 'Livres', routerLink: '/products' },
        { label: 'Jouets', routerLink: '/products' }
      ]
    },
    {
      label: 'Commandes',
      icon: 'pi pi-list',
      routerLink: '/orders'
    }
  ];

  constructor(private store: Store<AppState>) {
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartTotalItems);
  }
}

