// Main JavaScript for the Reinforcement Learning Course

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the course
    initCourse();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial content
    loadInitialContent();
});

// Initialize the course
function initCourse() {
    console.log('Initializing course...');
    
    // Set up the progress tracking
    updateProgress();
}

// Set up event listeners for interactive elements
function setupEventListeners() {
    // Module expand/collapse functionality
    const moduleHeaders = document.querySelectorAll('.module-header');
    moduleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const module = this.parentElement;
            toggleModule(module);
        });
    });
    
    // Lesson expand/collapse functionality
    const lessonHeaders = document.querySelectorAll('.lesson h3');
    lessonHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const lesson = this.parentElement;
            toggleLesson(lesson);
        });
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToModule(targetId);
        });
    });
    
    // Modal functionality
    const closeModal = document.querySelector('.close-modal');
    closeModal.addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Toggle module expand/collapse
function toggleModule(module) {
    const isActive = module.classList.toggle('active');
    
    // Update button text
    const button = module.querySelector('.expand-btn');
    button.textContent = isActive ? 'Collapse' : 'Expand';
    
    // If expanding, potentially load content for its lessons if not already loaded
    if (isActive) {
        // Example: Load content for all lessons within this module immediately
        // module.querySelectorAll('.lesson').forEach(lesson => {
        //     if (!lesson.querySelector('.lesson-content').dataset.loaded) {
        //         loadLessonContent(lesson);
        //     }
        // });
        // Or, let toggling individual lessons handle loading
    }
    
    // Update progress
    updateProgress();
}

// Toggle lesson expand/collapse
function toggleLesson(lesson) {
    const isActive = lesson.classList.toggle('active');
    
    // If expanding, load content if needed
    if (isActive && !lesson.querySelector('.lesson-content').dataset.loaded) {
        loadLessonContent(lesson);
    }
    
    // Update progress (maybe change logic later)
    // updateProgress(); // Progress likely shouldn't update just for expanding a lesson
}

// Scroll to a specific module
function scrollToModule(moduleId) {
    const module = document.getElementById(moduleId);
    if (module) {
        module.scrollIntoView({ behavior: 'smooth' });
        
        // Expand the module if it's not already expanded
        if (!module.classList.contains('active')) {
            toggleModule(module);
        }
    }
}

// Update progress tracker
function updateProgress() {
    const lessonElements = document.querySelectorAll('.lesson');
    const totalLessons = lessonElements.length;
    let loadedLessons = 0;

    lessonElements.forEach(lesson => {
        const contentDiv = lesson.querySelector('.lesson-content');
        if (contentDiv && contentDiv.dataset.loaded === 'true') {
            loadedLessons++;
        }
    });

    // Calculate progress percentage based on loaded lessons
    const progressPercent = totalLessons > 0 ? Math.round((loadedLessons / totalLessons) * 100) : 0;
    
    // Update the progress bar
    const progressBar = document.querySelector('.progress');
    const progressText = document.getElementById('progress-percent');

    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
    if (progressText) {
        progressText.textContent = `${progressPercent}%`;
    }
}

// Load initial content
function loadInitialContent() {
    // Load content for all modules initially or on demand?
    // Let's start by loading the first module's lessons when it's expanded.
    // The actual loading will be triggered by toggleModule or toggleLesson.
    console.log("Initial content loading deferred until module/lesson interaction.");
}

// Fetch and load Markdown content for a specific lesson
async function loadLessonContent(lessonElement) {
    const lessonId = lessonElement.id; // e.g., lesson1-1
    const contentDiv = lessonElement.querySelector('.lesson-content');
    
    // Prevent reloading if content already exists
    if (contentDiv.dataset.loaded === 'true') {
        return;
    }

    // *** Placeholder Mapping Strategy: ***
    // Map lesson IDs to the new Markdown file structure.
    const lessonToFileMap = {
        'lesson1-1': '1-1-what-is-rl.md',
        'lesson1-2': '1-2-core-components.md',
        'lesson1-3': '1-3-rl-process-quiz.md',
        'lesson1-4': '1-4-interactive-demo.md',
        'lesson1-5': '1-5-algorithms-overview.md',
        'lesson1-6': '1-6-challenges.md',
        'lesson1-7': '1-7-applications.md',
        'lesson1-8': '1-8-mdp.md',
        'lesson1-9': '1-9-wrap-up.md',
        // Module 2
        'lesson2-1': '1-5-algorithms-overview.md', // Reuse overview from M1 initially
        'lesson2-2': '2-2-q-learning.md',
        'lesson2-3': '2-3-sarsa.md',
        'lesson2-4': '2-4-policy-gradients.md',
        'lesson2-5': '2-5-actor-critic.md',
        'lesson2-6': '2-6-algo-quiz.md',
        // Module 3
        'lesson3-1': '1-6-challenges.md', // Reuse challenges overview from M1
        // Module 4
        'lesson4-1': '4-1-openai-o1.md',
        'lesson4-2': '4-2-openai-applications.md',
        // Module 5
        'lesson5-1': '5-1-deepseek-r1-zero.md',
        'lesson5-2': '5-2-deepseek-r1-distillation.md',
        // Module 6
        'lesson6-1': '6-1-google-gemini.md',
        'lesson6-2': '6-2-google-performance.md',
        // Module 7
        'lesson7-1': '7-1-common-themes.md',
        'lesson7-2': '7-2-future-directions.md',
        // Module 8
        'lesson8-1': '8-1-project-overview.md',
        'lesson8-2': '8-2-project-setup.md',
        'lesson8-3': '8-3-project-implementation.md',
        'lesson8-4': '8-4-project-results-analysis.md',
        'lesson8-5': '8-5-further-resources.md',
        'lesson8-6': '8-6-project-quiz.md',

        // Example placeholder for a non-existent lesson
        // 'lesson9-1': '9-1-does-not-exist.md' 
    };

    const fileName = lessonToFileMap[lessonId];

    if (!fileName) {
        contentDiv.innerHTML = '<p>Content mapping not found for this lesson.</p>';
        contentDiv.dataset.loaded = 'true'; // Mark as loaded (even if failed)
        return;
    }

    const filePath = `content/${fileName}`;
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdown = await response.text();
        
        // Use marked.js to parse
        if (typeof marked === 'undefined') {
             contentDiv.innerHTML = '<p>Error: marked.js library not found. Ensure it is included in index.html.</p>';
             console.error("marked.js library is missing.");
        } else {
             // Sanitize HTML output from marked.js to prevent XSS if Markdown source is untrusted
             // Basic sanitization (remove script tags). Use a proper library like DOMPurify for robust sanitization.
             // const dirtyHtml = marked.parse(markdown);
             // contentDiv.innerHTML = sanitizeHtml(dirtyHtml); // Assuming sanitizeHtml function exists
             
             // For now, assuming trusted Markdown content:
             contentDiv.innerHTML = marked.parse(markdown); 
        }
       
        contentDiv.dataset.loaded = 'true'; // Mark as loaded successfully
        contentDiv.classList.add('fade-in'); // Add fade-in animation
        
        // Potentially initialize multimodal elements *after* content is loaded
        // Check if the multimodal initialization function exists before calling
        if (typeof initializeMultimodalForLesson === 'function') {
            initializeMultimodalForLesson(lessonElement);
        } else {
            console.warn('initializeMultimodalForLesson function not found. Multimodal content might not load.');
        }
        
    } catch (error) {
        console.error('Error loading lesson content:', error);
        contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
        // Optionally reset loaded flag if you want retry logic
        // delete contentDiv.dataset.loaded; 
    }
}

// Show modal with content
function showModal(content) {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = content;
    document.getElementById('modal').style.display = 'block';
}

// Interactive RL Grid World Demo
class GridWorldDemo {
    constructor(containerId, rows = 5, cols = 5) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`GridWorldDemo: Container #${containerId} not found.`);
            return;
        }
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.agent = { row: 0, col: 0 };
        this.goal = { row: rows - 1, col: cols - 1 };
        this.obstacles = []; // Can be populated with {row: r, col: c} objects if needed
        this.isTraining = false;
        this.episodes = 0;
        this.steps = 0;
        this.trainingSpeed = 100; // Milliseconds per step
        this.trainingInterval = null;
        
        // Q-Learning parameters
        this.qTable = {}; // Use object as sparse dictionary: key=`${row},${col}`
        this.actions = ['up', 'right', 'down', 'left'];
        this.alpha = 0.1; // Learning rate
        this.gamma = 0.9; // Discount factor
        this.epsilon = 1.0; // Initial exploration rate
        this.epsilonDecay = 0.9995;
        this.minEpsilon = 0.05;
        // Store initial values separately for reset and tuning
        this.initialEpsilon = 1.0; 
        this.initialAlpha = 0.1;
        this.initialEpsilonDecay = 0.9995;
        this.maxStepsPerEpisode = 100; // Prevent infinite loops
        this.stepsInEpisode = 0;

        this.showQValues = false; // Toggle to show Q-values on grid
        
        this.initialize();
    }

    // Helper to get Q-value, defaulting to 0
    getQValue(stateKey, action) {
        return this.qTable[`${stateKey}-${action}`] || 0;
    }

    // Helper to set Q-value
    setQValue(stateKey, action, value) {
        this.qTable[`${stateKey}-${action}`] = value;
    }
    
    initialize() {
        // Clear previous content if re-initializing
        this.container.innerHTML = ''; 
        this.qTable = {}; // Reset Q-table
        this.episodes = 0;
        this.steps = 0;
        this.stepsInEpisode = 0;
        // Reset parameters to initial/tuned values
        this.alpha = this.initialAlpha;
        this.epsilon = this.initialEpsilon;
        this.epsilonDecay = this.initialEpsilonDecay;
        
        if(this.trainingInterval) clearInterval(this.trainingInterval);
        this.isTraining = false;

        // Create grid
        this.createGrid();
        // Place default obstacles (optional)
        // this.addObstacle(1, 1);
        // this.addObstacle(1, 2);
        // this.addObstacle(2, 2);
        // this.addObstacle(3, 1);

        // Create controls
        this.createControls();
        
        // Initial render
        this.resetAgent(); // Place agent at start
        this.render();
    }

    addObstacle(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols && !(row === 0 && col === 0) && !(row === this.goal.row && col === this.goal.col)) {
             if (this.grid[row] && this.grid[row][col]) {
                this.grid[row][col].isObstacle = true;
             } 
             // Also add to obstacle list if needed elsewhere
             this.obstacles.push({row, col}); 
        }
    }
    
    createGrid() {
        const gridElement = document.createElement('div');
        gridElement.className = 'grid-world';
        // CSS should handle grid display now
        gridElement.style.gridTemplateColumns = `repeat(${this.cols}, 50px)`;
        gridElement.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;
        
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                // CSS should handle sizing, border, etc.
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                gridElement.appendChild(cell);
                this.grid[row][col] = {
                    element: cell,
                    isObstacle: false,
                    // Assign rewards - high for goal, small negative elsewhere to encourage speed
                    reward: (row === this.goal.row && col === this.goal.col) ? 10 : -0.1 
                };
            }
        }
        
        this.container.appendChild(gridElement);
    }
    
    createControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'grid-controls-container'; // New wrapper

        const mainControls = document.createElement('div');
        mainControls.className = 'grid-controls';
        
        // Start/Stop button
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Training';
        startButton.className = 'start-button';
        startButton.addEventListener('click', () => this.toggleTraining(startButton));
        
        // Reset button
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.className = 'reset-button';
        resetButton.addEventListener('click', () => this.reset());

        // Speed Control
        const speedLabel = document.createElement('label');
        speedLabel.textContent = 'Speed:';
        speedLabel.style.marginLeft = '15px';
        const speedSlider = document.createElement('input');
        speedSlider.type = 'range';
        speedSlider.min = 10; speedSlider.max = 500; speedSlider.value = this.trainingSpeed;
        speedSlider.style.marginLeft = '5px';
        speedSlider.addEventListener('input', (e) => {
            this.trainingSpeed = 510 - parseInt(e.target.value); // Invert slider: faster on right
            if (this.isTraining) { this.stopTraining(); this.startTraining(); }
        });
        
         // Toggle Q-values display
        const qValueToggle = document.createElement('button');
        qValueToggle.textContent = 'Show Q-Values';
        qValueToggle.style.marginLeft = '15px';
        qValueToggle.addEventListener('click', () => {
            this.showQValues = !this.showQValues;
            qValueToggle.textContent = this.showQValues ? 'Hide Q-Values' : 'Show Q-Values';
            this.render();
        });
        
        mainControls.appendChild(startButton);
        mainControls.appendChild(resetButton);
        mainControls.appendChild(speedLabel);
        mainControls.appendChild(speedSlider);
        mainControls.appendChild(qValueToggle);

        // --- Parameter Tuning Controls ---
        const tuningControls = document.createElement('div');
        tuningControls.className = 'grid-tuning-controls';
        tuningControls.style.marginTop = '10px';
        tuningControls.style.display = 'flex';
        tuningControls.style.flexWrap = 'wrap';
        tuningControls.style.gap = '10px 20px'; // Row and column gap
        tuningControls.style.justifyContent = 'center';
        tuningControls.style.fontSize = '0.9em';

        // Alpha (Learning Rate)
        const alphaDiv = this.createSliderControl(
            'alpha-slider', 'Alpha (α):', 0.01, 1.0, 0.01, this.initialAlpha,
            (value) => { this.initialAlpha = parseFloat(value); this.alpha = this.initialAlpha; } // Update initial and current
        );

        // Initial Epsilon
        const epsilonDiv = this.createSliderControl(
            'epsilon-slider', 'Initial Epsilon (ε):', 0.0, 1.0, 0.01, this.initialEpsilon,
            (value) => { this.initialEpsilon = parseFloat(value); this.epsilon = this.initialEpsilon; } // Update initial and current
        );
        
        // Epsilon Decay Rate
        const decayDiv = this.createSliderControl(
            'decay-slider', 'ε Decay Rate:', 0.99, 1.0, 0.0001, this.initialEpsilonDecay,
            (value) => { this.initialEpsilonDecay = parseFloat(value); this.epsilonDecay = this.initialEpsilonDecay; }, // Update initial and current decay
            4 // Number of decimal places for display
        );

        tuningControls.appendChild(alphaDiv);
        tuningControls.appendChild(epsilonDiv);
        tuningControls.appendChild(decayDiv);

        // Stats display
        const stats = document.createElement('div');
        stats.className = 'stats';
        stats.style.marginTop = '15px';
        stats.innerHTML = `
            <p>Episodes: <span id="gw-episodes-${this.container.id}">0</span> | Steps: <span id="gw-steps-${this.container.id}">0</span> | Epsilon (current): <span id="gw-epsilon-${this.container.id}">1.00</span></p>
        `; // Changed label to clarify current epsilon
        
        controlsContainer.appendChild(mainControls);
        controlsContainer.appendChild(tuningControls);
        controlsContainer.appendChild(stats);

        // Append the container with all controls
        this.container.appendChild(controlsContainer);
    }

    // Helper to create slider controls
    createSliderControl(id, labelText, min, max, step, initialValue, onChangeCallback, displayDecimals = 2) {
        const controlDiv = document.createElement('div');
        controlDiv.style.display = 'flex';
        controlDiv.style.alignItems = 'center';
        
        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = labelText;
        label.style.marginRight = '5px';
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.id = id;
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = initialValue;
        slider.style.width = '100px'; // Adjust width as needed
        
        const valueSpan = document.createElement('span');
        valueSpan.textContent = parseFloat(initialValue).toFixed(displayDecimals);
        valueSpan.style.marginLeft = '5px';
        valueSpan.style.minWidth = '35px'; // Prevent layout shifts
        valueSpan.style.display = 'inline-block';
        valueSpan.style.textAlign = 'right';

        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            valueSpan.textContent = parseFloat(value).toFixed(displayDecimals);
            if (onChangeCallback) {
                onChangeCallback(value);
            }
        });

        controlDiv.appendChild(label);
        controlDiv.appendChild(slider);
        controlDiv.appendChild(valueSpan);
        return controlDiv;
    }

    toggleTraining(button) {
         if (this.isTraining) {
            this.stopTraining();
            button.textContent = 'Start Training';
        } else {
            this.startTraining();
            button.textContent = 'Stop Training';
        }
    }
    
    render() {
        const agentStateKey = `${this.agent.row},${this.agent.col}`;
        // Clear all cells and reset styles
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.grid[row][col];
                const cellStateKey = `${row},${col}`;
                cell.element.innerHTML = ''; // Clear previous content
                cell.element.style.backgroundColor = ''; // Rely on CSS default
                cell.element.style.position = 'relative'; // For Q-value display

                if (cell.isObstacle) {
                    cell.element.style.backgroundColor = 'var(--text-secondary-color)'; 
                } else if (row === this.goal.row && col === this.goal.col) {
                    cell.element.innerHTML = '<img src="images/goal-icon.svg" alt="Goal" style="width: 70%; height: 70%; object-fit: contain;">';
                } 

                // Visualize Q-values or policy if toggled
                if (this.showQValues && !cell.isObstacle && !(row === this.goal.row && col === this.goal.col)) {
                    this.renderQValues(cell.element, cellStateKey);
                }
            }
        }
        
        // Render agent (only if not on an obstacle cell)
        if (!this.grid[this.agent.row][this.agent.col].isObstacle) {
            const agentCell = this.grid[this.agent.row][this.agent.col];
            // If agent is on goal, make agent slightly transparent to see goal
            const agentStyle = (this.agent.row === this.goal.row && this.agent.col === this.goal.col) ? 'opacity: 0.7;' : '';
            agentCell.element.innerHTML += `<img src="images/agent-icon.svg" alt="Agent" style="width: 80%; height: 80%; object-fit: contain; position: absolute; top: 10%; left: 10%; ${agentStyle}">`; 
        }
        
        // Update stats
        const episodesSpan = document.getElementById(`gw-episodes-${this.container.id}`);
        const stepsSpan = document.getElementById(`gw-steps-${this.container.id}`);
        const epsilonSpan = document.getElementById(`gw-epsilon-${this.container.id}`);
        if (episodesSpan) episodesSpan.textContent = this.episodes;
        if (stepsSpan) stepsSpan.textContent = this.steps;
        if (epsilonSpan) epsilonSpan.textContent = this.epsilon.toFixed(2);
    }

     // Function to render Q-values and policy arrows in a cell
    renderQValues(cellElement, stateKey) {
        const qVizContainer = document.createElement('div');
        qVizContainer.style.position = 'absolute';
        qVizContainer.style.top = '0'; qVizContainer.style.left = '0';
        qVizContainer.style.width = '100%'; qVizContainer.style.height = '100%';
        qVizContainer.style.fontSize = '8px';
        qVizContainer.style.lineHeight = '1';
        qVizContainer.style.display = 'flex';
        qVizContainer.style.flexDirection = 'column';
        qVizContainer.style.justifyContent = 'center';
        qVizContainer.style.alignItems = 'center';
        qVizContainer.style.pointerEvents = 'none'; // Prevent interfering with clicks

        let maxQ = -Infinity;
        let bestAction = null;
        const actionValues = {};

        this.actions.forEach(action => {
            const qVal = this.getQValue(stateKey, action);
            actionValues[action] = qVal;
            if (qVal > maxQ) {
                maxQ = qVal;
                bestAction = action;
            }
        });

        // Simple Q-value display (optional)
        /*
        Object.entries(actionValues).forEach(([action, qVal]) => {
             const qText = document.createElement('span');
             qText.textContent = `${action[0]}: ${qVal.toFixed(1)}`;
             qText.style.display = 'block';
             qVizContainer.appendChild(qText);
        });
        */

        // Draw arrow indicating best action (policy)
        if (bestAction && maxQ > -Infinity) { // Only draw if a best action exists
             const arrow = document.createElement('div');
             arrow.style.width = '0'; 
             arrow.style.height = '0';
             arrow.style.borderStyle = 'solid';
             arrow.style.position = 'absolute';
             const arrowSize = 5; // Size of the arrow head

             switch(bestAction) {
                case 'up':
                    arrow.style.borderWidth = `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`;
                    arrow.style.borderColor = `transparent transparent var(--accent-color) transparent`;
                    arrow.style.top = '5px'; arrow.style.left = `calc(50% - ${arrowSize}px)`;
                    break;
                case 'right':
                     arrow.style.borderWidth = `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`;
                     arrow.style.borderColor = `transparent transparent transparent var(--accent-color)`;
                     arrow.style.top = `calc(50% - ${arrowSize}px)`; arrow.style.right = '5px';
                     break;
                case 'down':
                    arrow.style.borderWidth = `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`;
                    arrow.style.borderColor = `var(--accent-color) transparent transparent transparent`;
                    arrow.style.bottom = '5px'; arrow.style.left = `calc(50% - ${arrowSize}px)`;
                     break;
                 case 'left':
                     arrow.style.borderWidth = `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`;
                     arrow.style.borderColor = `transparent var(--accent-color) transparent transparent`;
                     arrow.style.top = `calc(50% - ${arrowSize}px)`; arrow.style.left = '5px';
                     break;
             }
             qVizContainer.appendChild(arrow);
        }

        cellElement.appendChild(qVizContainer);
    }
    
    startTraining() {
        this.isTraining = true;
        // Prevent multiple intervals if start is clicked rapidly
        if (this.trainingInterval) clearInterval(this.trainingInterval);
        this.trainingInterval = setInterval(() => {
            this.step();
        }, this.trainingSpeed); 
    }
    
    stopTraining() {
        this.isTraining = false;
        clearInterval(this.trainingInterval);
        this.trainingInterval = null;
    }
    
    step() {
        if (!this.isTraining) return;

        const stateKey = `${this.agent.row},${this.agent.col}`;
        
        // Choose action using epsilon-greedy
        let action;
        if (Math.random() < this.epsilon) {
            // Explore: choose a random valid action
            const validActions = this.getValidActions(this.agent.row, this.agent.col);
            action = validActions[Math.floor(Math.random() * validActions.length)];
        } else {
            // Exploit: choose the best known action for the current state
            let maxQ = -Infinity;
            let bestAction = null;
            // Shuffle actions to break ties randomly
            const shuffledActions = [...this.actions].sort(() => 0.5 - Math.random());
            shuffledActions.forEach(act => {
                const qVal = this.getQValue(stateKey, act);
                if (qVal > maxQ) {
                    maxQ = qVal;
                    bestAction = act;
                }
            });
            // If multiple actions have the same maxQ, bestAction will be one of them due to shuffle
            // Fallback to random valid action if no Q-values learned yet or all are equal
            action = bestAction || this.getValidActions(this.agent.row, this.agent.col)[0]; 
        }

        // Get current Q-value
        const currentQ = this.getQValue(stateKey, action);

        // Simulate taking the action
        const { nextRow, nextCol } = this.getNextState(this.agent.row, this.agent.col, action);
        const nextStateKey = `${nextRow},${nextCol}`;
        const reward = this.grid[nextRow][nextCol].reward;
        const isDone = (nextRow === this.goal.row && nextCol === this.goal.col);

        // Q-Learning Update
        let maxNextQ = -Infinity;
        this.actions.forEach(nextAction => {
            maxNextQ = Math.max(maxNextQ, this.getQValue(nextStateKey, nextAction));
        });
        // If goal state reached, the value of the next state is 0 (no future rewards)
        if (isDone) maxNextQ = 0;

        const newQ = currentQ + this.alpha * (reward + this.gamma * maxNextQ - currentQ);
        this.setQValue(stateKey, action, newQ);

        // Move agent
        this.agent.row = nextRow;
        this.agent.col = nextCol;
        
        this.steps++;
        this.stepsInEpisode++;

        // Check if episode finished (reached goal or max steps)
        if (isDone || this.stepsInEpisode >= this.maxStepsPerEpisode) {
            this.episodes++;
            this.resetAgent();
            this.stepsInEpisode = 0;
            // Decay epsilon at the end of each episode
            this.epsilon = Math.max(this.minEpsilon, this.epsilon * this.epsilonDecay);
        }
        
        this.render();
    }

    // Calculates the next state coordinates without checking obstacle validity (handled by getValidActions)
    getNextState(row, col, action) {
        let nextRow = row;
        let nextCol = col;
        switch (action) {
            case 'up': nextRow = Math.max(0, row - 1); break;
            case 'right': nextCol = Math.min(this.cols - 1, col + 1); break;
            case 'down': nextRow = Math.min(this.rows - 1, row + 1); break;
            case 'left': nextCol = Math.max(0, col - 1); break;
        }
         // Prevent moving into obstacles
        if (this.grid[nextRow] && this.grid[nextRow][nextCol] && this.grid[nextRow][nextCol].isObstacle) {
            return { nextRow: row, nextCol: col }; // Stay in the same place if action leads to obstacle
        }
        return { nextRow, nextCol };
    }
    
    // Get valid actions from a given state (avoids obstacles)
    getValidActions(row, col) {
        const validActions = [];
        
        this.actions.forEach(action => {
            let nextRow = row;
            let nextCol = col;
            switch (action) {
                case 'up': nextRow--; break;
                case 'right': nextCol++; break;
                case 'down': nextRow++; break;
                case 'left': nextCol--; break;
            }

            // Check bounds and obstacles
            if (nextRow >= 0 && nextRow < this.rows && 
                nextCol >= 0 && nextCol < this.cols &&
                !this.grid[nextRow][nextCol].isObstacle) {
                validActions.push(action);
            }
        });
        
         // Ensure there's always at least one action if possible (e.g., if surrounded but not on obstacle)
         // This prevents errors if agent gets stuck, though ideally the environment design avoids this.
         // A simple fallback if no valid actions found (shouldn't happen in open grid): stay put? No standard action for stay.
         // Return valid actions, or if somehow empty, maybe return a random original action (agent will bump obstacle)
         return validActions.length > 0 ? validActions : [this.actions[Math.floor(Math.random()*this.actions.length)]];
    }
    
    // Function is not used with Q-learning logic, replaced by step()
    /*
    moveAgent(action) {
        // ... (old random move logic) ...
    }
    */
    
    resetAgent() {
        this.agent = { row: 0, col: 0 };
        this.stepsInEpisode = 0;
    }
    
    reset() {
        console.log("Resetting GridWorld Demo with current parameters...");
        this.stopTraining();
        // Re-initialize with potentially updated initial parameters
        // Initialize will reset epsilon, alpha etc. based on initialAlpha, initialEpsilon
        this.initialize(); 
         const startButton = this.container.querySelector('.start-button');
         if (startButton) startButton.textContent = 'Start Training';
    }
}

// Remove the old global initialization for the demo
/*
window.addEventListener('load', function() {
    const demoContainer = document.getElementById('basic-rl-demo');
    if (demoContainer) {
        new GridWorldDemo('basic-rl-demo');
    }
});
*/
