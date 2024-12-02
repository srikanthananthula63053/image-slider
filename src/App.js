import logo from './logo.svg';
import './App.css';
import ImageSlider from './components/image-slider';

function App() {
  return (
    <div className="App">

      <ImageSlider url={"https://picsum.photos/v2/list"} limit={"10"} page={"1"} />
    </div>
  );
}

export default App;
