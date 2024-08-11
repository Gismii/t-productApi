// register/index.js
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [taxNumber, setTaxNumber] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = async () => {
    const options = {
      method: 'POST',
      url: 'https://interview.t-alpha.com.br/api/auth/register',
      headers: {'Content-Type': 'application/json'},
      data: {
        name,
        taxNumber,
        mail,
        phone,
        password
      }
    };

    try {
      const { data } = await axios.request(options);
      console.log('User registered:', data);
      navigate('/ ');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 350,
          mx: 'auto',
          my: 15,
          py: 1,
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
            <b>Create an Account</b>
          </Typography>
          <Typography level="body-sm">Sign up to get started.</Typography>
        </div>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="João da Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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
          <FormLabel>Email</FormLabel>
          <Input
            name="mail"
            type="email"
            placeholder="joao@gmail.com"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            type="text"
            placeholder="11999999999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
        <Button sx={{ mt: 1 }} onClick={handleRegister}>Sign up</Button>
      </Sheet>
    </main>
  );
}
