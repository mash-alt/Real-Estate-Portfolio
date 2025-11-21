import { teamMembers } from '../data/mockData';
import '../styles/TeamSection.css';

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="container">
        <h2 className="section-title">Meet Your Agent</h2>
        <p className="section-subtitle">Your trusted real estate professional</p>
        
        <div className="team-grid">
          {teamMembers.slice(0, 1).map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image">
                <img 
                  src={member.image} 
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3>{member.name}</h3>
              <p className="team-position">{member.position}</p>
              <div className="team-contact">
                <a href={`mailto:${member.email}`}>📧 Email</a>
                <a href={`tel:${member.phone}`}>📞 Call</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
