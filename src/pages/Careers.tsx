import { useState, useEffect } from 'react';
import '../styles/Careers.css';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null as File | null,
    coverLetter: '',
  });

  // Scroll fade-in animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedJob]); // Re-run when modal opens/closes

  const jobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Real Estate Agent',
      department: 'Sales',
      location: 'Cebu',
      type: 'Full-time',
      description: 'We are looking for motivated real estate agents to join our growing team. You will be responsible for helping clients buy, sell, and rent properties.',
      requirements: [
        'Licensed Real Estate Broker or Salesperson',
        'Excellent communication and negotiation skills',
        'Self-motivated and goal-oriented',
        'Knowledge of local real estate market',
        'Valid driver\'s license preferred',
      ],
      responsibilities: [
        'Generate and follow up on leads',
        'Show properties to prospective buyers/renters',
        'Negotiate deals and close sales',
        'Maintain client relationships',
        'Stay updated on market trends',
      ],
    },
    {
      id: '2',
      title: 'Property Manager',
      department: 'Operations',
      location: 'Bohol',
      type: 'Full-time',
      description: 'Seeking an experienced property manager to oversee our portfolio of properties and ensure tenant satisfaction.',
      requirements: [
        '2+ years experience in property management',
        'Strong organizational skills',
        'Knowledge of property maintenance',
        'Customer service oriented',
        'Proficient in property management software',
      ],
      responsibilities: [
        'Oversee property maintenance and repairs',
        'Handle tenant inquiries and concerns',
        'Coordinate with contractors and vendors',
        'Conduct property inspections',
        'Manage lease agreements',
      ],
    },
    {
      id: '3',
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Palawan',
      type: 'Full-time',
      description: 'Join our marketing team to create compelling campaigns that showcase our properties and attract potential clients.',
      requirements: [
        'Degree in Marketing or related field',
        'Experience with digital marketing',
        'Proficiency in social media platforms',
        'Creative and detail-oriented',
        'Photography/videography skills a plus',
      ],
      responsibilities: [
        'Develop marketing strategies',
        'Create property listings and advertisements',
        'Manage social media accounts',
        'Coordinate photo/video shoots',
        'Analyze marketing performance',
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your application, ${formData.name}! We will review your application and get back to you soon.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      resume: null,
      coverLetter: '',
    });
    setSelectedJob(null);
  };

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <h1>Join Our Team</h1>
        <p>Build Your Career in Real Estate With Us</p>
      </section>

      {/* Why Join Us Section */}
      <section className="why-join-section fade-in-element">
        <div className="container">
          <h2>Why Work With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card fade-in-element" style={{ transitionDelay: '0.1s' }}>
              <div className="benefit-icon">💼</div>
              <h3>Career Growth</h3>
              <p>Opportunities for advancement and professional development</p>
            </div>
            <div className="benefit-card fade-in-element" style={{ transitionDelay: '0.2s' }}>
              <div className="benefit-icon">💰</div>
              <h3>Competitive Pay</h3>
              <p>Attractive salary packages and commission structure</p>
            </div>
            <div className="benefit-card fade-in-element" style={{ transitionDelay: '0.3s' }}>
              <div className="benefit-icon">🏥</div>
              <h3>Benefits</h3>
              <p>Health insurance, paid leaves, and other perks</p>
            </div>
            <div className="benefit-card fade-in-element" style={{ transitionDelay: '0.4s' }}>
              <div className="benefit-icon">🤝</div>
              <h3>Great Culture</h3>
              <p>Work with a supportive and dynamic team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="positions-section fade-in-element">
        <div className="container">
          <h2>Open Positions</h2>
          <div className="positions-grid">
            {jobPositions.map((job, index) => (
              <div 
                key={job.id} 
                className="job-card fade-in-element"
                style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className="job-type">{job.type}</span>
                </div>
                <div className="job-meta">
                  <span className="job-department">📁 {job.department}</span>
                  <span className="job-location">📍 {job.location}</span>
                </div>
                <p className="job-description">{job.description}</p>
                <button 
                  className="view-details-btn"
                  onClick={() => setSelectedJob(job)}
                >
                  View Details & Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedJob(null)}>×</button>
            
            <div className="job-detail">
              <h2>{selectedJob.title}</h2>
              <div className="job-detail-meta">
                <span className="badge">{selectedJob.type}</span>
                <span className="badge">{selectedJob.department}</span>
                <span className="badge">{selectedJob.location}</span>
              </div>

              <div className="job-detail-section">
                <h3>Job Description</h3>
                <p>{selectedJob.description}</p>
              </div>

              <div className="job-detail-section">
                <h3>Requirements</h3>
                <ul>
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="job-detail-section">
                <h3>Responsibilities</h3>
                <ul>
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              {/* Application Form */}
              <div className="application-form-section">
                <h3>Apply Now</h3>
                <form onSubmit={handleSubmit} className="application-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="position">Position Applied For *</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={selectedJob.title}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="resume">Resume (PDF) *</label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="coverLetter">Cover Letter</label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={5}
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Tell us why you'd be a great fit..."
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-application-btn">
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Application Section */}
      <section className="general-application-section fade-in-element">
        <div className="container">
          <h2>Don't See Your Position?</h2>
          <p>We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.</p>
          <button className="general-apply-btn" onClick={() => {
            const generalJob: JobPosition = {
              id: 'general',
              title: 'General Application',
              department: 'Various',
              location: 'Multiple Locations',
              type: 'Full-time',
              description: 'Submit a general application to be considered for future openings.',
              requirements: [],
              responsibilities: [],
            };
            setSelectedJob(generalJob);
          }}>
            Submit General Application
          </button>
        </div>
      </section>
    </div>
  );
};

export default Careers;
