import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    passwordConfirmation: '',
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setSaving(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
      };

      if (form.password) {
        payload.password = form.password;
        payload.password_confirmation = form.passwordConfirmation;
      }

      await updateProfile(payload);
      setMessage('Profile updated successfully.');
      setForm((prev) => ({ ...prev, password: '', passwordConfirmation: '' }));
    } catch (err) {
      const responseData = err.response?.data;
      if (responseData?.errors) {
        setError(Object.values(responseData.errors).flat().join(' '));
      } else if (responseData?.message) {
        setError(responseData.message);
      } else {
        setError('Unable to update profile.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page profile-page">
      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>Update your name, email, or password in one place.</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h2>Account Details</h2>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="profile-form">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleInput} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleInput} required />
            </label>
            <label>
              New Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleInput}
                placeholder="Leave blank to keep current password"
              />
            </label>
            <label>
              Confirm New Password
              <input
                name="passwordConfirmation"
                type="password"
                value={form.passwordConfirmation}
                onChange={handleInput}
                placeholder="Confirm new password"
              />
            </label>
            <button type="submit" className="button" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
