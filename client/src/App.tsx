import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  // The router now defines the layout structure
  return <RouterProvider router={router} />;
}

export default App;
