import './App.css';
import Header from './header/header';
import AjaxApi from './aJaxApiPokemon/AjaxApi'


function App() {
  return (
    <div className="App">
      <Header/>
      <AjaxApi/>
    </div>
  );
}

export default App;
