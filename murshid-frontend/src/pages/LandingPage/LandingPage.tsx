import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  Calculator,
  GraduationCap,
  Languages,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { t } from "../../i18n/dictionary";
import "./LandingPage.css";

export default function LandingPage() {
  const { language, toggleLanguage } = useLanguage();
  const isAr = language === "ar";

  const features = [
    {
      icon: <GraduationCap size={26} />,
      title: t(language, "featurePlanTitle"),
      text: t(language, "featurePlanText"),
    },
    {
      icon: <BookOpenCheck size={26} />,
      title: t(language, "featureCoursesTitle"),
      text: t(language, "featureCoursesText"),
    },
    {
      icon: <Calculator size={26} />,
      title: t(language, "featureGpaTitle"),
      text: t(language, "featureGpaText"),
    },
    {
      icon: <Brain size={26} />,
      title: t(language, "featureRulesTitle"),
      text: t(language, "featureRulesText"),
    },
  ];

  const steps = [
    {
      number: "01",
      title: t(language, "stepOneTitle"),
      text: t(language, "stepOneText"),
    },
    {
      number: "02",
      title: t(language, "stepTwoTitle"),
      text: t(language, "stepTwoText"),
    },
    {
      number: "03",
      title: t(language, "stepThreeTitle"),
      text: t(language, "stepThreeText"),
    },
  ];

  return (
    <main className="landing-page">
      <div className="landing-bg">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="orb orb-three" />
      </div>

      <nav className="landing-navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <strong>{t(language, "appName")}</strong>
            <span>{t(language, "appSubtitle")}</span>
          </div>
        </Link>

        <div className="nav-links">
          <a href="#home">{t(language, "navHome")}</a>
          <a href="#features">{t(language, "navFeatures")}</a>
          <a href="#how">{t(language, "navHow")}</a>
        </div>

        <div className="nav-actions">
          <button className="language-btn" onClick={toggleLanguage}>
            <Languages size={18} />
            {t(language, "switchLang")}
          </button>
          <Link to="/login" className="login-btn">
            {t(language, "login")}
          </Link>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <MessageCircle size={18} />
            <span>{t(language, "heroBadge")}</span>
          </div>

          <h1>{t(language, "heroTitle")}</h1>

          <p>{t(language, "heroText")}</p>

          <div className="hero-actions">
            <Link to="/login" className="primary-cta">
              {t(language, "startNow")}
              <ArrowRight className={isAr ? "flip-icon" : ""} size={20} />
            </Link>
            <a href="#features" className="secondary-cta">
              {t(language, "learnMore")}
            </a>
          </div>

          <div className="hero-trust">
            <span />
            {t(language, "trustedText")}
          </div>
        </div>

        <div className="hero-visual">
          <div className="chat-preview-card">
            <div className="chat-preview-header">
              <div className="mini-logo">
                <Sparkles size={18} />
              </div>
              <div>
                <strong>{t(language, "appName")}</strong>
                <span>{isAr ? "متصل الآن" : "Online now"}</span>
              </div>
            </div>

            <div className="preview-message user-msg">
              {isAr ? "هل أقدر أسجل CS2105؟" : "Can I register CS2105?"}
            </div>

            <div className="preview-message bot-msg">
              {isAr
                ? "نعم، يمكنك تسجيل المقرر لأن المتطلبات السابقة مكتملة."
                : "Yes, you can register this course because prerequisites are completed."}
            </div>

            <div className="preview-message user-msg">
              {isAr ? "ما معنى النظام الدراسي؟" : "What is the study system?"}
            </div>

            <div className="preview-message bot-msg">
              {isAr
                ? "النظام الدراسي هو أسلوب الدراسة المتبع في كليات ومعاهد الجامعة."
                : "The study system is the method followed in university colleges and institutes."}
            </div>

            <div className="typing-pill">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="floating-stat stat-one">
            <strong>2</strong>
            <span>{isAr ? "اجنت ذكي" : "Smart agents"}</span>
          </div>

          <div className="floating-stat stat-two">
            <strong>24+</strong>
            <span>{isAr ? "حالة خطأ مدعومة" : "Handled input cases"}</span>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-heading">
          <span>{t(language, "navFeatures")}</span>
          <h2>{t(language, "featuresTitle")}</h2>
          <p>{t(language, "featuresSubtitle")}</p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="how-section">
        <div className="section-heading">
          <span>{t(language, "navHow")}</span>
          <h2>{t(language, "howTitle")}</h2>
          <p>{t(language, "howSubtitle")}</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <strong>{step.number}</strong>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <p>{t(language, "footerText")}</p>
      </footer>
    </main>
  );
}