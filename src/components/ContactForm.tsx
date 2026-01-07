import { useState } from 'react';
import '../styles/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    country: '',
    project: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const countries = [
    'Philippines',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Singapore',
    'Japan',
    'South Korea',
    'China',
    'Malaysia',
    'Other',
  ];

  const projectTypes = ['Condominium', 'House and Lot', 'Rental', 'General Inquiry'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.contactNumber) {
      setSubmitMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
      return;
    }

    // Create email body
    const emailBody = `
New Contact Form Submission

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Contact Number: ${formData.contactNumber}
Country: ${formData.country || 'Not specified'}
Project Interest: ${formData.project || 'Not specified'}

Message:
${formData.message || 'No message provided'}
    `.trim();

    const emailSubject = `New Inquiry from ${formData.firstName} ${formData.lastName}`;
    const recipientEmail = 'kyleenzocatarig@gmail.com';

    // Create mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    try {
      // Open email client
      window.location.href = mailtoLink;
      
      setIsSubmitting(false);
      setSubmitMessage('Opening your email client... Please send the email to complete your inquiry.');
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          contactNumber: '',
          country: '',
          project: '',
          message: '',
        });
        setSubmitMessage('');
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitMessage('There was an error. Please email us directly at kyleenzocatarig@gmail.com');
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        <h2 className="contact-form-title">Connect With Us Now</h2>
        <p className="contact-form-subtitle">
          Fill out the form below and we'll get back to you as soon as possible
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">
                Contact Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">
                Which country do you reside in? <span className="required">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">– Please select –</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="project">
                Which project are you interested in? <span className="required">*</span>
              </label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">– Please select –</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">
              Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {submitMessage && (
            <div className="submit-message success">{submitMessage}</div>
          )}

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {/* Social Media Contact Options */}
        <div className="social-contact-section">
          <p className="social-contact-text">Or reach us directly on:</p>
          <div className="social-icons">
            <a 
              href="https://www.messenger.com/t/61565177813080" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon messenger"
              aria-label="Contact us on Messenger"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.446 5.51 3.707 7.206V22l3.426-1.88c.914.252 1.882.387 2.867.387 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm.993 12.535l-2.558-2.73-4.991 2.73 5.488-5.822 2.624 2.73 4.924-2.73-5.487 5.822z"/>
              </svg>
            </a>
            
            <a 
              href="https://wa.me/639277297317" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon whatsapp"
              aria-label="Contact us on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.facebook.com/share/1E5HWhkGqe/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon facebook"
              aria-label="Follow us on Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
