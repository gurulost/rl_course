// Create SVG diagrams for RL concepts
function createRLProcessDiagram() {
    return `
    <svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Agent -->
        <rect x="100" y="100" width="120" height="80" rx="10" fill="#4a6baf" />
        <text x="160" y="145" text-anchor="middle" fill="white" font-size="18">Agent</text>
        
        <!-- Environment -->
        <rect x="380" y="100" width="120" height="80" rx="10" fill="#6c63ff" />
        <text x="440" y="145" text-anchor="middle" fill="white" font-size="18">Environment</text>
        
        <!-- Action Arrow -->
        <path d="M 220 120 L 380 120" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
        <text x="300" y="110" text-anchor="middle" fill="#333" font-size="14">Action</text>
        
        <!-- State & Reward Arrow -->
        <path d="M 380 160 L 220 160" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
        <text x="300" y="180" text-anchor="middle" fill="#333" font-size="14">State, Reward</text>
        
        <!-- Arrowhead marker -->
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
            </marker>
        </defs>
    </svg>
    `;
}

// Create SVG for MDP diagram
function createMDPDiagram() {
    return `
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
        <!-- States -->
        <circle cx="100" cy="200" r="40" fill="#4a6baf" />
        <text x="100" y="205" text-anchor="middle" fill="white" font-size="18">S₁</text>
        
        <circle cx="300" cy="100" r="40" fill="#4a6baf" />
        <text x="300" y="105" text-anchor="middle" fill="white" font-size="18">S₂</text>
        
        <circle cx="300" cy="300" r="40" fill="#4a6baf" />
        <text x="300" y="305" text-anchor="middle" fill="white" font-size="18">S₃</text>
        
        <circle cx="500" cy="200" r="40" fill="#4a6baf" />
        <text x="500" y="205" text-anchor="middle" fill="white" font-size="18">S₄</text>
        
        <!-- Transitions -->
        <path d="M 130 175 Q 200 100 260 100" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
        <text x="180" y="110" text-anchor="middle" fill="#333" font-size="14">a₁, r=1</text>
        
        <path d="M 130 225 Q 200 300 260 300" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
        <text x="180" y="290" text-anchor="middle" fill="#333" font-size="14">a₂, r=-1</text>
        
        <path d="M 340 100 Q 450 100 490 170" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
        <text x="420" y="110" text-anchor="middle" fill="#333" font-size="14">a₁, r=2</text>
        
        <path d="M 340 300 Q 450 300 490 230" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
        <text x="420" y="290" text-anchor="middle" fill="#333" font-size="14">a₁, r=1</text>
        
        <!-- Arrowhead marker -->
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
            </marker>
        </defs>
    </svg>
    `;
}

// Create SVG for algorithm comparison
function createAlgorithmComparisonChart() {
    return `
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Chart background -->
        <rect x="50" y="50" width="500" height="300" fill="#f8f9fa" stroke="#ddd" />
        
        <!-- Y-axis -->
        <line x1="50" y1="50" x2="50" y2="350" stroke="#333" stroke-width="2" />
        <text x="30" y="200" text-anchor="middle" fill="#333" font-size="14" transform="rotate(-90, 30, 200)">Performance</text>
        
        <!-- X-axis -->
        <line x1="50" y1="350" x2="550" y2="350" stroke="#333" stroke-width="2" />
        <text x="300" y="380" text-anchor="middle" fill="#333" font-size="14">Training Steps</text>
        
        <!-- Q-learning curve -->
        <path d="M 50 350 C 100 300, 200 200, 300 150 C 400 120, 500 100, 550 80" stroke="#4a6baf" stroke-width="3" fill="none" />
        <text x="570" y="80" text-anchor="start" fill="#4a6baf" font-size="14">Q-learning</text>
        
        <!-- SARSA curve -->
        <path d="M 50 350 C 100 320, 200 250, 300 200 C 400 170, 500 150, 550 130" stroke="#6c63ff" stroke-width="3" fill="none" />
        <text x="570" y="130" text-anchor="start" fill="#6c63ff" font-size="14">SARSA</text>
        
        <!-- Policy Gradient curve -->
        <path d="M 50 350 C 100 340, 150 300, 200 280 C 300 200, 400 120, 550 100" stroke="#ff6584" stroke-width="3" fill="none" />
        <text x="570" y="100" text-anchor="start" fill="#ff6584" font-size="14">Policy Gradient</text>
    </svg>
    `;
}

// Create SVG for exploration-exploitation diagram
function createExplorationExploitationDiagram() {
    return `
    <svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Balance scale -->
        <line x1="300" y1="100" x2="300" y2="150" stroke="#333" stroke-width="4" />
        <line x1="200" y1="150" x2="400" y2="150" stroke="#333" stroke-width="4" />
        
        <!-- Left pan (Exploration) -->
        <path d="M 200 150 L 180 200 L 220 200 Z" fill="#4a6baf" stroke="#333" stroke-width="2" />
        <text x="200" y="230" text-anchor="middle" fill="#333" font-size="18">Exploration</text>
        <text x="200" y="250" text-anchor="middle" fill="#333" font-size="14">Discover new strategies</text>
        
        <!-- Right pan (Exploitation) -->
        <path d="M 400 150 L 380 200 L 420 200 Z" fill="#6c63ff" stroke="#333" stroke-width="2" />
        <text x="400" y="230" text-anchor="middle" fill="#333" font-size="18">Exploitation</text>
        <text x="400" y="250" text-anchor="middle" fill="#333" font-size="14">Use known good strategies</text>
        
        <!-- Balance point -->
        <circle cx="300" cy="100" r="10" fill="#ff6584" />
        <text x="300" y="80" text-anchor="middle" fill="#333" font-size="18">Balance</text>
    </svg>
    `;
}

// Function to load diagrams into the course
function loadDiagrams() {
    // Add RL Process Diagram to Module 1
    const lesson1_2 = document.querySelector('#lesson1-2 .lesson-content');
    if (lesson1_2) {
        const rlProcessDiagram = document.createElement('div');
        rlProcessDiagram.className = 'diagram';
        rlProcessDiagram.innerHTML = createRLProcessDiagram();
        rlProcessDiagram.innerHTML += '<p class="diagram-caption">Figure 1: The Reinforcement Learning Process</p>';
        lesson1_2.appendChild(rlProcessDiagram);
    }
    
    // Add MDP Diagram to Module 1
    const lesson1_2b = document.querySelector('#lesson1-2 .lesson-content');
    if (lesson1_2b) {
        const mdpDiagram = document.createElement('div');
        mdpDiagram.className = 'diagram';
        mdpDiagram.innerHTML = createMDPDiagram();
        mdpDiagram.innerHTML += '<p class="diagram-caption">Figure 2: Markov Decision Process (MDP) Example</p>';
        lesson1_2b.appendChild(mdpDiagram);
    }
    
    // Add Algorithm Comparison Chart to Module 2
    const module2Content = document.querySelector('#module2 .module-content');
    if (module2Content) {
        const algoComparisonChart = document.createElement('div');
        algoComparisonChart.className = 'diagram';
        algoComparisonChart.innerHTML = createAlgorithmComparisonChart();
        algoComparisonChart.innerHTML += '<p class="diagram-caption">Figure 3: Performance Comparison of RL Algorithms</p>';
        module2Content.appendChild(algoComparisonChart);
    }
    
    // Add Exploration-Exploitation Diagram to Module 3
    const module3Content = document.querySelector('#module3 .module-content');
    if (module3Content) {
        const explorationDiagram = document.createElement('div');
        explorationDiagram.className = 'diagram';
        explorationDiagram.innerHTML = createExplorationExploitationDiagram();
        explorationDiagram.innerHTML += '<p class="diagram-caption">Figure 4: The Exploration-Exploitation Dilemma</p>';
        module3Content.appendChild(explorationDiagram);
    }
}

// Create interactive code editor component
class CodeEditor {
    constructor(containerId, language = 'python', initialCode = '') {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.language = language;
        this.initialCode = initialCode;
        
        this.createEditor();
    }
    
    createEditor() {
        // Create editor elements
        const editorContainer = document.createElement('div');
        editorContainer.className = 'code-editor';
        
        // Create header with language indicator
        const header = document.createElement('div');
        header.className = 'editor-header';
        header.innerHTML = `<span class="language-indicator">${this.language}</span>`;
        
        // Create textarea for code
        const textarea = document.createElement('textarea');
        textarea.className = 'editor-textarea';
        textarea.value = this.initialCode;
        textarea.spellcheck = false;
        
        // Create run button
        const runButton = document.createElement('button');
        runButton.className = 'run-button';
        runButton.textContent = 'Run Code';
        runButton.addEventListener('click', () => this.runCode(textarea.value));
        
        // Create output area
        const output = document.createElement('div');
        output.className = 'editor-output';
        output.innerHTML = '<p class="output-placeholder">Code output will appear here...</p>';
        
        // Assemble editor
        editorContainer.appendChild(header);
        editorContainer.appendChild(textarea);
        editorContainer.appendChild(runButton);
        editorContainer.appendChild(output);
        
        this.container.appendChild(editorContainer);
        this.outputElement = output;
    }
    
    runCode(code) {
        // In a real implementation, this would execute the code
        // For this demo, we'll just display the code and a simulated output
        this.outputElement.innerHTML = '';
        
        const codeElement = document.createElement('pre');
        codeElement.textContent = 'Executing code:\n' + code;
        
        const resultElement = document.createElement('pre');
        resultElement.className = 'output-result';
        
        // Simulate different outputs based on code content
        if (code.includes('print')) {
            resultElement.textContent = 'Output:\n' + this.simulateOutput(code);
        } else if (code.includes('import')) {
            resultElement.textContent = 'Modules imported successfully.';
        } else {
            resultElement.textContent = 'Code executed without output.';
        }
        
        this.outputElement.appendChild(codeElement);
        this.outputElement.appendChild(resultElement);
    }
    
    simulateOutput(code) {
        // Very simple simulation of Python print statements
        const printRegex = /print\(['"](.+?)['"]\)/g;
        let output = '';
        let match;
        
        while ((match = printRegex.exec(code)) !== null) {
            output += match[1] + '\n';
        }
        
        return output || 'No print statements found.';
    }
}

// Sample code snippets
const qLearningCode = `import numpy as np

# Q-learning implementation
def q_learning(env, num_episodes, alpha=0.1, gamma=0.99, epsilon=0.1):
    # Initialize Q-table
    q_table = np.zeros([env.observation_space.n, env.action_space.n])
    
    for i in range(num_episodes):
        state = env.reset()
        done = False
        
        while not done:
            # Epsilon-greedy action selection
            if np.random.random() < epsilon:
                action = env.action_space.sample()  # Explore
            else:
                action = np.argmax(q_table[state, :])  # Exploit
            
            # Take action and observe next state and reward
            next_state, reward, done, _ = env.step(action)
            
            # Q-learning update
            old_value = q_table[state, action]
            next_max = np.max(q_table[next_state, :])
            
            # Bellman equation
            new_value = old_value + alpha * (reward + gamma * next_max - old_value)
            q_table[state, action] = new_value
            
            state = next_state
    
    return q_table

print("Q-learning algorithm ready to use!")`;

// Function to add code examples
function addCodeExamples() {
    // Add Q-learning code example to Module 2
    const module2Content = document.querySelector('#module2 .module-content');
    if (module2Content) {
        const codeContainer = document.createElement('div');
        codeContainer.id = 'q-learning-code';
        codeContainer.className = 'code-container';
        module2Content.appendChild(codeContainer);
        
        new CodeEditor('q-learning-code', 'python', qLearningCode);
    }
}

// Function to create and add quiz components
function createQuizzes() {
    // Create a basic quiz for Module 1
    const module1Quiz = {
        title: "Reinforcement Learning Basics Quiz",
        questions: [
            {
                question: "What is the primary goal of reinforcement learning?",
                options: [
                    "To classify data into categories",
                    "To predict values based on labeled examples",
                    "To learn optimal behavior through trial and error",
                    "To cluster similar data points together"
                ],
                correctAnswer: 2
            },
            {
                question: "Which of the following is NOT a core component of reinforcement learning?",
                options: [
                    "Agent",
                    "Environment",
                    "Labeled dataset",
                    "Reward signal"
                ],
                correctAnswer: 2
            },
            {
                question: "What does the 'policy' refer to in reinforcement learning?",
                options: [
                    "The rules of the environment",
                    "The agent's strategy for choosing actions",
                    "The reward calculation method",
                    "The termination conditions"
                ],
                correctAnswer: 1
            }
        ]
    };
    
    // Add quiz to Module 1
    const module1Content = document.querySelector('#module1 .module-content');
    if (module1Content) {
        const quizContainer = document.createElement('div');
        quizContainer.className = 'quiz-container';
        quizContainer.innerHTML = `
            <h3>${module1Quiz.title}</h3>
            <div class="quiz-questions"></div>
            <button class="submit-quiz">Submit Answers</button>
            <div class="quiz-results"></div>
        `;
        module1Content.appendChild(quizContainer);
        
        const questionsContainer = quizContainer.querySelector('.quiz-questions');
        
        // Add questions
        module1Quiz.questions.forEach((q, qIndex) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'quiz-question';
            questionElement.innerHTML = `<p class="question-text">${qIndex + 1}. ${q.question}</p>`;
            
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'question-options';
            
            // Add options
            q.options.forEach((option, oIndex) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.innerHTML = `
                    <input type="radio" id="q${qIndex}_o${oIndex}" name="q${qIndex}" value="${oIndex}">
                    <label for="q${qIndex}_o${oIndex}">${option}</label>
                `;
                optionsContainer.appendChild(optionElement);
            });
            
            questionElement.appendChild(optionsContainer);
            questionsContainer.appendChild(questionElement);
        });
        
        // Add submit button functionality
        const submitButton = quizContainer.querySelector('.submit-quiz');
        const resultsContainer = quizContainer.querySelector('.quiz-results');
        
        submitButton.addEventListener('click', () => {
            let score = 0;
            let feedback = '';
            
            module1Quiz.questions.forEach((q, qIndex) => {
                const selectedOption = document.querySelector(`input[name="q${qIndex}"]:checked`);
                if (selectedOption) {
                    const selectedValue = parseInt(selectedOption.value);
                    if (selectedValue === q.correctAnswer) {
                        score++;
                        feedback += `<p>Question ${qIndex + 1}: Correct!</p>`;
                    } else {
                        feedback += `<p>Question ${qIndex + 1}: Incorrect. The correct answer is "${q.options[q.correctAnswer]}".</p>`;
                    }
                } else {
                    feedback += `<p>Question ${qIndex + 1}: Not answered.</p>`;
                }
            });
            
            resultsContainer.innerHTML = `
                <h4>Quiz Results</h4>
                <p>Your score: ${score}/${module1Quiz.questions.length}</p>
                <div class="feedback">${feedback}</div>
            `;
        });
    }
}

// Function to initialize all multimodal content
function initMultimodalContent() {
    // Load SVG diagrams
    loadDiagrams();
    
    // Add code examples
    addCodeExamples();
    
    // Create quizzes
    createQuizzes();
    
    console.log('Multimodal content initialized');
}

// Add to the main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize multimodal content when the page loads
    initMultimodalContent();
});
