import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      if (password !== passwordConfirmation) {
        setError('Passwords do not match.');
        return;
      }

      await register(name, email, password, passwordConfirmation);
      navigate('/books');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to register.');
    }
  };

  return (
    <section className="page auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" required />
          </label>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>
          <label>
            Confirm Password
            <input value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} type="password" required />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
