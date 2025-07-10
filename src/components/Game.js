import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [gameQuestions, setGameQuestions] = useState([]);

  const allQuestions = [
    // Core Components & Features
    {
      id: 1,
      category: "Core Components",
      question: "Which of the following are key components of GitHub Advanced Security?",
      options: [
        "Real-time project tracking, Automated code reviews, Personal data encryption",
        "Secret scanning, Code scanning, Dependency review",
        "Team communication tools, UI design improvements, Faster compilation",
        "Cloud storage reduction, Development speed, Regulatory compliance"
      ],
      correct: 1,
      explanation: "Secret scanning, code scanning, and dependency review are the three key components of GitHub Advanced Security, providing comprehensive security coverage."
    },
    {
      id: 2,
      category: "Core Components",
      question: "What distinguishes GitHub Advanced Security from regular GitHub features?",
      options: [
        "Enhanced team communication tools",
        "Advanced security features for code scanning and secret scanning",
        "Improved user interface design",
        "Faster code compilation speeds"
      ],
      correct: 1,
      explanation: "GitHub Advanced Security is distinguished by its advanced security features like code and secret scanning, not by communication tools, UI design, or compilation speed."
    },
    {
      id: 3,
      category: "General Security",
      question: "What is the primary difference between secret scanning and code scanning in GitHub Advanced Security?",
      options: [
        "Secret scanning analyzes code for best practices, while code scanning identifies security breaches",
        "Secret scanning provides security overview, while code scanning handles dependency updates",
        "Secret scanning detects code vulnerabilities, while code scanning detects exposed secrets",
        "Secret scanning identifies exposed credentials and secrets, while code scanning identifies security vulnerabilities in the codebase"
      ],
      correct: 3,
      explanation: "Secret scanning focuses on detecting exposed credentials and secrets, while code scanning identifies security vulnerabilities within the code itself."
    },

    // CodeQL Questions
    {
      id: 4,
      category: "CodeQL",
      question: "What is the primary purpose of CodeQL in GitHub Advanced Security?",
      options: [
        "Version control management",
        "Conducting semantic code analysis to find vulnerabilities",
        "Project management and tracking",
        "Automated code deployment"
      ],
      correct: 1,
      explanation: "CodeQL is specifically designed for conducting semantic code analysis to identify security vulnerabilities in code."
    },
    {
      id: 5,
      category: "CodeQL",
      question: "Which file format is used for custom CodeQL queries?",
      options: [
        ".yaml",
        ".json",
        ".ql",
        ".xml"
      ],
      correct: 2,
      explanation: "CodeQL queries are written in .ql files using the CodeQL query language."
    },
    {
      id: 6,
      category: "CodeQL",
      question: "What is a correct step to integrate CodeQL code scanning in your GitHub Actions workflow?",
      options: [
        "Create a Docker container that includes CodeQL and run it as a GitHub Action",
        "Install CodeQL CLI on your local machine and configure it in repository settings",
        "Set up a Jenkins pipeline to run CodeQL analysis and upload results to GitHub",
        "Add a new workflow file in .github/workflows directory with a job that uses the codeql-analysis action"
      ],
      correct: 3,
      explanation: "Adding a workflow file in the .github/workflows directory with the codeql-analysis action integrates CodeQL into the GitHub Actions workflow."
    },
    {
      id: 7,
      category: "CodeQL",
      question: "What aspect of CodeQL helps in tracking down the root cause of a vulnerability?",
      options: [
        "The use of AI and machine learning",
        "Its real-time analysis capabilities",
        "The ability to trace data flow in code",
        "Its integration with version control systems"
      ],
      correct: 2,
      explanation: "CodeQL's ability to trace data flow in code helps in tracking down the root cause of vulnerabilities."
    },
    {
      id: 8,
      category: "CodeQL",
      question: "What type of security issues is CodeQL most effective at identifying?",
      options: [
        "Basic syntax errors",
        "Performance bottlenecks",
        "Complex security vulnerabilities",
        "User interface flaws"
      ],
      correct: 2,
      explanation: "CodeQL is most effective at identifying complex security vulnerabilities within the codebase."
    },
    {
      id: 9,
      category: "CodeQL",
      question: "In what format are the results of GitHub's code scanning usually provided?",
      options: [
        "PDF reports",
        "Interactive dashboards",
        "Inline comments in pull requests",
        "Email alerts"
      ],
      correct: 2,
      explanation: "Code scanning results are typically provided as inline comments in pull requests for easy review and resolution."
    },

    // Secret Scanning Questions
    {
      id: 10,
      category: "Secret Scanning",
      question: "What does Secret Scanning detect in GitHub Advanced Security?",
      options: [
        "Code quality issues",
        "Exposed credentials and tokens",
        "Performance problems",
        "Syntax errors"
      ],
      correct: 1,
      explanation: "Secret Scanning detects tokens, private keys, and other secrets accidentally committed to your repository."
    },
    {
      id: 11,
      category: "Secret Scanning",
      question: "How does secret scanning in GitHub enhance overall project security?",
      options: [
        "By automating code reviews",
        "By detecting and alerting on exposed secrets",
        "By managing team access controls",
        "By enforcing coding standards"
      ],
      correct: 1,
      explanation: "Secret scanning enhances security by detecting and alerting on exposed secrets, helping to prevent potential security breaches."
    },
    {
      id: 12,
      category: "Secret Scanning",
      question: "What is a limitation of GitHub's secret scanning feature?",
      options: [
        "It only works with certain programming languages",
        "It requires additional fees on all plans",
        "It cannot detect encrypted secrets",
        "It cannot scan forked repositories"
      ],
      correct: 2,
      explanation: "GitHub's secret scanning cannot detect secrets that are encrypted."
    },
    {
      id: 13,
      category: "Secret Scanning",
      question: "How can organizations customize GitHub's secret scanning?",
      options: [
        "By choosing which branches to scan",
        "By limiting scanning to certain times of day",
        "By selecting specific file types to scan",
        "By defining custom patterns for secrets"
      ],
      correct: 3,
      explanation: "Organizations can customize secret scanning by defining custom patterns for the types of secrets they want to detect."
    },
    {
      id: 14,
      category: "Secret Scanning",
      question: "What are common actions taken after a secret is exposed in GitHub's secret scanning?",
      options: [
        "Ignore the alert and continue development",
        "Publicize the alert for awareness",
        "Revoke and replace the secret, notify security team, and review the code change",
        "Only update the repository's documentation"
      ],
      correct: 2,
      explanation: "Typical actions include notifying the security team, revoking and replacing the exposed secret, and reviewing the code change that led to the exposure."
    },

    // Dependabot Questions
    {
      id: 15,
      category: "Dependabot",
      question: "Which tool in GitHub helps automatically detect and manage vulnerabilities in dependencies?",
      options: [
        "GitHub Actions",
        "GitHub Pages",
        "GitHub Codespaces",
        "GitHub Dependabot"
      ],
      correct: 3,
      explanation: "GitHub Dependabot helps automatically detect and manage vulnerabilities in dependencies."
    },
    {
      id: 16,
      category: "Dependabot",
      question: "What is the primary goal of Dependabot security updates in GitHub?",
      options: [
        "To improve code performance",
        "To automatically update vulnerable dependencies",
        "To manage repository permissions",
        "To optimize build processes"
      ],
      correct: 1,
      explanation: "Dependabot's primary goal is to automatically identify and update vulnerable dependencies to maintain security."
    },
    {
      id: 17,
      category: "Dependabot",
      question: "What information does a Dependabot alert provide about a vulnerability?",
      options: [
        "The history of previous commits",
        "The project's overall security score",
        "A list of all dependencies in the project",
        "The name and version of the vulnerable dependency, and the CVE identifier"
      ],
      correct: 3,
      explanation: "Dependabot alerts provide detailed information including the dependency name, version, and CVE identifier to help assess severity."
    },
    {
      id: 18,
      category: "Dependabot",
      question: "What is the best practice for managing dependencies when Dependabot alerts indicate vulnerabilities?",
      options: [
        "Disable all automated dependency updates and handle them manually",
        "Rely on developer discretion to check for and update dependencies as needed",
        "Use GitHub Dependabot to automatically create pull requests for dependency updates and review them promptly",
        "Set the repository to read-only mode until the vulnerability is resolved"
      ],
      correct: 2,
      explanation: "Using Dependabot to automatically create pull requests allows for continuous monitoring and updating of dependencies while maintaining control through reviews."
    },
    {
      id: 19,
      category: "Dependabot",
      question: "Which feature complements secret scanning by checking for vulnerabilities in dependencies?",
      options: [
        "GitHub Discussions",
        "GitHub Actions",
        "GitHub Issues",
        "Dependabot"
      ],
      correct: 3,
      explanation: "Dependabot complements secret scanning by automatically checking for vulnerabilities in dependencies."
    },

    // Organization & Configuration Questions
    {
      id: 20,
      category: "Organization",
      question: "How do you enable secret scanning for all repositories within an organization on GitHub?",
      options: [
        "Add a configuration file to the root of each repository",
        "Go to organization settings, select 'Security & analysis,' and enable secret scanning",
        "Enable through GitHub API for each repository",
        "Secret scanning can only be enabled at repository level"
      ],
      correct: 1,
      explanation: "Secret scanning can be enabled for all repositories through organization settings under 'Security & analysis'."
    },
    {
      id: 21,
      category: "Organization",
      question: "Which GitHub plan includes Advanced Security features by default?",
      options: [
        "Enterprise",
        "Team",
        "Free",
        "Pro"
      ],
      correct: 0,
      explanation: "GitHub Advanced Security features are included by default in the GitHub Enterprise plan."
    },
    {
      id: 22,
      category: "Organization",
      question: "As an administrator, what steps ensure all repositories benefit from GitHub Advanced Security features?",
      options: [
        "Enable code scanning and secret scanning, and configure dependency review for all repositories",
        "Configure advanced security features only when an incident occurs",
        "Disable security alerts to minimize disruptions to development",
        "Only enable code scanning for the most critical repositories"
      ],
      correct: 0,
      explanation: "Enabling code scanning, secret scanning, and dependency review for all repositories ensures comprehensive security coverage."
    },
    {
      id: 23,
      category: "Configuration",
      question: "What should be included in a workflow file to enable GitHub code scanning?",
      options: [
        "A specific branch to scan",
        "A job for code scanning",
        "Customized access permissions",
        "A dedicated server configuration"
      ],
      correct: 1,
      explanation: "A workflow file should include a job specifically configured for code scanning to enable it in a GitHub repository."
    },
    {
      id: 24,
      category: "Configuration",
      question: "When configuring code scanning with GitHub Actions, where should the workflow file be placed?",
      options: [
        "In the root directory",
        "In the .github/workflows directory",
        "In the src folder",
        "In a separate configuration repository"
      ],
      correct: 1,
      explanation: "CodeQL analysis workflow files should be placed in the .github/workflows directory."
    },

    // Best Practices & Security Culture
    {
      id: 25,
      category: "Best Practices",
      question: "What should be the first step after receiving a security alert in GitHub?",
      options: [
        "Inform all employees",
        "Assess the credibility of the alert",
        "Update all software",
        "Disconnect from the internet"
      ],
      correct: 1,
      explanation: "The initial step should be to assess the alert's credibility before taking any action."
    },
    {
      id: 26,
      category: "Best Practices",
      question: "After CodeQL scan finds numerous alerts, how should you triage them?",
      options: [
        "Assign all alerts to a single developer",
        "Defer addressing alerts until next maintenance window",
        "Filter and prioritize alerts by severity and impact, assign to appropriate team members",
        "Address all low-severity alerts first to reduce numbers"
      ],
      correct: 2,
      explanation: "Filtering and prioritizing alerts by severity and impact ensures critical issues are addressed first by the right team members."
    },
    {
      id: 27,
      category: "Security Culture",
      question: "Why is it important to create a culture of security in an organization using GitHub?",
      options: [
        "To ensure regulatory compliance",
        "To speed up development processes",
        "To enhance overall code quality and security",
        "To reduce the cost of cloud storage"
      ],
      correct: 2,
      explanation: "A security culture improves code quality and security throughout the organization."
    },
    {
      id: 28,
      category: "Security Culture",
      question: "In creating a culture around security, what role do team members play?",
      options: [
        "They are solely responsible for security",
        "They contribute to security discussions only",
        "They are involved in implementing security practices",
        "Security is not part of their role"
      ],
      correct: 2,
      explanation: "Team members are crucial in implementing security practices in their workflows, not just in discussions."
    },
    {
      id: 29,
      category: "Best Practices",
      question: "How can GitHub administrators ensure ongoing compliance with security policies?",
      options: [
        "Outsourcing security management",
        "Conducting periodic security training",
        "Relying on automated security scans",
        "Implementing strict code review processes"
      ],
      correct: 1,
      explanation: "Conducting periodic security training ensures all team members are aware of and comply with security policies."
    },

    // Advanced Configuration
    {
      id: 30,
      category: "Advanced",
      question: "How would you reference a custom CodeQL query stored in a local directory named custom-queries in your workflow?",
      options: [
        "uses: github/codeql-action/init@v1 with: query: ./custom-queries",
        "uses: github/codeql-action/init@v1 with: queries: ./custom-queries",
        "uses: github/codeql-action/init@v1 with: queries: local-queries",
        "uses: github/codeql-action/init@v1 with: config-file: ./custom-queries"
      ],
      correct: 1,
      explanation: "The correct syntax uses 'queries: ./custom-queries' to reference custom queries in a local directory."
    },
    {
      id: 31,
      category: "Advanced",
      question: "Which severity levels are available for security alerts in GitHub?",
      options: [
        "Low, Medium, High",
        "Info, Warning, Error, Critical",
        "Low, Medium, High, Critical",
        "Minor, Major, Critical"
      ],
      correct: 2,
      explanation: "GitHub security alerts use Low, Medium, High, and Critical severity levels."
    },
    {
      id: 32,
      category: "Advanced",
      question: "In which phase of the SDLC should you integrate Dependabot alerts to maximize security?",
      options: [
        "During the coding phase, to identify and fix vulnerabilities as dependencies are added",
        "During the deployment phase, to catch last-minute issues",
        "During the planning phase, to assess potential vulnerabilities",
        "During the testing phase, to ensure tests cover vulnerabilities"
      ],
      correct: 0,
      explanation: "Integrating Dependabot alerts during coding allows for early detection and resolution of vulnerabilities as dependencies are introduced."
    },
    {
      id: 33,
      category: "Advanced",
      question: "What is the difference between enabling CodeQL and third-party code scanning tools?",
      options: [
        "CodeQL requires Slack integration, third-party tools require email configuration",
        "CodeQL requires no configuration and runs automatically",
        "Both require installing local software packages",
        "CodeQL uses GitHub Actions workflow, third-party tools require GitHub App installation"
      ],
      correct: 3,
      explanation: "CodeQL integrates via GitHub Actions workflows, while third-party tools typically require installing a GitHub App and custom configuration."
    },
    {
      id: 34,
      category: "Advanced",
      question: "How does integrating code scanning with CI/CD help?",
      options: [
        "Increases project visibility",
        "Detects vulnerabilities before deployment",
        "Ensures code quality",
        "Automates the deployment process"
      ],
      correct: 1,
      explanation: "Integrating code scanning with CI/CD helps detect vulnerabilities before deployment, preventing security issues in production."
    },

    // Repository Management
    {
      id: 35,
      category: "Repository Management",
      question: "Which user roles should you verify can see and respond to secret scanning alerts?",
      options: [
        "GitHub Sponsors",
        "Issue triage team members",
        "Repository administrators",
        "All users with read access"
      ],
      correct: 2,
      explanation: "Repository administrators have comprehensive control over repository settings and should be able to see and respond to security alerts."
    },
    {
      id: 36,
      category: "Repository Management",
      question: "What approach best enhances security for a repository with sensitive files?",
      options: [
        "Enable branch protections and require pull request reviews",
        "Set repository to public and rely on code reviews",
        "Create private repository with role-based access control",
        "Use GitHub Actions to automate access permissions"
      ],
      correct: 2,
      explanation: "A private repository with role-based access control provides the best security for sensitive files while maintaining collaboration."
    },
    {
      id: 37,
      category: "Repository Management",
      question: "Why is dependency review important in GitHub Advanced Security?",
      options: [
        "It automates code deployment",
        "It identifies potential security vulnerabilities in dependencies",
        "It checks for outdated software versions",
        "It speeds up the coding process"
      ],
      correct: 1,
      explanation: "Dependency review is important because it identifies potential security vulnerabilities in dependencies."
    },
    {
      id: 38,
      category: "Repository Management",
      question: "What actions are essential for setting effective security policies in GitHub?",
      options: [
        "Setting branch protection rules only",
        "Regular audits, security training, and clear vulnerability disclosure guidelines",
        "Restricting all repository access",
        "Automating all security updates without review"
      ],
      correct: 1,
      explanation: "Essential actions include regular audits, providing security training for contributors, and establishing clear vulnerability disclosure guidelines."
    },
    {
      id: 39,
      category: "Repository Management",
      question: "Which feature is specific to GitHub Advanced Security and not automatically available for open source projects?",
      options: [
        "Code scanning with full features",
        "Repository insights",
        "Basic secret scanning",
        "Dependency graph"
      ],
      correct: 0,
      explanation: "Code scanning with full Advanced Security features is not automatically available for open source projects unless Advanced Security is enabled."
    },

    // Troubleshooting & Analysis
    {
      id: 40,
      category: "Troubleshooting",
      question: "What is a primary challenge in interpreting CodeQL results?",
      options: [
        "Understanding technical terminology only",
        "Determining false positive rate only",
        "Translating results to actionable insights only",
        "All of the above"
      ],
      correct: 3,
      explanation: "Interpreting CodeQL results involves understanding technical terminology, determining false positives, and translating results into actionable insights."
    },
    {
      id: 41,
      category: "Troubleshooting",
      question: "In what scenarios might code scanning generate false positives?",
      options: [
        "When using specific programming languages",
        "When the repository is large",
        "When configuration is not optimized",
        "In all of the above scenarios"
      ],
      correct: 3,
      explanation: "Code scanning can generate false positives in various scenarios including certain languages, large repositories, or suboptimal configurations."
    },
    {
      id: 42,
      category: "Troubleshooting",
      question: "Which factor does not influence the effectiveness of secret scanning in GitHub?",
      options: [
        "The type of secrets used in the code",
        "The frequency of code updates",
        "The geographic location of the contributors",
        "The number of contributors to the repository"
      ],
      correct: 2,
      explanation: "The geographic location of contributors does not influence the effectiveness of GitHub's secret scanning."
    },
    {
      id: 43,
      category: "Analysis",
      question: "How do CodeQL queries help in identifying vulnerabilities?",
      options: [
        "By monitoring code performance",
        "By comparing code against known vulnerability patterns",
        "By visualizing code patterns",
        "By checking code syntax"
      ],
      correct: 1,
      explanation: "CodeQL queries identify vulnerabilities by comparing code against patterns associated with known vulnerabilities."
    },
    {
      id: 44,
      category: "Analysis",
      question: "What is an important consideration when referencing a CodeQL query?",
      options: [
        "The specific security vulnerability targeted",
        "The size of the codebase",
        "The number of collaborators",
        "The programming language used"
      ],
      correct: 0,
      explanation: "When referencing a CodeQL query, the most important consideration is the specific security vulnerability that the query is designed to target."
    },

    // Implementation & Workflow
    {
      id: 45,
      category: "Implementation",
      question: "What must be included in your repository's configuration to ensure Dependabot security updates are enabled?",
      options: [
        "A .github/dependabot.yml configuration file",
        "A package-lock.json file",
        "A SECURITY.md file",
        "A .gitignore file"
      ],
      correct: 0,
      explanation: "Dependabot requires a .github/dependabot.yml configuration file to specify update settings and schedules."
    },
    {
      id: 46,
      category: "Implementation",
      question: "When setting up GitHub Actions workflow to scan with CodeQL, which step is required?",
      options: [
        "Create a custom GitHub Action for code scanning",
        "Add a CodeQL analysis workflow file in .github/workflows",
        "Enable code scanning from repository settings only",
        "Manually create a .gitlab-ci.yml file"
      ],
      correct: 1,
      explanation: "Adding a CodeQL analysis workflow file in the .github/workflows directory is essential to set up code scanning with GitHub Actions."
    },
    {
      id: 47,
      category: "Workflow",
      question: "In a GHAS workflow for secret scanning, who is primarily responsible for responding to detected secrets?",
      options: [
        "Product Owner",
        "Project Manager",
        "Security Engineer",
        "Software Developer"
      ],
      correct: 2,
      explanation: "The Security Engineer is primarily responsible for responding to detected secrets and ensuring they are addressed promptly."
    },
    {
      id: 48,
      category: "Workflow",
      question: "How does GitHub Advanced Security aid in responding to security alerts?",
      options: [
        "By automatically resolving all alerts",
        "By providing tools to assess and address the alerts",
        "By outsourcing alert management to a third party",
        "By ignoring insignificant alerts"
      ],
      correct: 1,
      explanation: "GitHub Advanced Security provides tools and features to assess and address security alerts effectively, rather than auto-resolving or ignoring them."
    },
    {
      id: 49,
      category: "Implementation",
      question: "What types of security alerts can be managed in GitHub Advanced Security?",
      options: [
        "Only code scanning alerts",
        "Only secret scanning alerts",
        "Code scanning, secret scanning, and dependency alerts",
        "Only dependency vulnerability alerts"
      ],
      correct: 2,
      explanation: "GitHub Advanced Security manages code scanning alerts, secret scanning alerts, and dependency vulnerability alerts comprehensively."
    },
    {
      id: 50,
      category: "Implementation",
      question: "Why is reporting and logging important in GitHub security management?",
      options: [
        "To fulfill legal requirements",
        "To improve team collaboration",
        "For tracking and analyzing security incidents",
        "For historical code analysis"
      ],
      correct: 2,
      explanation: "Reporting and logging are important for tracking and analyzing security incidents, helping to understand and mitigate security risks."
    }
  ];

  // Initialize game with random questions
  useEffect(() => {
    selectRandomQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult]);

  const selectRandomQuestions = () => {
    // Shuffle and select 10 random questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGameQuestions(selected);
    setCurrentQuestion(0);
    setUsedQuestions([]);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === gameQuestions[currentQuestion].correct) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setSelectedAnswer('');
      setTimeLeft(30);
    } else {
      alert(`Game Over! Your score: ${score}/${gameQuestions.length * 10}\n\nGreat job studying for the GitHub Advanced Security certification!`);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setShowResult(false);
    setSelectedAnswer('');
    setTimeLeft(30);
    selectRandomQuestions();
  };

  if (gameQuestions.length === 0) {
    return <div className="game-container">Loading questions...</div>;
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>GitHub Security Detective</h2>
        <div className="stats">
          <span className="score">Score: {score}</span>
          <span className="timer">Time: {timeLeft}s</span>
          <span className="progress">Question {currentQuestion + 1}/{gameQuestions.length}</span>
        </div>
        <div className="category-badge">
          Category: {gameQuestions[currentQuestion].category}
        </div>
      </div>

      <div className="question-section">
        <h3>{gameQuestions[currentQuestion].question}</h3>
        <div className="options">
          {gameQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                showResult && index === gameQuestions[currentQuestion].correct ? 'correct' : ''
              } ${
                showResult && selectedAnswer === index && index !== gameQuestions[currentQuestion].correct ? 'incorrect' : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="explanation">
            <p>{gameQuestions[currentQuestion].explanation}</p>
            <button className="next-button" onClick={handleNextQuestion}>
              {currentQuestion < gameQuestions.length - 1 ? 'Next Question' : 'Finish Game'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;