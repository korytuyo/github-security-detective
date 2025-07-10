// True Jeopardy-style questions where the clue is given and contestants respond with "What is..."
// Some questions include images for Daily Doubles
export const jeopardyQuestions = [
  {
    category: "GITHUB BASICS",
    questions: [
      {
        clue: "This is the primary purpose of GitHub Advanced Security, focusing on protecting code throughout the development process.",
        options: [
          "What is team collaboration?",
          "What is enhancing code security?",
          "What is cloud storage?",
          "What is marketing automation?"
        ],
        correctResponse: "What is enhancing code security?",
        explanation: "GitHub Advanced Security is designed to enhance code security throughout the entire development process, not for team management, storage, or marketing."
      },
      {
        clue: "This GitHub subscription tier includes Advanced Security features by default, designed for large organizations.",
        options: [
          "What is Enterprise?",
          "What is Team?",
          "What is Free?",
          "What is Pro?"
        ],
        correctResponse: "What is Enterprise?",
        explanation: "GitHub Advanced Security features are included by default in the GitHub Enterprise plan, which is designed for large organizations with advanced security needs."
      },
      {
        clue: "This security approach involves encouraging all team members to prioritize security in their workflows, not just the IT department.",
        options: [
          "What is external threat protection?",
          "What is organizational security culture?",
          "What is IT-only security?",
          "What is default security settings?"
        ],
        correctResponse: "What is organizational security culture?",
        explanation: "Creating a security culture means involving all team members in security practices, going beyond default settings or limiting responsibility to IT."
      },
      {
        clue: "These two factors are crucial for the effectiveness of CodeQL analysis in finding vulnerabilities.",
        options: [
          "What are production-only scans?",
          "What are regular updates and comprehensive query coverage?",
          "What are JavaScript-only scans?",
          "What are monthly scan limits?"
        ],
        correctResponse: "What are regular updates and comprehensive query coverage?",
        explanation: "Regular updates and comprehensive query coverage ensure CodeQL can detect the latest vulnerabilities across your entire codebase."
      },
      {
        clue: "This security philosophy integrates security checks throughout the development lifecycle rather than just at the end.",
        options: [
          "What is reactive security?",
          "What is shift-left security?",
          "What is enterprise-only security?",
          "What is external threat focus?"
        ],
        correctResponse: "What is shift-left security?",
        explanation: "GitHub promotes shift-left security, which means integrating security checks early and throughout the development process.",
        image: "https://github.githubassets.com/images/modules/security/security-hero.svg"
      }
    ]
  },
  {
    category: "CODEQL POWER",
    questions: [
      {
        clue: "This is the primary function of CodeQL in GitHub, helping developers find problems before they reach production.",
        options: [
          "What is automating code review?",
          "What is identifying security vulnerabilities?",
          "What is enhancing performance?",
          "What is managing pull requests?"
        ],
        correctResponse: "What is identifying security vulnerabilities?",
        explanation: "CodeQL's primary function is to identify security vulnerabilities in codebases using semantic code analysis."
      },
      {
        clue: "These programming languages, including JavaScript, Python, C++, and Java, can all be analyzed by CodeQL.",
        options: [
          "What are scripting languages only?",
          "What are compiled languages only?",
          "What are multiple supported languages?",
          "What are web technologies only?"
        ],
        correctResponse: "What are multiple supported languages?",
        explanation: "CodeQL supports analysis of multiple languages including JavaScript, Python, C++, Java, C#, Go, and more."
      },
      {
        clue: "This is the first step required before CodeQL can analyze your code for vulnerabilities.",
        options: [
          "What is creating a repository?",
          "What is installing the CLI?",
          "What is generating a CodeQL database?",
          "What is configuring settings?"
        ],
        correctResponse: "What is generating a CodeQL database?",
        explanation: "Before analysis can begin, CodeQL must first generate a database from your codebase that represents the code's structure."
      },
      {
        clue: "This location in the GitHub interface is where CodeQL scan results are typically displayed.",
        options: [
          "What is a downloadable report?",
          "What is the Security tab?",
          "What are email notifications?",
          "What is the repository Wiki?"
        ],
        correctResponse: "What is the Security tab?",
        explanation: "CodeQL results appear in the Security tab of your GitHub repository, providing a centralized view of all findings."
      },
      {
        clue: "This tool allows administrators to run CodeQL analysis outside of the GitHub web interface.",
        options: [
          "What is the UI customizer?",
          "What is the CodeQL CLI?",
          "What is the backup tool?",
          "What is the access manager?"
        ],
        correctResponse: "What is the CodeQL CLI?",
        explanation: "The CodeQL CLI (Command Line Interface) enables running analysis locally or in custom CI/CD pipelines.",
        image: "https://github.githubassets.com/images/modules/site/features/codeql.png"
      }
    ]
  },
  {
    category: "SECRET SCANNING",
    questions: [
      {
        clue: "This GitHub feature automatically detects sensitive information like API keys and passwords in your code.",
        options: [
          "What is manual code review?",
          "What is secret encryption?",
          "What is secret scanning?",
          "What is public-only scanning?"
        ],
        correctResponse: "What is secret scanning?",
        explanation: "Secret scanning automatically detects exposed secrets and alerts you so you can take action to secure them."
      },
      {
        clue: "These types of sensitive data, including API keys, passwords, and tokens from various providers, can be detected by GitHub.",
        options: [
          "What are GitHub tokens only?",
          "What are multiple secret types?",
          "What are database passwords only?",
          "What are SSH keys only?"
        ],
        correctResponse: "What are multiple secret types?",
        explanation: "GitHub can detect various types of secrets from multiple providers including AWS, Azure, Google Cloud, and many more."
      },
      {
        clue: "This action occurs when GitHub's secret scanning detects exposed sensitive information in your repository.",
        options: [
          "What is automatic code deletion?",
          "What is sending an alert?",
          "What is making the repo private?",
          "What is automatic secret rotation?"
        ],
        correctResponse: "What is sending an alert?",
        explanation: "When secrets are detected, GitHub sends alerts to repository administrators so they can revoke and replace the exposed credentials."
      },
      {
        clue: "Secret scanning works on both of these repository visibility types to protect your sensitive data.",
        options: [
          "What are public repositories only?",
          "What are private repositories only?",
          "What are public and private repositories?",
          "What are archived repositories only?"
        ],
        correctResponse: "What are public and private repositories?",
        explanation: "Secret scanning protects both public and private repositories, helping prevent credential exposure regardless of visibility."
      },
      {
        clue: "You can customize secret scanning by doing these two things to better fit your security needs.",
        options: [
          "What is nothing?",
          "What is defining custom patterns and excluding files?",
          "What is disabling it entirely?",
          "What is contacting support?"
        ],
        correctResponse: "What is defining custom patterns and excluding files?",
        explanation: "Secret scanning can be customized by defining custom patterns for proprietary secrets and excluding certain files from scanning."
      }
    ]
  },
  {
    category: "DEPENDABOT DUTIES",
    questions: [
      {
        clue: "This is the primary benefit of managing Dependabot notifications in your GitHub repository.",
        options: [
          "What is reducing meeting frequency?",
          "What is staying informed about vulnerabilities?",
          "What is automating code formatting?",
          "What is increasing build speed?"
        ],
        correctResponse: "What is staying informed about vulnerabilities?",
        explanation: "Dependabot notifications keep you informed about dependency updates and security vulnerabilities that could affect your project."
      },
      {
        clue: "Dependabot automatically creates these to help you update vulnerable dependencies in your project.",
        options: [
          "What are new features?",
          "What are pull requests?",
          "What is documentation?",
          "What are test cases?"
        ],
        correctResponse: "What are pull requests?",
        explanation: "Dependabot automatically creates pull requests with dependency updates, making it easy to keep your project secure."
      },
      {
        clue: "These configurable time periods determine how often Dependabot checks for dependency updates.",
        options: [
          "What is manual triggering only?",
          "What is once per year?",
          "What are daily, weekly, or monthly checks?",
          "What is on repository creation?"
        ],
        correctResponse: "What are daily, weekly, or monthly checks?",
        explanation: "Dependabot's check frequency is fully configurable - you can choose daily, weekly, or monthly update checks."
      },
      {
        clue: "Dependabot supports updating dependencies from these package managers, including npm, pip, Maven, and many more.",
        options: [
          "What is npm only?",
          "What is Maven only?",
          "What are multiple ecosystems?",
          "What is Docker only?"
        ],
        correctResponse: "What are multiple ecosystems?",
        explanation: "Dependabot supports a wide range of ecosystems including npm, pip, Maven, NuGet, Composer, and many others."
      },
      {
        clue: "This Dependabot feature keeps all dependencies up-to-date, not just those with security vulnerabilities.",
        options: [
          "What are security updates only?",
          "What are version updates?",
          "What are major updates only?",
          "What is documentation updating?"
        ],
        correctResponse: "What are version updates?",
        explanation: "Dependabot version updates proactively keep all dependencies current, improving compatibility and getting new features."
      }
    ]
  },
  {
    category: "ALERT ACTIONS",
    questions: [
      {
        clue: "These essential aspects of responding to security alerts include assessing impact and taking corrective action.",
        options: [
          "What is system shutdown?",
          "What is effective incident response?",
          "What is ignoring low priorities?",
          "What is quarterly review?"
        ],
        correctResponse: "What is effective incident response?",
        explanation: "Effective response involves assessing impact, notifying stakeholders, taking action, and reviewing protocols."
      },
      {
        clue: "These three aspects of GitHub security alerts can be customized to match your team's workflow.",
        options: [
          "What is email frequency only?",
          "What are frequency, types, and notification methods?",
          "What are alert colors only?",
          "What is nothing?"
        ],
        correctResponse: "What are frequency, types, and notification methods?",
        explanation: "You can configure alert frequency, which types of alerts to receive, and how you want to be notified."
      },
      {
        clue: "This common challenge with code scanning in large repositories involves alerts that aren't actually security issues.",
        options: [
          "What are too few alerts?",
          "What are false positives?",
          "What are colorful alerts?",
          "What are slow alerts?"
        ],
        correctResponse: "What are false positives?",
        explanation: "Managing false positives is a common challenge, requiring tuning of scanning rules to reduce noise."
      },
      {
        clue: "Security alerts should be reviewed by these people who can best assess and address the specific issue.",
        options: [
          "What is the security team only?",
          "What are senior developers only?",
          "What are relevant team members?",
          "What are external consultants?"
        ],
        correctResponse: "What are relevant team members?",
        explanation: "Alerts should go to team members with the context and expertise to properly evaluate and fix the issue."
      },
      {
        clue: "This best practice for alert management ensures you receive relevant and actionable notifications.",
        options: [
          "What is disabling non-critical alerts?",
          "What is regular review and tuning?",
          "What is forwarding to management?",
          "What is audit-only checking?"
        ],
        correctResponse: "What is regular review and tuning?",
        explanation: "Regularly reviewing and tuning alert rules helps maintain a good signal-to-noise ratio in your security notifications."
      }
    ]
  },
  {
    category: "ADMIN AUTHORITY",
    questions: [
      {
        clue: "Administrators use this method to enable GitHub Advanced Security features for a repository.",
        options: [
          "What is a pull request?",
          "What are repository settings?",
          "What are GitHub Actions?",
          "What is installing an app?"
        ],
        correctResponse: "What are repository settings?",
        explanation: "GitHub Advanced Security is enabled through the repository settings by users with admin permissions."
      },
      {
        clue: "This important aspect of GitHub Advanced Security administration involves overseeing alerts and security features.",
        options: [
          "What is scheduling reviews?",
          "What is security management?",
          "What is automating merges?",
          "What is tracking milestones?"
        ],
        correctResponse: "What is security management?",
        explanation: "Effective administration requires actively managing security alerts and configuring features appropriately."
      },
      {
        clue: "This permission level is required to configure GitHub Advanced Security features in a repository.",
        options: [
          "What is read access?",
          "What is write access?",
          "What is admin access?",
          "What are no special permissions?"
        ],
        correctResponse: "What is admin access?",
        explanation: "Admin access is required to enable and configure GitHub Advanced Security features for repositories."
      },
      {
        clue: "Security policies should be implemented at these three levels for comprehensive coverage.",
        options: [
          "What is repository level only?",
          "What are organization, team, and repository levels?",
          "What are public repos only?",
          "What are external tools only?"
        ],
        correctResponse: "What are organization, team, and repository levels?",
        explanation: "Implementing policies at multiple levels ensures consistent security practices across your entire GitHub presence."
      },
      {
        clue: "This key consideration for large organizations involves extending security practices across multiple teams.",
        options: [
          "What is disabling features?",
          "What is scaling security practices?",
          "What is production-only security?",
          "What is limiting access?"
        ],
        correctResponse: "What is scaling security practices?",
        explanation: "Large organizations must effectively scale security practices across all teams and repositories for comprehensive protection."
      }
    ]
  }
];