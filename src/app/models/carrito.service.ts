import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: { nombre: string; precio: number; cantidad: number; precioTotal: number }[] = [];
  totalGeneral: number = 0;
  public cantidadElementosCarrito: number = 0;
  agregarAlCarrito(producto: Product) {
    const index = this.carrito.findIndex(item => item.nombre === producto.name);

    if (index !== -1) {
      this.carrito[index].cantidad++;
      this.carrito[index].precioTotal = this.carrito[index].cantidad * this.carrito[index].precio;
    } else {
      this.carrito.push({
        nombre: producto.name,
        precio: producto.price,
        cantidad: 1,
        precioTotal: producto.price
      });
    }

    this.actualizarTotalGeneral();
  }

  actualizarTotalGeneral() {
    this.totalGeneral = this.carrito.reduce((total, item) => total + item.precioTotal, 0);
  }
}
