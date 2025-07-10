# GitHub Advanced Security Jeopardy Game

An interactive Jeopardy-style quiz game to help study for the GitHub Advanced Security certification.

## Features

- **True Jeopardy Format**: Clues are given, players respond with questions
- **30 Questions**: Covering all aspects of GitHub Advanced Security

- **6 Categories**: 
  - GitHub Basics
  - CodeQL Power
  - Secret Scanning
  - Dependabot Duties
  - Alert Actions
  - Admin Authority
- **Interactive Gameplay**:
  - Timer countdown (30 seconds per question)
  - Score tracking
  - Daily Double feature
  - Sound effects and music
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm (comes with Node.js)
- GitHub account
- Azure account (for deployment)

### Local Development

1. Clone the repository:

```bash
git clone <your-repo-url>
cd github-security-jeopardy
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open http://localhost:3000 in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deployment to Azure Static Web Apps

### Initial Setup

1. Create an Azure Static Web App:
   - Go to Azure Portal
   - Create a new Static Web App
   - Connect it to your GitHub repository
   - Copy the deployment token

2. Add the deployment token to GitHub:
   - Go to your repository settings
   - Navigate to Secrets and variables > Actions
   - Add a new secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Paste the deployment token

3. Push to main branch:

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

The GitHub Action will automatically build and deploy your app.

## Project Structure

```
github-security-jeopardy/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── index.html             # HTML template
├── src/
│   ├── components/
│   │   ├── Game.js           # Main game component
│   │   └── Game.css          # Game styles
│   ├── data/
│   │   └── questions.js      # Jeopardy questions
│   ├── utils/
│   │   └── SoundManager.js   # Sound effects
│   ├── App.js                # Root component
│   ├── App.css               # App styles
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
├── .babelrc                  # Babel configuration
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
├── webpack.config.js        # Webpack configuration
├── staticwebapp.config.json # Azure configuration
└── README.md                # This file
```

## How to Play

1. Click "START GAME" on the welcome screen
2. Select any dollar amount from the game board
3. Read the clue carefully
4. Choose the correct response (in the form of a question)
5. Get instant feedback with explanations
6. Continue until all questions are answered
7. View your final score and play again!

## Customization

### Adding New Questions

Edit `src/data/questions.js` to add new questions. Follow the format:

```javascript
{
  clue: "The clue text here",
  options: [
    "What is option 1?",
    "What is option 2?",
    "What is option 3?",
    "What is option 4?"
  ],
  correctResponse: "What is the correct answer?",
  explanation: "Explanation of why this is correct"
}
```

### Changing Categories

Modify the categories in `src/data/questions.js`. Each category needs exactly 5 questions.

### Styling

- Edit `src/components/Game.css` for game-specific styles
- Edit `src/App.css` for app-wide styles
- The color scheme uses Jeopardy's classic blue and gold

## Sound Controls

- Click the sound toggle button to enable/disable sound effects
- Sounds include:
  - Theme music
  - Question selection
  - Correct/incorrect answers
  - Daily Double fanfare

## Troubleshooting

### Build Issues

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure you're using Node.js 18.x or higher

### Deployment Issues

- Verify the Azure deployment token is correctly set in GitHub secrets
- Check the Actions tab in GitHub for deployment logs
- Ensure the build output is in the `dist` folder

### Sound Not Working

- Some browsers require user interaction before playing audio
- Click anywhere on the page to enable audio context

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this for your own study purposes!
