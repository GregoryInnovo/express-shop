const boom = require('@hapi/boom');
const faker = require('faker');

class OrdersService {
  constructor() {
    this.orders = [];
  }

  create(data) {
    // ... split operator
    // console.log("data es", data);
    const newOrder = {
      ...data,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  find() {
    return this.orders;
  }

  update(id, changes) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const product = this.orders[index];
    this.orders[index] = {
      ...product,
      ...changes,
    };
    return this.orders[index];
  }

  delete(id) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.orders.splice(index, 1);
    return { id };
  }
  /*

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

  async

  async  */
}

module.exports = OrdersService;
