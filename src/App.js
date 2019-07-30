import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userAB')) || {})

  return (
    <BrowserRouter>
      <Routes user={user} setUser={setUser}/>
    </BrowserRouter>
  );
}

export default App;
