# Advanced Quiz Web Application 🧠🎯

![Quiz App Demo](https://i.imgur.com/quiz-demo-gif.gi)  
*Developed as part of my Front-End Developer Internship selection process at StaxTech*

## 🌟 Key Features
- **Multi-Category Quiz Engine**: 
  - General Knowledge | Science | History | Sports
  - Dynamic question loading from JSON database
- **Real-Time Gameplay**:
  - 30-second timer per question with auto-submission
  - Instant answer validation (✓/✗ visual feedback)
- **Advanced Analytics**:
  - Score calculation with percentage
  - Correct/Wrong answer statistics
  - Time-taken metrics
- **Professional UI/UX**:
  - Responsive design (Mobile/Tablet/Desktop)
  - Micro-interactions & animated transitions
  - Accessibility-friendly (keyboard navigable)

## 🛠️ Tech Stack
| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+) |
| **Styling** | CSS Variables, Glassmorphism Effects |
| **Icons** | Font Awesome 6 |
| **Fonts** | Google Fonts (Inter) |
| **Version Control** | Git/GitHub |

## 🚀 Live Deployment
[![Vercel](https://www.linkedin.com/posts/siddharth-deshmukh-b89a72257_activity-7345151590040801280-gDU4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9W8xkBR7Ulrkg5eNMPZTTfB8SOJFvIhq8)](https://siddharth192006.github.io/Quiz/)

## 📂 Code Structure
```bash
quiz-game/
├── index.html            # Main application entry point
├── styles.css            # All styling (BEM methodology)
├── script.js             # Core game logic (400+ LOC)
├── assets/
│   ├── data/             # Question databases
│   │   ├── general.json
│   │   ├── science.json
│   │   └── ...
│   ├── images/           # UI assets
│   └── fonts/            # Custom typography
├── .gitignore            # Version control config
└── README.md             # Project documentation

function loadQuestion() {
  const current = questions[currentIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = current.options.map(opt => 
    `<button class="option" data-answer="${opt}">${opt}</button>`
  ).join('');
  startTimer();
}
