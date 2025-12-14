import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, BadgeModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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
}

