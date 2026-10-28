
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheckCircle,
  FiTarget,
  FiUsers,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';

export default function Home() {
  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            <FiZap /> One platform. Better collaborations.
          </span>

          <h1>
            Where brands and creators
            <span> grow together.</span>
          </h1>

          <p className="hero-description">
            CollabBridge brings businesses and content creators
            together to discover opportunities, launch campaigns,
            and build meaningful partnerships.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="btn-primary">
              Get started <FiArrowRight />
            </Link>

            <Link to="/register" className="btn-secondary">
              Explore campaigns
            </Link>
          </div>

          <div className="hero-note">
            <FiCheckCircle />
            A simpler way to find your next collaboration
          </div>
        </div>

        <div className="hero-visual">
          {/* Replace with your real dashboard screenshot */}
          <div className="dashboard-preview">
            <img
              src="/images/dashboard-preview.png"
              alt="CollabBridge dashboard preview"
            />
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="audience-section">
        <div className="section-heading">
          <span>BUILT FOR BOTH SIDES</span>
          <h2>One bridge. Two opportunities.</h2>
          <p>
            Whether you represent a brand or create content,
            your next opportunity starts here.
          </p>
        </div>

        <div className="audience-grid">
          <article className="audience-card">
            <div className="audience-icon">
              <FiTarget />
            </div>
            <h3>For businesses</h3>
            <p>
              Turn your marketing goals into campaigns and
              connect with creators who fit your brand.
            </p>
            <Link to="/register">
              Find the right creators <FiArrowRight />
            </Link>
          </article>

          <article className="audience-card">
            <div className="audience-icon">
              <FiUsers />
            </div>
            <h3>For creators</h3>
            <p>
              Discover brand opportunities, showcase your
              profile, and apply to campaigns that interest you.
            </p>
            <Link to="/register">
              Discover opportunities <FiArrowRight />
            </Link>
          </article>
        </div>
      </section>

      {/* How it works */}
      <section className="steps-section">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From discovery to collaboration.</h2>
          <p>Everything starts with finding the right match.</p>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <h3>Create your profile</h3>
            <p>
              Introduce your business or showcase your
              creator identity and audience.
            </p>
          </article>

          <article className="step-card">
            <span className="step-number">02</span>
            <h3>Discover opportunities</h3>
            <p>
              Businesses publish campaigns while creators
              explore relevant opportunities.
            </p>
          </article>

          <article className="step-card">
            <span className="step-number">03</span>
            <h3>Connect and grow</h3>
            <p>
              Send applications, review potential partners,
              and take the next step together.
            </p>
          </article>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div>
          <span>WHY COLLABBRIDGE?</span>
          <h2>Less searching. More meaningful connections.</h2>
        </div>

        <div className="benefit-item">
          <FiTarget />
          <div>
            <h3>Relevant opportunities</h3>
            <p>Find campaigns and creators aligned with your goals.</p>
          </div>
        </div>

        <div className="benefit-item">
          <FiTrendingUp />
          <div>
            <h3>Organized collaboration</h3>
            <p>Keep campaigns and applications in one place.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <h2>Your next great collaboration starts here.</h2>
        <p>
          Join CollabBridge and bring your next idea to life.
        </p>
        <Link to="/register" className="btn-primary">
          Join CollabBridge <FiArrowRight />
        </Link>
      </section>
    </main>
  );
}
