import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Button
      variant="soft"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [taxNumber, setTaxNumber] = React.useState('');
  const [password, setPassword] = React.useState('');

  
  const handleLogin = async () => {
    const options = {
      method: 'POST',
      url: 'https://interview.t-alpha.com.br/api/auth/login',
      headers: {'Content-Type': 'application/json'},
      data: { taxNumber, password }
    };
  
    try {
      const response = await axios.request(options);
      const token = response.data.data.token; // Acesse o token aqui
  
      console.log('Token recebido:', token);
      localStorage.setItem('token', token); // Armazene o token no localStorage
      console.log('Token armazenado:', localStorage.getItem('token'));
      
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  return (
    <main>
      <ModeToggle />
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 20,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>T-Alpha</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>CPF/CNPJ</FormLabel>
          <Input
            name="taxNumber"
            type="text"
            placeholder="12345678900"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button sx={{ mt: 1 }} onClick={handleLogin}>Log in</Button>
        <Typography
          endDecorator={<Link href="/register">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
  );
}
 