const express = require('express')
const router = express.Router()

module.exports = () => {
  router.post('/signup', ExpressRouterAdapter.adapt(new SignUpRouter()))
}

class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpResponse = await router.route({
        body: req.body
      })
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// Presentation Layer - Expose to client

class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body

    const user = new SignUpUseCase().signUp(email, password, repeatPassword)

    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain - Business Rules

class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAcountRepository().add(email, password)
    }
  }
}

// Infra - Access Database

const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAcountRepository {
  async add (email, password, repeatPassword) {
    return AccountModel.create({ email, password })
  }
}
