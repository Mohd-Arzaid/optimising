// import { Route, Routes } from "react-router-dom";
import { memo } from 'react';
import TopBar from "./common/TopBar";
import Navbar from './common/Navbar';

const App = memo(() => {
  return (
   <>
   <TopBar/>
   <Navbar/>
   </>
  );
});

App.displayName = 'App';

export default App;
