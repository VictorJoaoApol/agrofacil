import { Outlet } from 'react-router';
import Button from '../../components/ui/Button.jsx';

export default function Login() {
  return (
    <>
      <Outlet />

      <div className="auth-links">
        <Button variant="link" to="/login/recuperar-senha">Esqueci a senha</Button>
        <Button variant="link" to="/cadastro">Ainda não tenho conta</Button>
      </div>
    </>
  );
}