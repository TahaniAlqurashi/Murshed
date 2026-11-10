import type { Language } from "../types";

export const dictionary = {
  ar: {
    appName: "مرشد",
    appSubtitle: "مساعدك الأكاديمي الذكي",
    navHome: "الرئيسية",
    navFeatures: "المميزات",
    navHow: "طريقة العمل",
    login: "تسجيل الدخول",
    switchLang: "English",
    heroBadge: "منصة ذكية للإرشاد الأكاديمي",
    heroTitle: "اسأل مرشد عن خطتك الدراسية ولوائح الجامعة في مكان واحد",
    heroText:
      "مرشد يساعد الطالب على فهم وضعه الأكاديمي، معرفة المواد المناسبة، حساب المعدل، والسؤال عن اللوائح والأنظمة بطريقة سهلة وسريعة.",
    startNow: "ابدأ الآن",
    learnMore: "تعرف أكثر",
    trustedText: "يدعم الخطة الدراسية + اللوائح الأكاديمية + الشات الذكي",
    featuresTitle: "كيف يساعدك مرشد؟",
    featuresSubtitle:
      "صممنا مرشد ليكون قريبًا من الطالب، يجاوب على الأسئلة الأكاديمية اليومية بشكل واضح ومنظم.",
    featurePlanTitle: "تحليل الخطة الدراسية",
    featurePlanText:
      "يعرض ملخص وضعك الأكاديمي، الساعات المكتملة والمتبقية، ومستواك الحالي.",
    featureCoursesTitle: "اقتراح المواد المناسبة",
    featureCoursesText:
      "يقترح لك مواد مناسبة للفصل القادم حسب المواد التي أنهيتها والمتطلبات السابقة.",
    featureGpaTitle: "حساب ومحاكاة المعدل",
    featureGpaText:
      "يعرض معدلك الحالي، ويمكنه توقع المعدل إذا كتبت المواد والدرجات المتوقعة.",
    featureRulesTitle: "أسئلة اللوائح والأنظمة",
    featureRulesText:
      "يجيب على أسئلة التعريفات، الحقوق، التظلمات، والأنظمة الأكاديمية من الداتاسيت.",
    howTitle: "طريقة عمل مرشد",
    howSubtitle: "ثلاث خطوات بسيطة للوصول للإجابة.",
    stepOneTitle: "سجل دخولك",
    stepOneText: "ادخل رقم الطالب واسمك للدخول إلى صفحة الشات.",
    stepTwoTitle: "اكتب سؤالك",
    stepTwoText: "اسأل عن الخطة الدراسية أو اللوائح والأنظمة.",
    stepThreeTitle: "احصل على الإجابة",
    stepThreeText:
      "يقوم مرشد بتوجيه السؤال للاجنت المناسب ثم يعرض لك الرد بشكل واضح.",
    footerText: "Murshid Graduation Project — Smart Academic Advising System",
    loginTitle: "مرحبًا بك في مرشد",
    loginText: "أدخل رقم الطالب واسمك للانتقال إلى الشات الأكاديمي.",
    backHome: "العودة للرئيسية",
    studentIdPlaceholder: "مثال: 1001",
    studentNamePlaceholder: "اكتب اسمك",
    checking: "جاري التحقق...",
    studentIdRequired: "رقم الطالب مطلوب",
    studentNameRequired: "اسم الطالب مطلوب",
    studentNotFound: "لم يتم العثور على طالب بهذا الرقم",
    loginFailed: "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى",
    loginSuccess: "تم تسجيل الدخول بنجاح",
    chatWelcome: "مرحبًا، كيف أقدر أساعدك اليوم؟",
newChat: "محادثة جديدة",
conversations: "المحادثات",
noConversations: "لا توجد محادثات بعد",
askPlaceholder: "اسأل عن خطتك الدراسية أو اللوائح...",
sending: "جاري الإرسال...",
assistantName: "مرشد",
connectionError: "حدث خطأ في الاتصال بالباك اند. تأكد أن السيرفر يعمل.",
emptyChatTitle: "ابدأ محادثة جديدة",
emptyChatText: "اكتب سؤالك في الأسفل، مثل: هل أقدر أسجل CS2105؟ أو ما معنى النظام الدراسي؟",
  },
  en: {
    appName: "Murshid",
    appSubtitle: "Your smart academic advisor",
    navHome: "Home",
    navFeatures: "Features",
    navHow: "How it works",
    login: "Login",
    switchLang: "العربية",
    heroBadge: "Smart Academic Advising Platform",
    heroTitle: "Ask Murshid about your study plan and academic rules in one place",
    heroText:
      "Murshid helps students understand their academic status, find suitable courses, calculate GPA, and ask about university regulations in a simple way.",
    startNow: "Start Now",
    learnMore: "Learn More",
    trustedText: "Study plan + academic regulations + smart chatbot",
    featuresTitle: "How Murshid helps you",
    featuresSubtitle:
      "Murshid was designed to answer common academic questions clearly and smoothly.",
    featurePlanTitle: "Study Plan Analysis",
    featurePlanText:
      "Shows your academic summary, completed credits, remaining credits, and current level.",
    featureCoursesTitle: "Course Recommendations",
    featureCoursesText:
      "Suggests suitable courses based on completed courses and prerequisites.",
    featureGpaTitle: "GPA Calculation & Simulation",
    featureGpaText:
      "Shows your current GPA and simulates expected GPA based on planned grades.",
    featureRulesTitle: "Academic Regulations Questions",
    featureRulesText:
      "Answers questions about definitions, rights, appeals, and academic rules.",
    howTitle: "How Murshid works",
    howSubtitle: "Three simple steps to get your answer.",
    stepOneTitle: "Login",
    stepOneText: "Enter your student ID and name to access the chat page.",
    stepTwoTitle: "Ask your question",
    stepTwoText: "Ask about your study plan or academic regulations.",
    stepThreeTitle: "Get the answer",
    stepThreeText:
      "Murshid routes your question to the correct agent and shows a clear answer.",
    footerText: "Murshid Graduation Project — Smart Academic Advising System",
    loginTitle: "Welcome to Murshid",
    loginText: "Enter your student ID and name to access the academic chat.",
    backHome: "Back Home",
    studentIdPlaceholder: "Example: 1001",
    studentNamePlaceholder: "Enter your name",
    checking: "Checking...",
    studentIdRequired: "Student ID is required",
    studentNameRequired: "Student name is required",
    studentNotFound: "No student was found with this ID",
    loginFailed: "Login failed, please try again",
    loginSuccess: "Login successful",
    chatWelcome: "Hello, how can I help you today?",
newChat: "New Chat",
conversations: "Conversations",
noConversations: "No conversations yet",
askPlaceholder: "Ask about your study plan or regulations...",
sending: "Sending...",
assistantName: "Murshid",
connectionError: "Backend connection error. Make sure the server is running.",
emptyChatTitle: "Start a new conversation",
emptyChatText: "Write your question below, such as: Can I register CS2105? or What is the study system?",
  },
} as const;

export type DictionaryKey = keyof typeof dictionary.ar;

export function t(language: Language, key: DictionaryKey): string {
  return dictionary[language][key];
}