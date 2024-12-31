import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Page2 from './pages/Page2';
import PageContact from './pages/PageContact';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
}from "react-router-dom";


  
const router = createBrowserRouter([
{
    path: "/",
    element: <App/>,
},
{
    path: "/Page2",
    element: <Page2/>
},
{
    path: "/PageContact",
    element: <PageContact/>
},

]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
   <RouterProvider router={router}/> 
   /*<React.StrictMode>
   <App />
   </React.StrictMode>,*/
);