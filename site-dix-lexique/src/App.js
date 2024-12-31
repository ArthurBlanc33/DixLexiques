import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import PresentationProjet from './components/PresentationProjet/PresentationProjet';


function App() {

    return (
      <div className="App">
        <Header />
        <PresentationProjet />
        <Footer />
      </div>
    );
}
export default App;
