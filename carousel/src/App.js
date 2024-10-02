import './App.css';
import Carousel from './components/Carousel';
import { cardDetails } from './cardDetails';

function App() {
  return (
    <div className="App">
      <Carousel cardDetails={cardDetails}></Carousel>
    </div>
  );
}

export default App;
