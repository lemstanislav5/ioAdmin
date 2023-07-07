import React from 'react';
import Signin from './components/pages/authorization/Signin'
import Container from 'react-bootstrap/Container';
import TopMenu from './components/top/TopMenu'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
]);



function App() {
  return (
    <Container fluid>
      <TopMenu/>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Container>  
  );
}

export default App;
