const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const data = require('../libs/data');

const { models } = require('./../libs/sequelize');

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
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

<<<<<<< HEAD
  async find() {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() =>{
    //     resolve(this.products);
    //   },5000)
    // })
    return this.products;
=======
  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, price, offset, price_min, price_max } = query;
    // verify if limit and offset exist
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price) {
      options.where.price = price;
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
>>>>>>> backend-postgres
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
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
