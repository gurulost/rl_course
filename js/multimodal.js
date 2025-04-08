// Create SVG diagrams for RL concepts
/* Remove function createRLProcessDiagram() { ... } */

// Create SVG for MDP diagram
/* Remove function createMDPDiagram() { ... } */

// Create SVG for algorithm comparison
/* Remove function createAlgorithmComparisonChart() { ... } */

// Create SVG for exploration-exploitation diagram
/* Remove function createExplorationExploitationDiagram() { ... } */

// Function to load diagrams specific to a lesson
function loadDiagramsForLesson(lessonElement) {
    const lessonId = lessonElement.id;
    const contentDiv = lessonElement.querySelector('.lesson-content');
    if (!contentDiv) return;

    // Helper function to create and insert diagram images into a specific container
    function insertDiagram(container, imagePath, captionText) {
        // Check if diagram already added (optional, safety check)
        // Simple check based on src might be fragile if paths change
        if (container.querySelector(`img[src="${imagePath}"]`)) return;

        const diagramDiv = document.createElement('div');
        diagramDiv.className = 'diagram fade-in';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = captionText || 'Diagram';
        img.loading = 'lazy'; // Add lazy loading for images
        
        diagramDiv.appendChild(img);
        
        if (captionText) {
            const caption = document.createElement('p');
            caption.className = 'diagram-caption';
            caption.textContent = captionText;
            diagramDiv.appendChild(caption);
        }
        
        container.appendChild(diagramDiv);
    }

    // --- Define which diagrams belong to which lessons --- 
    // This mapping logic needs to be maintained
    switch (lessonId) {
        case 'lesson1-2': // Core Components of RL
            insertDiagram(contentDiv, 'images/rl-process.svg', 'Figure 1: The Reinforcement Learning Process');
            insertDiagram(contentDiv, 'images/mdp.svg', 'Figure 2: Markov Decision Process (MDP) Example');
            break;
        // Add cases for other lessons that should have diagrams
        // case 'lessonX-Y':
        //     insertDiagram(contentDiv, 'images/some-other-diagram.svg', 'Figure Z: ...');
        //     break;
    }
    
    // Add diagrams that might belong to module-level content (if applicable)
    // This part is tricky if content is purely lesson-based.
    // Example: Check if this lesson belongs to module 2, then add algo comparison?
    if (lessonElement.closest('#module2')) {
         // Decide if this should go in *every* lesson of module 2, or just the first?
         // Or perhaps add specific placeholder divs in Markdown? e.g., <div class="diagram-placeholder" data-diagram="algo-comparison"></div>
         // For now, let's assume it should load if *any* lesson in module 2 is loaded.
         // This might lead to duplicates if multiple lessons are opened. 
         // A better approach might be needed depending on requirements.
         const moduleContentDiv = lessonElement.closest('.module-content');
         if (moduleContentDiv && !moduleContentDiv.querySelector('img[src="images/algo-comparison.svg"]')) { // Prevent duplicates in module
              insertDiagram(moduleContentDiv, 'images/algo-comparison.svg', 'Figure 3: Performance Comparison of RL Algorithms');
         }
    }
    if (lessonElement.closest('#module3')) {
         const moduleContentDiv = lessonElement.closest('.module-content');
         if (moduleContentDiv && !moduleContentDiv.querySelector('img[src="images/exploration-exploitation.svg"]')) { // Prevent duplicates
              insertDiagram(moduleContentDiv, 'images/exploration-exploitation.svg', 'Figure 4: The Exploration-Exploitation Dilemma');
         }
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

// Function to add code examples specific to a lesson
function addCodeExamplesForLesson(lessonElement) {
    const lessonId = lessonElement.id;
    const contentDiv = lessonElement.querySelector('.lesson-content');
    if (!contentDiv) return;

    // --- Define which code examples belong to which lessons ---
    switch (lessonId) {
        case 'lesson2-1': // Assuming Lesson 2.1 is Q-Learning
            // Create a unique ID for the container within this lesson
            const editorId = `code-editor-${lessonId}`;
            // Check if it already exists
            if (!contentDiv.querySelector(`#${editorId}`)) {
                const codeContainer = document.createElement('div');
                codeContainer.id = editorId;
                codeContainer.className = 'code-container fade-in'; // Added fade-in
                contentDiv.appendChild(codeContainer);
                
                // Pass the dynamically created ID to the CodeEditor
                new CodeEditor(editorId, 'python', qLearningCode);
            }
            break;
        // Add cases for other lessons with code examples
        // case 'lessonX-Y':
        //    ... create container and new CodeEditor() ...
        //    break;
    }
}

// Function to create and add quizzes specific to a lesson
function createQuizForLesson(lessonElement) {
    const lessonId = lessonElement.id;
    const contentDiv = lessonElement.querySelector('.lesson-content');
    if (!contentDiv) return;

    // --- Define which quizzes belong to which lessons ---
    let quizData = null;
    switch (lessonId) {
        case 'lesson1-1': // Example: Put quiz at the end of Lesson 1.1
            // Check if quiz already added
            if (contentDiv.querySelector('.quiz-container')) return;

            quizData = {
                title: "Reinforcement Learning Basics Quiz",
                questions: [
                    { question: "What is the primary goal of reinforcement learning?", options: ["To classify data into categories", "To predict values based on labeled examples", "To learn optimal behavior through trial and error", "To cluster similar data points together"], correctAnswer: 2 },
                    { question: "Which of the following is NOT a core component of reinforcement learning?", options: ["Agent", "Environment", "Labeled dataset", "Reward signal"], correctAnswer: 2 },
                    { question: "What does the 'policy' refer to in reinforcement learning?", options: ["The rules of the environment", "The agent's strategy for choosing actions", "The reward calculation method", "The termination conditions"], correctAnswer: 1 }
                ]
            };
            break;
        // Add cases for other lessons with quizzes
        // case 'lessonX-Y':
        //    quizData = { ... };
        //    break;
    }

    if (quizData) {
        // Create and append the quiz HTML
        const quizContainer = document.createElement('div');
        quizContainer.className = 'quiz-container fade-in'; // Added fade-in
        quizContainer.innerHTML = `
            <h3>${quizData.title}</h3>
            <div class="quiz-questions"></div>
            <button class="submit-quiz">Submit Answers</button>
            <div class="quiz-results"></div>
        `;
        contentDiv.appendChild(quizContainer);
        
        const questionsContainer = quizContainer.querySelector('.quiz-questions');
        
        // Add questions
        quizData.questions.forEach((q, qIndex) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'quiz-question';
            questionElement.innerHTML = `<p class="question-text">${qIndex + 1}. ${q.question}</p>`;
            
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'question-options';
            
            q.options.forEach((option, oIndex) => {
                const optionId = `l${lessonId}_q${qIndex}_o${oIndex}`; // Unique ID per lesson instance
                const optionName = `l${lessonId}_q${qIndex}`; // Unique name per lesson instance
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.innerHTML = `
                    <input type="radio" id="${optionId}" name="${optionName}" value="${oIndex}">
                    <label for="${optionId}">${option}</label>
                `;
                optionsContainer.appendChild(optionElement);
            });
            
            questionElement.appendChild(optionsContainer);
            questionsContainer.appendChild(questionElement);
        });
        
        // Add submit button functionality (scoped to this quiz instance)
        const submitButton = quizContainer.querySelector('.submit-quiz');
        const resultsContainer = quizContainer.querySelector('.quiz-results');
        
        submitButton.addEventListener('click', () => {
            let score = 0;
            let feedback = '';
            
            quizData.questions.forEach((q, qIndex) => {
                const optionName = `l${lessonId}_q${qIndex}`; // Use the unique name
                const selectedOption = quizContainer.querySelector(`input[name="${optionName}"]:checked`);
                const questionElement = questionsContainer.children[qIndex]; // Get the specific question element

                // Reset previous feedback styling (optional)
                questionElement.classList.remove('correct', 'incorrect'); 

                if (selectedOption) {
                    const selectedValue = parseInt(selectedOption.value);
                    if (selectedValue === q.correctAnswer) {
                        score++;
                        feedback += `<p>Question ${qIndex + 1}: Correct!</p>`;
                        questionElement.classList.add('correct'); // Add styling for feedback
                    } else {
                        feedback += `<p>Question ${qIndex + 1}: Incorrect. The correct answer is "${q.options[q.correctAnswer]}".</p>`;
                        questionElement.classList.add('incorrect'); // Add styling for feedback
                    }
                } else {
                    feedback += `<p>Question ${qIndex + 1}: Not answered.</p>`;
                    questionElement.classList.add('incorrect'); // Mark unanswered as incorrect visually
                }
            });
            
            resultsContainer.innerHTML = `
                <h4>Quiz Results</h4>
                <p>Your score: ${score}/${quizData.questions.length}</p>
                <div class="feedback">${feedback}</div>
            `;
            resultsContainer.style.display = 'block'; // Ensure results are visible
        });
    }
}

// Main function called by main.js after lesson content is loaded
function initializeMultimodalForLesson(lessonElement) {
    if (!lessonElement) return;
    
    console.log(`Initializing multimodal content for lesson: ${lessonElement.id}`);

    // Call the specific functions to add content relevant to this lesson
    loadDiagramsForLesson(lessonElement);
    addCodeExamplesForLesson(lessonElement);
    createQuizForLesson(lessonElement);

    // Initialize other interactive elements specific to this lesson if needed
    // e.g., find a placeholder in the loaded Markdown and activate a specific JS component

}

// --- Remove the old initialization logic --- 
/*
function initMultimodalContent() { ... }
document.addEventListener('DOMContentLoaded', function() { ... });
*/
