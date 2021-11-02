const faker = require('faker');
const boom = require('@hapi/boom');
const data = require('../libs/data');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 14;
    for (let i = 1; i <= limit; i++) {
      // console.log("tamaño es", data.module.platos[0][`${i}`].nombre);
      this.products.push({
        id: data.module.platos[0][`${i}`].id,
        nombre: data.module.platos[0][`${i}`].nombre,
        precio: data.module.platos[0][`${i}`].precio,
        imagen: data.module.platos[0][`${i}`].imagen,
        descripcion: data.module.platos[0][`${i}`].descripcion,
      });
    }
  }

  async create(data) {
    // ... split operator
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(this.products);
      },5000)
    })
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if(!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
