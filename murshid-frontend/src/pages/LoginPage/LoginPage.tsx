import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Languages,
  Loader2,
  LockKeyhole,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { t } from "../../i18n/dictionary";
import { getStudentById } from "../../services/studentService";
import { saveSession } from "../../services/sessionService";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const isAr = language === "ar";

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanId = studentId.trim();
    const cleanName = studentName.trim();

    if (!cleanId) {
      setError(t(language, "studentIdRequired"));
      return;
    }

    if (!cleanName) {
      setError(t(language, "studentNameRequired"));
      return;
    }

    setLoading(true);

    try {
      const student = await getStudentById(cleanId);

      if (!student) {
        setError(t(language, "studentNotFound"));
        return;
      }

      saveSession({
        studentId: Number(cleanId),
        studentName: cleanName || student.name_ar || "Student",
      });

      setSuccess(t(language, "loginSuccess"));

      setTimeout(() => {
        navigate("/chat", { replace: true });
      }, 500);
    } catch (err) {
      console.error(err);
      setError(t(language, "loginFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-bg">
        <span className="login-orb login-orb-one" />
        <span className="login-orb login-orb-two" />
        <span className="login-orb login-orb-three" />
      </div>

      <div className="login-shell">
        <section className="login-visual">
          <Link to="/" className="login-brand">
            <div className="login-brand-icon">
              <Sparkles size={24} />
            </div>
            <div>
              <strong>{t(language, "appName")}</strong>
              <span>{t(language, "appSubtitle")}</span>
            </div>
          </Link>

          <div className="login-visual-content">
            <div className="visual-badge">
              <GraduationCap size={18} />
              <span>{isAr ? "دخول الطالب" : "Student Access"}</span>
            </div>

            <h1>{t(language, "loginTitle")}</h1>
            <p>{t(language, "loginText")}</p>

            <div className="login-mini-cards">
              <div className="mini-card">
                <strong>{isAr ? "Study Plan" : "Study Plan"}</strong>
                <span>{isAr ? "توصيات، ساعات، معدل" : "Courses, credits, GPA"}</span>
              </div>
              <div className="mini-card">
                <strong>{isAr ? "Knowledge Base" : "Knowledge Base"}</strong>
                <span>{isAr ? "لوائح وأنظمة" : "Rules and regulations"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="login-panel">
          <div className="login-top-actions">
            <Link to="/" className="back-link">
              {isAr ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              {t(language, "backHome")}
            </Link>

            <button className="login-language-btn" onClick={toggleLanguage}>
              <Languages size={17} />
              {t(language, "switchLang")}
            </button>
          </div>

          <form className="login-card" onSubmit={handleLogin}>
            <div className="login-card-icon">
              <LockKeyhole size={26} />
            </div>

            <h2>{t(language, "login")}</h2>
            <p>{t(language, "loginText")}</p>

            <label className="login-field">
              <span>{t(language, "studentIdPlaceholder")}</span>
              <div className="input-wrap">
                <GraduationCap size={20} />
                <input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder={t(language, "studentIdPlaceholder")}
                  inputMode="numeric"
                  disabled={loading}
                />
              </div>
            </label>

            <label className="login-field">
              <span>{t(language, "studentNamePlaceholder")}</span>
              <div className="input-wrap">
                <UserRound size={20} />
                <input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder={t(language, "studentNamePlaceholder")}
                  disabled={loading}
                />
              </div>
            </label>

            {error && <div className="login-alert error-alert">{error}</div>}
            {success && <div className="login-alert success-alert">{success}</div>}

            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="spin" size={20} />
                  {t(language, "checking")}
                </>
              ) : (
                <>
                  {t(language, "login")}
                  {isAr ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}