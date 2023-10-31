import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { buys } from '../models/shopping.model';
import { ProductSold } from '../models/shopping.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  constructor() {}
  carrito: { nombre: string; precio: number; cantidad: number; precioTotal: number; foto: string }[] = [];
  totalGeneral: number = 0;
  public cantidadElementosCarrito: number = 0;
  productosFavoritos: Product[] = [];
  comprasRealizadas: buys[] = [];

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
        precioTotal: producto.price,
        foto: producto.photo
      });
    }
    this.cantidadElementosCarrito+1;
    this.actualizarTotalGeneral();
  }

  cambiarCantidad(producto: { nombre: string; precio: number; cantidad: number; precioTotal: number; foto: string }, nuevaCantidad: number) {
    if (nuevaCantidad >= 1) {
      producto.cantidad = nuevaCantidad;
      producto.precioTotal = nuevaCantidad * producto.precio;
      this.actualizarTotalGeneral();
    }
    this.actualizarCantidadElementosCarrito()
  }
  
  eliminarDelCarrito(nombreProducto: string) {
    const index = this.carrito.findIndex(item => item.nombre === nombreProducto);
    if (index !== -1) {
      this.cantidadElementosCarrito -= this.carrito[index].cantidad;
      this.carrito.splice(index, 1);
      this.actualizarTotalGeneral();
    }
  }

  actualizarTotalGeneral() {
    this.totalGeneral = this.carrito.reduce((total, item) => total + item.precioTotal, 0);
  }

  actualizarCantidadElementosCarrito() {
    this.cantidadElementosCarrito = this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }

  agregarCompra(fechaHora: string, productos: ProductSold[], total: number) {
    const compra: buys = {
      datehour: fechaHora,
      products: productos,
      total: total
    };
    this.comprasRealizadas.push(compra);
    this.cantidadElementosCarrito=0;
  }
  obtenerCompras(): buys[] {
    return this.comprasRealizadas;
  }
}
