export interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  options: {
    label: string;
    value: string;
    icon?: string;
    description?: string;
  }[];
}

export interface QuizResult {
  title: string;
  tagline: string;
  description: string;
  whyForYou: string;
  whatYouWillLearn: string[];
  techStack: string[];
  timeEstimate: string;
  difficulty: "Beginner Friendly" | "Intermediate" | "Explorer";
  resumeImpact: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "branch",
    question: "What is your Engineering Branch?",
    subtitle: "We'll tailor the project context to your domain strengths and career goals.",
    options: [
      { label: "Computer Science / IT", value: "cse", description: "Software, algorithms & web apps" },
      { label: "Electronics & Comm (ECE)", value: "ece", description: "Signal, embedded & smart vision" },
      { label: "Electrical & Electronics (EEE)", value: "eee", description: "Power systems, automation & IoT" },
      { label: "Mechanical / Civil", value: "mech_civil", description: "CAD, structural analysis & physical systems" },
      { label: "AI / Data Science / Emerging", value: "aids", description: "Machine learning, LLMs & data pipelines" },
    ],
  },
  {
    id: "skillLevel",
    question: "What is your current coding comfort level?",
    subtitle: "Don't worry — the workshop starts from scratch and builds step-by-step.",
    options: [
      { label: "Beginner / Python Novice", value: "beginner", description: "Know basic syntax or loops, haven't built full apps" },
      { label: "Intermediate Coder", value: "intermediate", description: "Comfortable with Python/JS functions & libraries" },
      { label: "Curious Explorer", value: "explorer", description: "Used ChatGPT/Claude daily, want to build real agents" },
    ],
  },
  {
    id: "interests",
    question: "Which AI domain excites you most?",
    subtitle: "Choose the technology track you want to show off on your resume.",
    options: [
      { label: "Generative AI & LLM Agents", value: "genai", description: "Smart chatbots, summarizers & reasoning assistants" },
      { label: "Computer Vision & Visual AI", value: "vision", description: "Real-time webcam detection, face & gesture analysis" },
      { label: "Smart Automation & Bots", value: "automation", description: "Scrapers, auto-reply bots & task orchestrators" },
      { label: "Predictive Analytics & ML", value: "predictive", description: "Classification models, trends & score forecasters" },
    ],
  },
  {
    id: "projectType",
    question: "What kind of final output would you love to demo?",
    subtitle: "Pick the practical end-result you want to publish in 60 minutes.",
    options: [
      { label: "Live Interactive Web App", value: "webapp", description: "Streamlit / Gradio web UI you can share via a public link" },
      { label: "WhatsApp / Telegram Smart Bot", value: "bot", description: "Automated chat bot responding to queries instantly" },
      { label: "Real-time Camera Analyzer", value: "camera", description: "Webcam feed with live bounding boxes and AI insights" },
      { label: "Career & Resume Optimizer AI", value: "resume", description: "AI tool that scans tech job descriptions & scores resumes" },
    ],
  },
];

export function getRecommendedProject(answers: Record<string, string>): QuizResult {
  const { branch, skillLevel, interests, projectType } = answers;

  // Rule-based decision matrix
  if (projectType === "resume" || (interests === "genai" && branch === "cse")) {
    return {
      title: "AI ATS Resume Matcher & Interview Copilot",
      tagline: "Score resumes against tier-1 tech job descriptions and generate customized interview prep flashcards.",
      description:
        "Build an intelligent document analyzer using Google Gemini API and Python Streamlit. It parses candidate resumes, extracts core tech keywords, identifies missing competencies for campus placement drives, and drafts personalized mock interview Q&A.",
      whyForYou:
        "As a final-year CS/IT student, having a deployable AI recruitment tool on your GitHub directly highlights your grasp of LLM prompt engineering, embeddings, and real-world utility.",
      whatYouWillLearn: [
        "Prompt engineering techniques to extract structured JSON from unstructured PDF resumes",
        "Building a clean, reactive frontend with Python & Streamlit in under 20 lines of code",
        "Deploying your project to a public shareable URL to include on your LinkedIn and portfolio",
      ],
      techStack: ["Python 3.11", "Gemini 1.5 Flash API", "Streamlit", "PyPDF2"],
      timeEstimate: "50-60 Minutes",
      difficulty: "Beginner Friendly",
      resumeImpact: "Top 5% differentiator for campus placements and software engineering roles.",
    };
  }

  if (interests === "vision" || branch === "ece" || projectType === "camera") {
    return {
      title: "Real-Time Vision Focus & Posture Sentinel",
      tagline: "Detect fatigue, monitor desk posture, and generate smart focus alerts using webcam AI.",
      description:
        "Build an edge-ready computer vision application using OpenCV and MediaPipe. It tracks facial landmarks in real-time to compute eye aspect ratios (EAR) for drowsiness and alerts students when study posture slumps during long coding sessions.",
      whyForYou:
        "Tailor-made for ECE and hardware/software cross-disciplinary students who want to master lightweight computer vision models without heavy GPU requirements.",
      whatYouWillLearn: [
        "Streaming live video feeds and extracting facial mesh coordinates using MediaPipe",
        "Computing geometric aspect ratios to trigger algorithmic alertness notifications",
        "Packaging vision scripts with an intuitive desktop or web alert overlay",
      ],
      techStack: ["Python", "OpenCV", "MediaPipe", "Tkinter / Streamlit"],
      timeEstimate: "55 Minutes",
      difficulty: "Beginner Friendly",
      resumeImpact: "Ideal showcase for Embedded AI, IoT, and Computer Vision interview panels.",
    };
  }

  if (branch === "mech_civil" || interests === "predictive") {
    return {
      title: "Smart Equipment Failure & Anomaly Predictor",
      tagline: "Predict mechanical wear-and-tear and alert maintenance teams using ML classification.",
      description:
        "Build a machine learning pipeline that takes sensor telemetry (temperature, vibration, pressure) and trains a Scikit-Learn Random Forest model to predict equipment failure before catastrophic breakdown.",
      whyForYou:
        "Bridges classical engineering concepts (thermodynamics, structural integrity) with cutting-edge AI, positioning you ahead in modern Industry 4.0 and automotive campus hiring.",
      whatYouWillLearn: [
        "Data preprocessing, handling missing sensor data, and feature normalization",
        "Training and evaluating classification metrics (Precision, Recall, ROC-AUC)",
        "Creating an interactive dashboard to input custom sensor readings and view immediate risk scores",
      ],
      techStack: ["Python", "Pandas", "Scikit-Learn", "Streamlit", "Plotly"],
      timeEstimate: "60 Minutes",
      difficulty: "Beginner Friendly",
      resumeImpact: "Distinguishes you from traditional peers by demonstrating Industry 4.0 AI prowess.",
    };
  }

  if (projectType === "bot" || interests === "automation") {
    return {
      title: "Campus Exam & Placement Multi-Turn WhatsApp Bot",
      tagline: "An automated assistant that answers syllabus doubts, company criteria, and registration deadlines.",
      description:
        "Build an automated conversational assistant powered by an LLM with memory. It ingests your college handbook or placement guidelines and accurately answers queries without hallucinations.",
      whyForYou:
        "Solves a real pain point experienced by thousands of engineering seniors, proving your ability to deliver end-user software products from day one.",
      whatYouWillLearn: [
        "Context injection and retrieval techniques using small vector embeddings",
        "Managing conversation history and conversational memory buffers in Python",
        "Connecting bot responses to a simple webhook or web chat interface",
      ],
      techStack: ["Python", "LangChain / Direct Gemini API", "FastAPI / Gradio"],
      timeEstimate: "50 Minutes",
      difficulty: "Beginner Friendly",
      resumeImpact: "High-impact portfolio project demonstrating end-to-end full-stack AI development.",
    };
  }

  // Fallback high-converting default project
  return {
    title: "Personal AI Coding Mentor & Error Debugger",
    tagline: "Paste any compiler error or buggy code snippet and receive instant step-by-step hints and fixes.",
    description:
      "Create your own AI coding assistant designed specifically for engineering lab work and competitive programming. It highlights syntax bugs, suggests algorithmic optimizations, and provides beginner-friendly explanations.",
    whyForYou:
      "Every recruiter tests coding fundamentals; demonstrating an AI tool you authored to accelerate coding shows unmatched initiative and technical fluency.",
    whatYouWillLearn: [
      "Interfacing with modern generative AI APIs via clean REST client requests",
      "Designing system instructions to act as a supportive senior software engineer",
      "Building a dual-panel web interface with syntax-highlighted code output",
    ],
    techStack: ["Python", "Gemini API", "Streamlit", "Pygments"],
    timeEstimate: "45-60 Minutes",
    difficulty: "Beginner Friendly",
    resumeImpact: "A functional productivity tool you can showcase live during technical interviews.",
  };
}
