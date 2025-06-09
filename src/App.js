import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddCart from "./pages/AddCart";

 // ✅ Import AddCart

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CartProvider } from "./helpers/CartContext";

function App() {
  return (
    <div className="App">
      <CartProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/cart" exact component={AddCart} /> {/* ✅ Add this line */}
        </Switch>
        <Footer />
      </Router></CartProvider>
    </div>
  );
}

export default App;
