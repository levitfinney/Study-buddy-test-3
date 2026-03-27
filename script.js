function generateStudy() {
    let topic = document.getElementById("topicInput").value.trim();
    let output = document.getElementById("output");

    if (!topic) {
        output.innerHTML = "❌ Enter a topic.";
        return;
    }

    let data = interpretTopic(topic);

    output.innerHTML = `
        <h2>📖 ${capitalize(topic)}</h2>

        <h3>🧠 Definition</h3>
        <p>${data.definition}</p>

        <h3>🔍 Explanation</h3>
        <p>${data.explanation}</p>

        <h3>🌍 Examples</h3>
        <ul>${data.examples}</ul>

        <h3>📌 Study Guide</h3>
        ${data.guide}

        <h3>❓ Quiz</h3>
        ${data.quiz}
        <button onclick="gradeQuiz()">Check Answers</button>
        <div id="result"></div>
    `;
}

function interpretTopic(input) {
    let words = input.toLowerCase().split(" ");
    let category = detectCategory(words);
    let subject = words.join(" ");

    return {
        definition: smartDefinition(subject, category),
        explanation: smartExplanation(subject, category),
        examples: generateExamples(subject),
        guide: buildGuide(subject),
        quiz: buildQuiz(subject)
    };
}

function detectCategory(words) {
    const science = ["atom","cell","energy","force","gravity","dna","wave","matter","planet","star","galaxy","electric","black","hole"];
    const history = ["war","empire","revolution","battle","king","ancient","civilization","mayan","aztec","rome","greek","egypt"];
    const math = ["equation","algebra","geometry","number","fraction","angle","function","graph"];

    for (let word of words) {
        if (science.includes(word)) return "science";
        if (history.includes(word)) return "history";
        if (math.includes(word)) return "math";
    }

    return "general";
}

function smartDefinition(subject, category) {
    switch(category) {
        case "science":
            return `${capitalize(subject)} is a scientific concept that explains how parts of the natural world interact or behave.`;
        case "history":
            return `${capitalize(subject)} refers to a historical civilization, event, or system that influenced human development.`;
        case "math":
            return `${capitalize(subject)} is a mathematical concept used to represent relationships, patterns, or problem-solving methods.`;
        default:
            return `${capitalize(subject)} is a concept that can be understood by studying its meaning and real-world use.`;
    }
}

function smartExplanation(subject, category) {
    switch(category) {
        case "science":
            return `${capitalize(subject)} involves cause-and-effect relationships in nature. Scientists study it through observation and experimentation to understand how systems work.`;
        case "history":
            return `${capitalize(subject)} is important because it shows how people lived, interacted, and influenced the world. It connects past events to modern society.`;
        case "math":
            return `${capitalize(subject)} works by applying logical rules and formulas. It helps solve problems and understand patterns in numbers or shapes.`;
        default:
            return `${capitalize(subject)} can be understood by analyzing its parts, how they connect, and how it applies in real life.`;
    }
}

function generateExamples(subject) {
    return `
        <li>Real-life example of ${subject}</li>
        <li>Where ${subject} is commonly used</li>
        <li>Why ${subject} matters in everyday life</li>
    `;
}

function buildGuide(subject) {
    return `
    <ul>
        <li>Define ${subject}</li>
        <li>Understand how it works</li>
        <li>Identify key components</li>
        <li>Study real-world examples</li>
        <li>Explain its importance</li>
    </ul>`;
}

function buildQuiz(subject) {
    return `
    <form id="quizForm">
        <p>1. What is ${subject}?</p>
        <input type="text" name="q1"><br>

        <p>2. Why is ${subject} important?</p>
        <input type="text" name="q2"><br>

        <p>3. Give an example of ${subject}.</p>
        <input type="text" name="q3"><br>
    </form>`;
}

function gradeQuiz() {
    let result = document.getElementById("result");
    result.innerHTML = "<p class='correct'>✅ Answers submitted! Review them yourself for understanding.</p>";
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
