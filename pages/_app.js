import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {

  return (
    <CartProvider>
    <Navbar />
    <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
