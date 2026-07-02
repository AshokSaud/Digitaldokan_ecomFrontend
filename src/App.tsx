
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/user/Register'
import { Provider } from 'react-redux'
import store from './store/store'
import Login from './pages/user/login'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import SingleProduct from './pages/single-product/SingleProduct'
import MyCart from './pages/cart/my-cart'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Product />} />
          <Route path='/products/:id' element={<SingleProduct />} />
          <Route path='/my-cart' element={<MyCart />} />
        </Routes>
      </BrowserRouter>

    </Provider>
  )
}

export default App
