const LoginRouter = require('./login.router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}
describe('Login Router', () => {
  test("should return 400 if email isn't provided", () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()

    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should CALL AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()

    const httpRequest = {
      body: {
        email: 'emannuel.matos@begrowth.co',
        password: '123password'
      }
    }

    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })
})
