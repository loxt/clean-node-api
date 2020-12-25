const LoginRouter = require('./login.router')
const MissingParamError = require('../helpers/missing-param-error')

describe('Login Router', () => {
  test("should return 400 if email isn't provided", () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: '123password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test("should return 400 if password isn't provided", () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'emannuel.matos@begrowth.co'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test("should return 500 if httpRequest isn't provided", () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return 500 if httpRequest has no body', () => {
    const sut = new LoginRouter()

    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
})
