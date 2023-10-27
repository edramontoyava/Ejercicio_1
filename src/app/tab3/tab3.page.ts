import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CarritoService } from '../services/carrito.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favoriteProducts: Product[] = [];
  quantityInput: number = 1;

  constructor(private carritoService: CarritoService,
              private interaction:InteractionService) {}

  ngOnInit() {
    this.favoriteProducts = this.carritoService.productosFavoritos;
  }

  getBadgeColor(productType: string): string {
    switch (productType) {
      case 'Abarrotes':
        return 'primary';
      case 'Frutas y verduras':
        return 'warning';
      case 'Farmacia':
        return 'danger';
      case 'Limpieza':
        return 'medium';
      default:
        return 'dark';
    }
  }

  addToCart(product: Product, quantityInput: any) {
    const quantity = parseInt(quantityInput.value, 10);
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        this.carritoService.agregarAlCarrito(product);
      }
      this.carritoService.cantidadElementosCarrito += quantity;
      this.interaction.presentToast(`Se agrego ${quantity} ${product.name}(s) al carrito`);
      quantityInput.value = "1";
    }
  }

  toggleFavorite(product: Product) {
    const index = this.carritoService.productosFavoritos.findIndex(
      (item) => item === product
    );
    if (index !== -1) {
      this.carritoService.productosFavoritos.splice(index, 1);
    }
  }
  
}
