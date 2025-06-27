// import { Route, Routes } from "react-router-dom";
import { memo } from 'react';
import TopBar from "./common/TopBar";

const App = memo(() => {
  return (
   <>
   <TopBar/>
   </>
  );
});

App.displayName = 'App';

export default App;
