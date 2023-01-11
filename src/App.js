import { Route, Routes } from 'react-router-dom';
import './App.css';
import Books from './components/Books';
import Form from './components/Form';
// import CoronavirusIcon from '@mui/icons-material/Coronavirus';

function App() {
  return (
    <>
      {/* <CoronavirusIcon/> */}
      <div className="App">     
        <Routes>

          <Route path='/' element={<Books/>}/>
          <Route path='/form' element={<Form/>}/>
        </Routes>
        
      </div>
    </>
  );
}

export default App;
