// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

const htmlQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyperlinking Text Management Language",
    ],
    answer: 0, // Correct option index
  },
  {
    question: "Which HTML tag is used to define the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2,
  },
  {
    question: "What is the purpose of the <alt> attribute in the <img> tag?",
    options: [
      "To style the image",
      "To specify an alternate text for the image",
      "To link the image to another page",
      "To define the size of the image",
    ],
    answer: 1,
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<hyperlink>"],
    answer: 1,
  },
  {
    question: "What is the correct way to include a comment in HTML?",
    options: [
      "// This is a comment",
      "/* This is a comment */",
      "<!-- This is a comment -->",
      "<comment> This is a comment </comment>",
    ],
    answer: 2,
  },
  {
    question: "Which attribute is used to open a link in a new tab?",
    options: ["target='_blank'", "newtab='true'", "rel='new'", "open='new'"],
    answer: 0,
  },
  {
    question: "What is the purpose of the <br> tag in HTML?",
    options: [
      "To add a horizontal line",
      "To break the line and move to the next",
      "To create a blank space",
      "To add bold text",
    ],
    answer: 1,
  },
  {
    question: "Which tag is used to define a table in HTML?",
    options: ["<table>", "<tr>", "<td>", "<tab>"],
    answer: 0,
  },
  {
    question: "What does the <meta> tag do in an HTML document?",
    options: [
      "Defines the metadata of the document",
      "Creates a footer",
      "Adds multimedia content",
      "Links external stylesheets",
    ],
    answer: 0,
  },
  {
    question: "Which input type is used to create a password field?",
    options: ["text", "password", "secure", "hidden"],
    answer: 1,
  },
];

const cssQuestions = [
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
    ],
    answer: 1, // Correct option index
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "background-color", "bgcolor", "backcolor"],
    answer: 1,
  },
  {
    question: "What is the purpose of the 'z-index' property in CSS?",
    options: [
      "To set the zoom level of an element",
      "To change the stacking order of elements",
      "To control the transparency of an element",
      "To set the margin of an element",
    ],
    answer: 1,
  },
  {
    question: "Which CSS property is used to change the font of an element?",
    options: ["font-style", "font-family", "font-weight", "font-size"],
    answer: 1,
  },
  {
    question: "How do you make a text bold in CSS?",
    options: [
      "font-style: bold;",
      "text-bold: true;",
      "font-weight: bold;",
      "text-style: bold;",
    ],
    answer: 2,
  },
  {
    question:
      "Which property is used to make an element's text align to the center?",
    options: ["align", "text-align", "vertical-align", "justify"],
    answer: 1,
  },
  {
    question: "What does the 'position: absolute;' property do?",
    options: [
      "Positions the element relative to its parent",
      "Positions the element relative to its closest positioned ancestor",
      "Positions the element relative to the viewport",
      "Positions the element in a fixed location",
    ],
    answer: 1,
  },
  {
    question:
      "Which property is used to control the space between lines of text?",
    options: ["line-height", "spacing", "text-space", "line-spacing"],
    answer: 0,
  },
  {
    question: "How do you add a comment in CSS?",
    options: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "# This is a comment",
      "/* This is a comment */",
    ],
    answer: 3,
  },
  {
    question: "What is the default position of elements in CSS?",
    options: ["relative", "absolute", "static", "fixed"],
    answer: 2,
  },
];

let ques = document.querySelector(".ques");
let btn = document.querySelector(".butn");
let opt = document.querySelector(".option");
let quesnum = document.querySelector(".num");

let userOpt;
let score = 0;

opt.addEventListener("click", (e) => {
  userOpt = e.target.innerText;
  if (userOpt === cssQuestions[count].options[cssQuestions[count].answer]) {
    score++;
    console.log(score);
  }
});

let cssQuesFunction = () => {
  count++;
  
  let count = -1;
  if (count < cssQuestions.length)
    quesnum.innerText = `Question No # ${
      count < 9 ? "0" + (1 + count) : 1 + count
    }`;
  ques.innerText = cssQuestions[count].question;

  opt.innerHTML = "";
  for (const options of cssQuestions[count].options) {
    opt.innerHTML += `<div class="col-12 col-sm-6 d-flex align-content-stretch">
                            <div class="p-3 rounded-3 w-100 opt">${options}</div>
                        </div>`;
  }
};
