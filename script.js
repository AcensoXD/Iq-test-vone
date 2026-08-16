/* =====================================================
   V.ONE — SCRIPT.JS
   V1 PROTOTYPE
===================================================== */


/* =====================================================
   GLOBAL DATA
===================================================== */

const TOTAL_IQ_QUESTIONS = 15;
const IQ_TIME = 45;

let currentQuestion = 0;
let selectedAnswer = null;
let testTimer = null;
let timeLeft = IQ_TIME;

let testAnswers = [];
let testStartTime = 0;


/* =====================================================
   IQ QUESTIONS
===================================================== */

const iqQuestions = [

    {
        category: "LOGIC",
        question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are:",
        options: [
            "Lazzies",
            "Razzies only",
            "Neither",
            "Impossible to know"
        ],
        answer: 0
    },

    {
        category: "NUMBERS",
        question: "What number comes next? 2, 4, 8, 16, ?",
        options: [
            "20",
            "24",
            "32",
            "36"
        ],
        answer: 2
    },

    {
        category: "PATTERNS",
        question: "What comes next? ▲ ▲ ● ▲ ▲ ● ▲ ▲ ?",
        options: [
            "▲",
            "●",
            "■",
            "◆"
        ],
        answer: 1
    },

    {
        category: "LOGIC",
        question: "A clock shows 3:00. What angle is between the hour and minute hands?",
        options: [
            "45°",
            "60°",
            "90°",
            "180°"
        ],
        answer: 2
    },

    {
        category: "NUMBERS",
        question: "What number is missing? 5, 10, 20, 40, ?",
        options: [
            "60",
            "70",
            "80",
            "100"
        ],
        answer: 2
    },

    {
        category: "PATTERNS",
        question: "Which symbol is different from the others?",
        options: [
            "●●●",
            "▲▲▲",
            "■■■",
            "●●▲"
        ],
        answer: 3
    },

    {
        category: "LOGIC",
        question: "If today is Monday, what day will it be 10 days from now?",
        options: [
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        answer: 1
    },

    {
        category: "NUMBERS",
        question: "What is 15% of 200?",
        options: [
            "15",
            "20",
            "30",
            "35"
        ],
        answer: 2
    },

    {
        category: "PATTERNS",
        question: "What comes next? 1, 3, 6, 10, 15, ?",
        options: [
            "18",
            "20",
            "21",
            "25"
        ],
        answer: 2
    },

    {
        category: "LOGIC",
        question: "Which word does NOT belong?",
        options: [
            "Apple",
            "Banana",
            "Carrot",
            "Mango"
        ],
        answer: 2
    },

    {
        category: "NUMBERS",
        question: "If 3 × 4 = 12 and 4 × 5 = 20, then 5 × 6 = ?",
        options: [
            "25",
            "28",
            "30",
            "35"
        ],
        answer: 2
    },

    {
        category: "PATTERNS",
        question: "What comes next? A, C, E, G, ?",
        options: [
            "H",
            "I",
            "J",
            "K"
        ],
        answer: 1
    },

    {
        category: "LOGIC",
        question: "A farmer has 10 sheep. All but 3 run away. How many remain?",
        options: [
            "3",
            "7",
            "10",
            "0"
        ],
        answer: 0
    },

    {
        category: "NUMBERS",
        question: "What number is the odd one out? 2, 4, 6, 9, 10",
        options: [
            "2",
            "6",
            "9",
            "10"
        ],
        answer: 2
    },

    {
        category: "PATTERNS",
        question: "What comes next? ■, ●, ■, ●, ■, ?",
        options: [
            "■",
            "●",
            "▲",
            "◆"
        ],
        answer: 1
    }

];


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateHeader(pageId);


    if (pageId === "dashboard") {
        loadDashboard();
    }

}


/* =====================================================
   HEADER
===================================================== */

function updateHeader(pageId) {

    const header = document.getElementById("mainHeader");

    if (!header) return;

    const loggedIn =
        localStorage.getItem("voneLoggedIn") === "true";

    const nav = document.getElementById("mainNav");

    if (!nav) return;

    if (loggedIn) {

        nav.innerHTML = `
            <button onclick="showPage('dashboard')">
                Dashboard
            </button>

            <button onclick="showPage('boost')">
                Boost
            </button>

            <button onclick="showPage('practice')">
                Practice
            </button>

            <button onclick="showPage('premium')">
                Premium
            </button>

            <button onclick="logout()">
                Logout
            </button>
        `;

    } else {

        nav.innerHTML = `
            <button onclick="showPage('home')">
                Home
            </button>

            <button onclick="showPage('about')">
                About
            </button>

            <button onclick="showPage('premium')">
                Premium
            </button>

            <button onclick="showPage('login')">
                Login
            </button>

            <button onclick="showPage('signup')">
                Sign Up
            </button>
        `;

    }

}


/* =====================================================
   USER STORAGE
===================================================== */

function getUser() {

    const savedUser =
        localStorage.getItem("voneUser");

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch {
        return null;
    }

}


function saveUser(user) {

    localStorage.setItem(
        "voneUser",
        JSON.stringify(user)
    );

}


/* =====================================================
   SIGN UP
===================================================== */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("signupUsername")
                .value
                .trim();

        const password =
            document.getElementById("signupPassword")
                .value;


        if (username.length < 3) {

            alert(
                "Username must be at least 3 characters."
            );

            return;
        }


        if (password.length < 4) {

            alert(
                "Password must be at least 4 characters."
            );

            return;
        }


        if (getUser()) {

            alert(
                "An account already exists on this browser."
            );

            return;
        }


        const user = {

            username: username,

            password: password,

            firstTestCompleted: false,

            iqScore: null,

            analysis: {
                logic: 0,
                numbers: 0,
                patterns: 0,
                speed: 0
            },

            xp: 0,

            level: 1,

            streak: 0,

            bestScore: null,

            boostHistory: [],

            onlineHistory: [],

            isPremium: false

        };


        saveUser(user);


        alert(
            "Account created successfully! 🎉"
        );


        document.getElementById("signupForm").reset();

        showPage("login");

    });

}


/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const username =
            document.getElementById("loginUsername")
                .value
                .trim();

        const password =
            document.getElementById("loginPassword")
                .value;


        const user = getUser();


        if (!user) {

            alert(
                "No account found. Please sign up first."
            );

            return;
        }


        if (
            username.toLowerCase() !==
            user.username.toLowerCase() ||

            password !== user.password
        ) {

            alert(
                "Incorrect username or password."
            );

            return;
        }


        localStorage.setItem(
            "voneLoggedIn",
            "true"
        );


        loginForm.reset();


        if (!user.firstTestCompleted) {

            alert(
                "Welcome to V.one! 🧠\n\nYour first step is the baseline assessment."
            );

            startIQTest();

        } else {

            showPage("dashboard");

        }

    });

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "voneLoggedIn"
    );

    showPage("home");

}


/* =====================================================
   FIRST IQ TEST
===================================================== */

function startIQTest() {

    if (!getUser()) {

        showPage("signup");

        return;
    }


    currentQuestion = 0;

    selectedAnswer = null;

    testAnswers = [];

    timeLeft = IQ_TIME;

    testStartTime = Date.now();


    clearInterval(testTimer);


    showPage("iqTest");


    loadQuestion();


    startTimer();

}


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {

    const question =
        iqQuestions[currentQuestion];


    if (!question) {

        finishIQTest();

        return;
    }


    document.getElementById("questionNumber")
        .textContent =
        currentQuestion + 1;


    document.getElementById("totalQuestions")
        .textContent =
        TOTAL_IQ_QUESTIONS;


    document.getElementById("questionCategory")
        .textContent =
        question.category;


    document.getElementById("questionText")
        .textContent =
        question.question;


    const options =
        document.getElementById("answerOptions");


    options.innerHTML = "";


    selectedAnswer = null;


    const nextButton =
        document.getElementById("nextQuestionBtn");


    nextButton.disabled = true;


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-option";


            button.textContent =
                option;


            button.onclick =
                function() {

                    selectAnswer(
                        index,
                        button
                    );

                };


            options.appendChild(button);

        }
    );


    updateProgress();

}


/* =====================================================
   SELECT ANSWER
===================================================== */

function selectAnswer(
    answerIndex,
    button
) {

    selectedAnswer = answerIndex;


    const buttons =
        document.querySelectorAll(
            ".answer-option"
        );


    buttons.forEach(btn => {

        btn.classList.remove(
            "selected"
        );

    });


    button.classList.add(
        "selected"
    );


    document.getElementById(
        "nextQuestionBtn"
    ).disabled = false;

}


/* =====================================================
   NEXT QUESTION
===================================================== */

const nextButton =
    document.getElementById(
        "nextQuestionBtn"
    );


if (nextButton) {

    nextButton.addEventListener(
        "click",
        function() {

            if (selectedAnswer === null) {
                return;
            }


            testAnswers.push({
                question:
                    currentQuestion,

                answer:
                    selectedAnswer
            });


            currentQuestion++;


            if (
                currentQuestion >=
                TOTAL_IQ_QUESTIONS
            ) {

                finishIQTest();

            } else {

                loadQuestion();

            }

        }
    );

}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    timeLeft = IQ_TIME;


    updateTimer();


    testTimer =
        setInterval(
            function() {

                timeLeft--;

                updateTimer();


                if (timeLeft <= 0) {

                    clearInterval(
                        testTimer
                    );

                    finishIQTest();

                }

            },
            1000
        );

}


function updateTimer() {

    const timer =
        document.getElementById(
            "testTimer"
        );


    if (timer) {

        timer.textContent =
            Math.max(
                0,
                timeLeft
            );

    }

}


/* =====================================================
   PROGRESS BAR
===================================================== */

function updateProgress() {

    const progress =
        document.getElementById(
            "testProgress"
        );


    if (!progress) return;


    const percentage =
        (
            currentQuestion /
            TOTAL_IQ_QUESTIONS
        ) * 100;


    progress.style.width =
        percentage + "%";

}


/* =====================================================
   FINISH IQ TEST
===================================================== */

function finishIQTest() {

    clearInterval(testTimer);


    /*
       If the timer ended before every question,
       unanswered questions are counted as incorrect.
    */


    let correct = 0;


    const categoryStats = {

        LOGIC: {
            correct: 0,
            total: 0
        },

        NUMBERS: {
            correct: 0,
            total: 0
        },

        PATTERNS: {
            correct: 0,
            total: 0
        }

    };


    iqQuestions.forEach(
        (question, index) => {

            const answer =
                testAnswers.find(
                    item =>
                    item.question === index
                );


            categoryStats[
                question.category
            ].total++;


            if (
                answer &&
                answer.answer ===
                question.answer
            ) {

                correct++;

                categoryStats[
                    question.category
                ].correct++;

            }

        }
    );


    const accuracy =
        correct /
        TOTAL_IQ_QUESTIONS;


    /*
       This is a game score, NOT a
       scientifically validated IQ.
    */

    const iqScore =
        Math.round(
            80 + accuracy * 55
        );


    const logic =
        percentage(
            categoryStats.LOGIC.correct,
            categoryStats.LOGIC.total
        );


    const numbers =
        percentage(
            categoryStats.NUMBERS.correct,
            categoryStats.NUMBERS.total
        );


    const patterns =
        percentage(
            categoryStats.PATTERNS.correct,
            categoryStats.PATTERNS.total
        );


    /*
       Speed score based on how much
       of the 45 seconds remained.
    */

    const speed =
        Math.round(
            Math.max(
                0,
                (timeLeft / IQ_TIME) * 100
            )
        );


    const user = getUser();


    if (!user) {
        return;
    }


    user.firstTestCompleted = true;

    user.iqScore = iqScore;


    user.analysis = {

        logic: logic,

        numbers: numbers,

        patterns: patterns,

        speed: speed

    };


    user.bestScore = iqScore;


    user.xp += 100;


    user.level =
        calculateLevel(
            user.xp
        );


    saveUser(user);


    displayResults(
        iqScore,
        logic,
        numbers,
        patterns,
        speed
    );

}


/* =====================================================
   PERCENTAGE
===================================================== */

function percentage(
    correct,
    total
) {

    if (total === 0) {
        return 0;
    }


    return Math.round(
        (correct / total) * 100
    );

}


/* =====================================================
   LEVEL SYSTEM
===================================================== */

function calculateLevel(xp) {

    return Math.floor(
        xp / 250
    ) + 1;

}


/* =====================================================
   DISPLAY IQ RESULTS
===================================================== */

function displayResults(
    score,
    logic,
    numbers,
    patterns,
    speed
) {

    document.getElementById(
        "iqScore"
    ).textContent = score;


    document.getElementById(
        "logicScore"
    ).textContent =
        logic + "%";


    document.getElementById(
        "numberScore"
    ).textContent =
        numbers + "%";


    document.getElementById(
        "patternScore"
    ).textContent =
        patterns + "%";


    document.getElementById(
        "speedScore"
    ).textContent =
        speed + "%";


    let description;


    if (score >= 120) {

        description =
            "Excellent performance! You showed strong reasoning across the assessment.";

    } else if (score >= 105) {

        description =
            "Great start! Your performance shows several strong reasoning skills.";

    } else if (score >= 90) {

        description =
            "Good foundation. Keep practicing to strengthen your reasoning skills.";

    } else {

        description =
            "This is your starting point. Keep training and use your analysis to guide your practice.";

    }


    document.getElementById(
        "resultDescription"
    ).textContent =
        description;


    showPage("iqResult");

}


/* =====================================================
   DASHBOARD
===================================================== */

function loadDashboard() {

    const user = getUser();


    if (!user) {

        showPage("login");

        return;
    }


    document.getElementById(
        "dashboardUsername"
    ).textContent =
        user.username;


    document.getElementById(
        "playerLevel"
    ).textContent =
        user.level;


    document.getElementById(
        "dashboardIQ"
    ).textContent =
        user.iqScore || "—";


    document.getElementById(
        "playerXP"
    ).textContent =
        user.xp;


    document.getElementById(
        "playerStreak"
    ).textContent =
        user.streak;


    document.getElementById(
        "bestScore"
    ).textContent =
        user.bestScore || "—";


    const analysis =
        user.analysis || {};


    setSkillBar(
        "logicBar",
        analysis.logic || 0
    );


    setSkillBar(
        "numberBar",
        analysis.numbers || 0
    );


    setSkillBar(
        "patternBar",
        analysis.patterns || 0
    );


    setSkillBar(
        "speedBar",
        analysis.speed || 0
    );

}


/* =====================================================
   SKILL BAR
===================================================== */

function setSkillBar(
    id,
    value
) {

    const bar =
        document.getElementById(id);


    if (bar) {

        bar.style.width =
            Math.max(
                0,
                Math.min(
                    100,
                    value
                )
            ) + "%";

    }

}


/* =====================================================
   BOOST IQ LIMIT
===================================================== */

const BOOST_LIMIT = 10;

const FOUR_HOURS =
    4 * 60 * 60 * 1000;


function getBoostHistory() {

    const user = getUser();

    if (!user) return [];


    if (!Array.isArray(
        user.boostHistory
    )) {

        user.boostHistory = [];

        saveUser(user);

    }


    return user.boostHistory;

}


function cleanOldBoostSessions() {

    const user = getUser();

    if (!user) return;


    const now = Date.now();


    user.boostHistory =
        (user.boostHistory || [])
        .filter(
            time =>
            now - time <
            FOUR_HOURS
        );


    saveUser(user);

}


function getBoostRemaining() {

    cleanOldBoostSessions();


    const history =
        getBoostHistory();


    return Math.max(
        0,
        BOOST_LIMIT -
        history.length
    );

}


/* =====================================================
   START BOOST
===================================================== */

function startBoost() {

    const user = getUser();


    if (!user) {

        showPage("login");

        return;
    }


    if (user.isPremium) {

        alert(
            "Premium account: Boost is unlimited! 💎"
        );

        return;
    }


    const remaining =
        getBoostRemaining();


    if (remaining <= 0) {

        alert(
            "You have used your 10 free Boost sessions. Try again after the 4-hour limit resets."
        );

        return;
    }


    user.boostHistory =
        user.boostHistory || [];


    user.boostHistory.push(
        Date.now()
    );


    user.xp += 25;

    user.level =
        calculateLevel(
            user.xp
        );


    saveUser(user);


    alert(
        "Boost session started! 🚀\n\n10 questions."
    );

}


/* =====================================================
   PRACTICE
===================================================== */

function startPractice() {

    const user = getUser();


    if (!user) {

        showPage("login");

        return;
    }


    alert(
        "Practice mode is unlimited. 🏋️\n\nThe full practice game will be added next."
    );

}


/* =====================================================
   ONLINE LIMIT
===================================================== */

const ONLINE_LIMIT = 5;


function getOnlineHistory() {

    const user = getUser();

    if (!user) return [];


    if (!Array.isArray(
        user.onlineHistory
    )) {

        user.onlineHistory = [];

        saveUser(user);

    }


    return user.onlineHistory;

}


function cleanOnlineHistory() {

    const user = getUser();

    if (!user) return;


    const now = Date.now();


    user.onlineHistory =
        (user.onlineHistory || [])
        .filter(
            time =>
            now - time <
            FOUR_HOURS
        );


    saveUser(user);

}


function getOnlineRemaining() {

    cleanOnlineHistory();


    const history =
        getOnlineHistory();


    return Math.max(
        0,
        ONLINE_LIMIT -
        history.length
    );

}


/* =====================================================
   PLAY ONLINE
===================================================== */

function startOnline() {

    const user = getUser();


    if (!user) {

        showPage("login");

        return;
    }


    if (user.isPremium) {

        alert(
            "Premium account: Unlimited online games! 💎"
        );

        return;
    }


    const remaining =
        getOnlineRemaining();


    if (remaining <= 0) {

        alert(
            "You have used your 5 free online games. Try again after the 4-hour limit resets."
        );

        return;
    }


    user.onlineHistory =
        user.onlineHistory || [];


    user.onlineHistory.push(
        Date.now()
    );


    saveUser(user);


    alert(
        "Online matchmaking will be connected to the real multiplayer server later. 🌐"
    );

}


/* =====================================================
   PREMIUM
===================================================== */

function startPremium() {

    alert(
        "💎 V.one Premium\n\nReal subscription payments will be connected in a later version."
    );

}


/* =====================================================
   AUTO LOGIN
===================================================== */

window.addEventListener(
    "load",
    function() {

        const loggedIn =
            localStorage.getItem(
                "voneLoggedIn"
            ) === "true";


        const user =
            getUser();


        if (
            loggedIn &&
            user
        ) {

            showPage("dashboard");

        } else {

            showPage("home");

        }

    }
);


/* =====================================================
   SAFETY CHECK
===================================================== */

window.addEventListener(
    "beforeunload",
    function() {

        clearInterval(
            testTimer
        );

    }
);
