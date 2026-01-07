import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebase-config';
import { ArrowLeft, Lock, Loader2, Shield, CheckCircle } from 'lucide-react';
import '../styles/AdminSettings.css';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      // Validate inputs
      if (newPassword.length < 6) {
        setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
        setLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match.' });
        setLoading(false);
        return;
      }

      const user = auth.currentUser;
      if (!user || !user.email) {
        setMessage({ type: 'error', text: 'No user is currently logged in.' });
        setLoading(false);
        return;
      }

      // Reauthenticate user before changing password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setMessage({ type: 'error', text: 'Current password is incorrect.' });
      } else if (error.code === 'auth/weak-password') {
        setMessage({ type: 'error', text: 'New password is too weak.' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update password. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-settings">
      <div className="settings-container">
        <div className="settings-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1>
            <Shield size={32} />
            Admin Settings
          </h1>
          <p>Manage your admin account settings</p>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <div className="section-header">
              <Lock size={24} />
              <h2>Change Password</h2>
            </div>
            <p className="section-description">
              Update your admin account password to keep your account secure.
            </p>

            <form onSubmit={handlePasswordChange} className="password-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 characters)"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              {message && (
                <div className={`message ${message.type}`}>
                  {message.type === 'success' ? (
                    <CheckCircle size={18} />
                  ) : (
                    <Lock size={18} />
                  )}
                  {message.text}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    Updating Password...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
