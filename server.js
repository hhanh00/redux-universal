import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import redis from 'redis'
import util from 'util'
import path from 'path'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as counterReducer } from './src/reducers/counter'
import Counter from './src/components/counter'

const app = express()
const redisClient = redis.createClient()
const rget = util.promisify(redisClient.get).bind(redisClient)
const rset = util.promisify(redisClient.set).bind(redisClient)

const port = 8000
const p = path.join(__dirname, './src/views')
console.log(p)
app.set('views', p)
app.set('view engine', 'ejs')
app.get('/', async (req, res) => {
  try {
    const c = await rget('counter') || '0'
    console.log(c)
    const reducers = combineReducers({
      counter: counterReducer,
    })
    const store = createStore(reducers, {counter: parseInt(c)})
    const react = ReactDOMServer.renderToString(
      <Provider store={store}>
          <Counter />
      </Provider>)
    const state = JSON.stringify(store.getState())
    res.render('index.ejs', {react, state})
  }
  catch (e) {
    console.error(e)
  }
})
app.post('/counter', async (req, res) => {
  try {
    const c = req.query.v
    console.log(c)
    await rset('counter', c)
    res.send()
  }
  catch (e) {
    console.error(e)
  }
})
app.use('/dist', express.static('dist'))

const server = app.listen(port, '0.0.0.0', (error: string) => {
  if (error) {
    console.log(error);
    return
  }
  console.log(`Listening at http://localhost:${port}`)
})
