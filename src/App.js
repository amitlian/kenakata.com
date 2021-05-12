import './App.css';
import Nav from '../src/Nav/Nav'
import Slider from '../src/Slider/Slider'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Product from '../src/Product/Product'

function App() {
  return (
    <div>
      <Nav/>
      <Product/>
    </div>
  );
}

export default App;
