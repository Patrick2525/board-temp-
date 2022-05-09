import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App1 from './App1';
import App3 from './App3'; 
import App4 from './App4'; 
import App5 from './App5'; 
import App6 from './App6';

class App extends Component {
    render() {
        return (
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App1/>}/> 
              <Route path="/App1" element={<App1/>}/>
              <Route path="/App3" element={<App3/>}/>
              <Route path="/App4" element={<App4/>}/>
              <Route path="/App5" element={<App5/>}/>
              <Route path="/App6" element={<App6/>}/>
            </Routes>
          </BrowserRouter>  
        );
    }
}

export default App;

