const User = require('./user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('./../config/config');
const service = new User();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    res.json({
      user,
      token,
    });
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.userEmail,
        pass: config.passEmail,
      },
    });

    await transporter.sendMail({
      from: config.userEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello User!', // plain text body
      html: '<b>Hello User!</b>', // html body
    });
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
