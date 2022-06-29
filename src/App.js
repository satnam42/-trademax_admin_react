import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import Login from './pages/Login';
import { Navigate,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const routing = useRoutes(routes);
  const isLogin = localStorage.token;
  const navigate = useNavigate()

  useEffect(() => {

    !isLogin&& navigate("/login")
    
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

     {routing }
     
    </ThemeProvider>
  );
};

export default App;
