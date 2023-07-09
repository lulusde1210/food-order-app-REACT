import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import { CartProvider } from './store/card-context';

const App = () => {
  const [isCartOpen, setIsCardOpen] = useState(false);

  const cartOpenHandler = () => {
    setIsCardOpen(true)
  };

  const cartCloseHandler = () => {
    setIsCardOpen(false)
  };


  return (
    <CartProvider>
      {isCartOpen && <Cart onCloseCart={cartCloseHandler} />}
      <Header onOpenCart={cartOpenHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App