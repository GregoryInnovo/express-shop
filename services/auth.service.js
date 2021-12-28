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
    return { user, token };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `https://my-front-end.com/recovery?token=${token}`;
    const response = await service.update(user.id, { recoveryPassword: token });

    const mail = {
      from: config.userEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recupera tu contraseña', // Subject line
      html: `<b>Ingresa a este link para =>${link} </b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(InfoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.userEmail,
        pass: config.passEmail,
      },
    });

    await transporter.sendMail(InfoMail);
    return { message: 'mail sent' };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryPassword !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryPassword: null, password: hash });
      return { message: 'password changed' };
    } catch (e) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
