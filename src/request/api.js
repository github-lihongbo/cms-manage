import request from './request'

export const xxApi = () => request.get('/xx')

export const RegisterApi = (params) => request.post('/register', params)

export const LoginApi = (params) => request.post('login', params)

export const ArticleApi = (params) => request.get('article', {params})