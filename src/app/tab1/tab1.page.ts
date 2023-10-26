import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CarritoService } from '../models/carrito.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public products: Product[] = [];
  selectedFilter: string = 'all';
  carrito: { nombre: string; precio: number; cantidad: number; precioTotal: number }[] = [];
  totalGeneral: number = 0;

  constructor(private carritoService: CarritoService,private alertController: AlertController) {
    this.products.push({
      name: "Coca-cola",
      photo: "https://picsum.photos/500/300?random=",
      price: 20,
      type: "Abarrotes",
      description: "Refresco de 600 ml"
    });
    this.products.push({
      name: "Zanahoria",
      photo: "https://picsum.photos/500/300?random=",
      price: 20,
      type: "Frutas y verduras",
      description: "$20 el kilo"
    });
    this.products.push({
      name: "Loratadina",
      photo: "https://picsum.photos/500/300?random=",
      price: 20,
      type: "Farmacia",
      description: "Para alergias"
    });
    this.products.push({
      name: "Pinol",
      photo: "https://picsum.photos/500/300?random=",
      price: 35,
      type: "Limpieza",
      description: "Limpiador"
    });
    this.products.push({
      name: "Sprite",
      photo: "https://picsum.photos/500/300?random=",
      price: 20,
      type: "Abarrotes",
      description: "Refresco de 600 ml"
    });
    this.products.push({
      name: "Manzanas",
      photo: "https://picsum.photos/500/300?random=",
      price: 30,
      type: "Frutas y verduras",
      description: "$30 el kilo"
    });
    this.products.push({
      name: "Aspirina",
      photo: "https://picsum.photos/500/300?random=",
      price: 10,
      type: "Farmacia",
      description: "Para dolores leves"
    });
    this.products.push({
      name: "Detergente",
      photo: "https://picsum.photos/500/300?random=",
      price: 40,
      type: "Limpieza",
      description: "Para ropa"
    });
    this.products.push({
      name: "Frijoles",
      photo: "https://picsum.photos/500/300?random=",
      price: 15,
      type: "Abarrotes",
      description: "Paquete de 1 kg"
    });
    this.products.push({
      name: "Naranjas",
      photo: "https://picsum.photos/500/300?random=",
      price: 25,
      type: "Frutas y verduras",
      description: "$25 el kilo"
    });
    this.products.push({
      name: "Ibuprofeno",
      photo: "https://picsum.photos/500/300?random=",
      price: 15,
      type: "Farmacia",
      description: "Para inflamaciones"
    });
    this.products.push({
      name: "Lavaplatos",
      photo: "https://picsum.photos/500/300?random=",
      price: 25,
      type: "Limpieza",
      description: "Para platos"
    });
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

  get filteredProducts() {
    if (this.selectedFilter === 'all') {
      return this.products;
    } else {
      return this.products.filter(product => product.type === this.selectedFilter);
    }
  }

  async addToCart(product: Product, quantityInput: any) {
    const quantity = parseInt(quantityInput.value, 10);

    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        this.carritoService.agregarAlCarrito(product);
      }

      this.carritoService.cantidadElementosCarrito += quantity;

      const alert = await this.alertController.create({
        header: 'Producto Agregado',
        message: `${product.name} se ha agregado al carrito (unidades: ${quantity}).`,
        buttons: ['OK']
      });

      await alert.present();

      quantityInput.value = "1";
    }
  }
}

