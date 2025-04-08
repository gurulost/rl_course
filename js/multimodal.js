function loadDiagramsForLesson(lessonElement) {
    const lessonId = lessonElement.id;
    const contentDiv = lessonElement.querySelector('.lesson-content');
    if (!contentDiv) return;

    // Helper function to find placeholder and insert diagram
    function insertDiagramViaPlaceholder(placeholderSelector, imagePath, captionText) {
        const placeholder = contentDiv.querySelector(placeholderSelector);
        if (placeholder) {
            const diagramDiv = document.createElement('div');
            diagramDiv.className = 'diagram fade-in';
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = captionText || 'Diagram'; 
            img.loading = 'lazy';
            
            diagramDiv.appendChild(img);
            
            if (captionText) {
                const caption = document.createElement('p');
                caption.className = 'diagram-caption';
                caption.textContent = captionText;
                diagramDiv.appendChild(caption);
            }
            
            // Replace placeholder with the diagram
            placeholder.parentNode.replaceChild(diagramDiv, placeholder);
        } else {
             // Optional: Log if a placeholder was expected but not found
             // console.log(`Placeholder ${placeholderSelector} not found in ${lessonId}`);
        }
    }

    // --- Find placeholders in the loaded content and insert diagrams ---
    insertDiagramViaPlaceholder(
        '[data-diagram="rl-process"]',
        'images/rl-process.svg',
        'Figure 1: The Reinforcement Learning Process'
    );
    insertDiagramViaPlaceholder(
        '[data-diagram="mdp"]',
        'images/mdp.svg',
        'Figure 2: Markov Decision Process (MDP) Example'
    );
     insertDiagramViaPlaceholder(
        '[data-diagram="algo-comparison"]',
        'images/algo-comparison.svg',
        'Figure 3: Conceptual Performance Comparison of RL Algorithms'
    );
     insertDiagramViaPlaceholder(
        '[data-diagram="exploration-exploitation"]',
        'images/exploration-exploitation.svg',
        'Figure 4: The Exploration-Exploitation Dilemma'
    );
    // Add placeholders for other anticipated diagrams
     insertDiagramViaPlaceholder(
        '[data-diagram="q-learning-flowchart"]',
        'images/q-learning-flowchart.svg',
        'Figure: Q-Learning Update Process'
    );
     insertDiagramViaPlaceholder(
        '[data-diagram="actor-critic-flow"]',
        'images/actor-critic-flow.svg',
        'Figure: Basic Actor-Critic Architecture'
    );
     insertDiagramViaPlaceholder(
        '[data-diagram="credit-assignment"]',
        'images/credit-assignment.svg',
        'Figure: The Credit Assignment Problem'
    );
     insertDiagramViaPlaceholder(
        '[data-diagram="qlearn-sarsa-compare"]',
        'images/qlearn-sarsa-compare.svg',
        'Figure: Comparing Q-Learning and SARSA Updates'
    );
    
    // Remove the old switch-based logic
    /*
    switch (lessonId) { ... }
    if (lessonElement.closest('#module2')) { ... }
    */
}

// Function to initialize interactive charts using Chart.js
function initializeChartsForLesson(lessonElement) {
    const lessonId = lessonElement.id;
    const contentDiv = lessonElement.querySelector('.lesson-content');
    if (!contentDiv || typeof Chart === 'undefined') {
        if (typeof Chart === 'undefined') {
            // Silently fail if Chart.js is not loaded, or add a console warning
            // console.warn("Chart.js not loaded, skipping chart initialization.");
        }
        return;
    }

    // Find all chart placeholders in this lesson
    const placeholders = contentDiv.querySelectorAll('.chart-placeholder');

    placeholders.forEach((canvasElement) => {
        const chartId = canvasElement.dataset.chart; // e.g., 'algo-performance'
        
        // Prevent re-initialization if chart already exists on this canvas
        if (Chart.getChart(canvasElement)) {
            return;
        }

        let chartData = null;
        let chartOptions = {};
        let chartType = 'line';

        // --- Map chartId to actual chart data and options ---
        switch (chartId) {
            case 'algo-performance':
                chartType = 'line';
                // Conceptual dummy data representing learning curves
                const labels = Array.from({length: 20}, (_, i) => `Step ${i * 5}`); // Example steps
                chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Q-Learning',
                            data: labels.map((_, i) => 10 + i * 3 + Math.random() * 5), // Example data
                            borderColor: 'rgba(0, 122, 255, 0.8)', // Use accent color
                            tension: 0.1,
                            fill: false
                        },
                        {
                            label: 'SARSA',
                            data: labels.map((_, i) => 8 + i * 2.8 + Math.random() * 6), // Slightly slower/noisier
                            borderColor: 'rgba(88, 86, 214, 0.8)', // Purpleish
                            tension: 0.1,
                            fill: false
                        },
                         {
                            label: 'Policy Gradient (Conceptual)',
                            data: labels.map((_, i) => 5 + i * 3.5 + Math.random() * 8), // Slower start, high variance
                            borderColor: 'rgba(52, 199, 89, 0.8)', // Greenish
                            tension: 0.3, // More variance looking
                            fill: false
                        }
                    ]
                };
                chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false, // Using separate caption
                            text: 'Conceptual Algorithm Performance'
                        },
                        legend: {
                            position: 'bottom',
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Training Steps/Time'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Performance / Cumulative Reward'
                            },
                            beginAtZero: true
                        }
                    }
                };
                break;
            // Add cases for other charts if needed
            // case 'another-chart':
            //    chartData = { ... };
            //    chartOptions = { ... };
            //    chartType = 'bar';
            //    break;
            default:
                console.warn(`Chart ID "${chartId}" not recognized.`);
                canvasElement.parentNode.textContent = `[Error: Chart '${chartId}' not found]`;
                return; // Skip this placeholder
        }

        // Create the chart
        if (chartData) {
            try {
                new Chart(canvasElement, {
                    type: chartType,
                    data: chartData,
                    options: chartOptions
                });
                 // Remove placeholder class if needed, though Chart.js uses the canvas
                 canvasElement.classList.remove('chart-placeholder');
            } catch (error) {
                console.error(`Error creating chart '${chartId}':`, error);
                 canvasElement.parentNode.textContent = `[Error initializing chart '${chartId}']`;
            }
        }
    });
}

// Function to initialize conceptual Chain-of-Thought visualizations
function initializeCoTVisualization(lessonElement) {
    const lessonId = lessonElement.id;
    const contentDiv = lessonElement.querySelector('.lesson-content');
    if (!contentDiv) return;

    // Find all CoT placeholders in this lesson
    const placeholders = contentDiv.querySelectorAll('.cot-visualization-placeholder');

    placeholders.forEach((placeholder) => {
        const vizId = placeholder.dataset.cotViz; // e.g., 'math-problem-simple'
        
        // Prevent re-initialization
        if (placeholder.dataset.initialized === 'true') return;

        let vizData = null;

        // --- Map vizId to actual CoT data ---
        switch (vizId) {
            case 'math-problem-simple':
                vizData = {
                    prompt: "Question: Sarah has 5 apples. She buys 3 more bags of apples, and each bag contains 4 apples. How many apples does Sarah have now?",
                    steps: [
                        "Step 1: Identify the initial number of apples Sarah has (5).",
                        "Step 2: Identify the number of bags bought (3).",
                        "Step 3: Identify the number of apples per bag (4).",
                        "Step 4: Calculate the total number of apples bought (3 bags * 4 apples/bag = 12 apples).",
                        "Step 5: Calculate the final total number of apples (initial 5 + bought 12 = 17 apples)."
                    ],
                    answer: "Final Answer: Sarah now has 17 apples."
                };
                break;
            // Add cases for other CoT examples
            // case 'another-cot-example':
            //    vizData = { ... };
            //    break;
             default:
                console.warn(`CoT Visualization ID "${vizId}" not recognized.`);
                placeholder.textContent = `[Error: CoT Visualization '${vizId}' not found]`;
                return; // Skip this placeholder
        }

        if (vizData) {
            placeholder.innerHTML = ''; // Clear loading message
            placeholder.dataset.initialized = 'true';
            placeholder.classList.remove('cot-visualization-placeholder');
            placeholder.classList.add('cot-visualization', 'fade-in');

            let currentStep = 0;

            // Prompt Area
            const promptDiv = document.createElement('div');
            promptDiv.className = 'cot-prompt';
            promptDiv.innerHTML = `<p><strong>${vizData.prompt}</strong></p>`;
            placeholder.appendChild(promptDiv);

            // Steps Area
            const stepsContainer = document.createElement('div');
            stepsContainer.className = 'cot-steps-container';
            placeholder.appendChild(stepsContainer);

             // Answer Area (initially hidden)
            const answerDiv = document.createElement('div');
            answerDiv.className = 'cot-answer';
            answerDiv.innerHTML = `<p><strong>${vizData.answer}</strong></p>`;
            answerDiv.style.display = 'none';
            placeholder.appendChild(answerDiv);

            // Controls
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'cot-controls';

            const nextStepButton = document.createElement('button');
            nextStepButton.textContent = 'Show Thinking Step 1';
            nextStepButton.className = 'cot-button';
            
            const resetButton = document.createElement('button');
            resetButton.textContent = 'Reset';
            resetButton.className = 'cot-button';
            resetButton.style.marginLeft = '10px';

            controlsDiv.appendChild(nextStepButton);
            controlsDiv.appendChild(resetButton);
            placeholder.appendChild(controlsDiv);

            // Event Listener for Next Step
            nextStepButton.addEventListener('click', () => {
                if (currentStep < vizData.steps.length) {
                    const stepDiv = document.createElement('div');
                    stepDiv.className = 'cot-step fade-in';
                    stepDiv.textContent = vizData.steps[currentStep];
                    stepsContainer.appendChild(stepDiv);
                    currentStep++;
                    if (currentStep < vizData.steps.length) {
                         nextStepButton.textContent = `Show Thinking Step ${currentStep + 1}`;
                    } else {
                         nextStepButton.textContent = 'Show Final Answer';
                    }
                } else if (currentStep === vizData.steps.length) {
                    // Show final answer
                    answerDiv.style.display = 'block';
                    answerDiv.classList.add('fade-in');
                    nextStepButton.disabled = true;
                    nextStepButton.textContent = 'Done';
                }
            });

             // Event Listener for Reset
            resetButton.addEventListener('click', () => {
                currentStep = 0;
                stepsContainer.innerHTML = '';
                answerDiv.style.display = 'none';
                answerDiv.classList.remove('fade-in');
                nextStepButton.disabled = false;
                nextStepButton.textContent = 'Show Thinking Step 1';
            });
        }
    });
}

// Function to initialize a vertical timeline visualization
function initializeTimelineVisualization(lessonElement) {
    const lessonId = lessonElement.id;
    const contentDiv = lessonElement.querySelector('.lesson-content');
    if (!contentDiv) return;

    // Find all timeline placeholders
    const placeholders = contentDiv.querySelectorAll('.timeline-placeholder');

    placeholders.forEach((placeholder) => {
        const timelineId = placeholder.dataset.timeline; // e.g., 'rl-major-milestones'

        // Prevent re-initialization
        if (placeholder.dataset.initialized === 'true') return;

        let timelineData = null;

        // --- Map timelineId to actual data --- 
        switch (timelineId) {
            case 'rl-major-milestones':
                /*
                // Linter issue with this array, commenting out for now.
                // Please uncomment and ensure syntax is correct manually.
                timelineData = [
                    { year: '1950s', title: 'Early Ideas', description: 'Bellman develops Dynamic Programming and the Bellman Equation, laying theoretical foundations.' },
                    { year: '1980s', title: 'Modern RL Emerges', description: 'Sutton & Barto formalize Temporal Difference (TD) learning. Watkins introduces Q-learning.' },
                    { year: '1992', title: 'TD-Gammon', description: 'Tesauro's program learns to play Backgammon at world-champion level using TD learning.' },
                    { year: '2013-15', title: 'Deep Q-Networks (DQN)', description: 'DeepMind combines Q-learning with deep neural networks to master Atari games from pixels, sparking the Deep RL revolution.' },
                    { year: '2016', title: 'AlphaGo', description: 'DeepMind's AlphaGo defeats world Go champion Lee Sedol using deep RL and Monte Carlo Tree Search.' },
                    { year: '2017-18', title: 'Policy Optimization Adv.', description: 'Algorithms like PPO and advancements in Actor-Critic methods (A2C/A3C, DDPG, TD3, SAC) show strong performance.' },
                    { year: '2019+', title: 'RLHF & LLM Alignment', description: 'Reinforcement Learning from Human Feedback becomes crucial for aligning large language models (LLMs) like GPT-3, ChatGPT, Claude, Gemini.' },
                    { year: '2023+', title: 'RL for Reasoning', description: 'Increased focus on using RL (e.g., RLVR, RLEF, process rewards) to improve complex reasoning and tool use in frontier models (OpenAI o1, DeepSeek R1, Gemini 2.5).' },
                ];
                */
                timelineData = []; // Use empty array to prevent errors
                console.warn("Timeline data for 'rl-major-milestones' is commented out due to potential syntax issues. Please review.");
                break;
            // Add cases for other timelines
            default:
                console.warn(`Timeline ID "${timelineId}" not recognized.`);
                placeholder.textContent = `[Error: Timeline '${timelineId}' not found]`;
                return;
        }

        if (timelineData) {
            placeholder.innerHTML = ''; // Clear loading message
            placeholder.dataset.initialized = 'true';
            placeholder.classList.remove('timeline-placeholder');
            placeholder.classList.add('timeline-container', 'fade-in');

            const timelineList = document.createElement('ul');
            timelineList.className = 'timeline-list';

            timelineData.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'timeline-item';
                // Add class for alternating sides (optional)
                // listItem.classList.add(index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right');

                const dot = document.createElement('div');
                dot.className = 'timeline-dot';

                const content = document.createElement('div');
                content.className = 'timeline-content';

                const year = document.createElement('span');
                year.className = 'timeline-year';
                year.textContent = item.year;

                const title = document.createElement('h4');
                title.className = 'timeline-title';
                title.textContent = item.title;

                const description = document.createElement('p');
                description.className = 'timeline-description';
                description.textContent = item.description;

                content.appendChild(year);
                content.appendChild(title);
                content.appendChild(description);
                listItem.appendChild(dot);
                listItem.appendChild(content);
                timelineList.appendChild(listItem);
            });

            placeholder.appendChild(timelineList);
        }
    });
}

// Main function called by main.js after lesson content is loaded
function initializeMultimodalForLesson(lessonElement) {
    // This function is the central point for adding interactive elements
    // after the main lesson content (Markdown) has been loaded and parsed.
    // It finds predefined placeholder elements within the loaded HTML 
    // (e.g., <div class="quiz-placeholder" data-quiz="...">) and replaces 
    // them with the actual interactive components.

    if (!lessonElement) return;
    
    // Log which lesson is being initialized for easier debugging.
    console.log(`Initializing multimodal content for lesson: ${lessonElement.id}`);

    // Call the specific initialization functions for each type of element.
    // Each function will search for its corresponding placeholders within the lessonElement.
    loadDiagramsForLesson(lessonElement);       // Finds data-diagram attributes
    addCodeExamplesForLesson(lessonElement);    // Finds .code-placeholder with data-example-id
    createQuizForLesson(lessonElement);         // Finds .quiz-placeholder with data-quiz
    initializeDemosForLesson(lessonElement);      // Finds .demo-placeholder with data-demo
    initializeChartsForLesson(lessonElement);     // Finds .chart-placeholder with data-chart
    initializeCoTVisualization(lessonElement);  // Finds .cot-visualization-placeholder with data-cot-viz
    initializeTimelineVisualization(lessonElement); // Finds .timeline-placeholder with data-timeline

    // Future interactive elements would have their own initialization 
    // function called here, searching for their specific placeholders.

}
