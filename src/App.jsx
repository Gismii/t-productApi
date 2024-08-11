import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import PrivateRoute from './hooks/PrivateRouter.jsx'; // Importe o componente PrivateRoute

import Login from './login/index.jsx';
import Register from './register/index.jsx';
import Home from './components/MyHome.jsx'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
        },
      },
    },
  },
});

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />
        </Routes>
      </Router>
    </CssVarsProvider>
  );
}

export default App;
