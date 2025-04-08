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
    const totalModules = document.querySelectorAll('.module').length;
    const completedModules = document.querySelectorAll('.module.completed').length;
    const activeModules = document.querySelectorAll('.module.active').length;
    
    // Calculate progress percentage (completed modules + half credit for active modules)
    const progressPercent = Math.round((completedModules + (activeModules * 0.5)) / totalModules * 100);
    
    // Update the progress bar
    document.querySelector('.progress').style.width = `${progressPercent}%`;
    document.getElementById('progress-percent').textContent = `${progressPercent}%`;
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

    // Construct the likely markdown file name (needs refinement based on actual file structure)
    // Assuming files like 'content/lesson1-1.md', 'content/lesson1-2.md' etc.
    // Or perhaps map lesson IDs to specific files like 'rl_basics.md' and extract sections?
    // For now, let's assume a simple mapping (e.g., lesson1-1 -> rl_basics.md section)
    // This part needs a clear strategy for mapping lesson IDs to content sources.
    
    // *** Placeholder Mapping Strategy: ***
    // Let's assume a mapping object exists (this should be defined properly)
    const lessonContentMap = {
        'lesson1-1': { file: 'rl_basics.md', section: 'What is Reinforcement Learning?' },
        'lesson1-2': { file: 'rl_basics.md', section: 'Core Components of RL' },
        // Add mappings for all other lessons...
        'lesson2-1': { file: 'algorithms.md', section: 'Q-Learning' }, // Example
    };

    const mapping = lessonContentMap[lessonId];
    if (!mapping) {
        contentDiv.innerHTML = '<p>Content mapping not found for this lesson.</p>';
        contentDiv.dataset.loaded = 'true'; // Mark as loaded (even if failed)
        return;
    }

    const filePath = `content/${mapping.file}`;
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdown = await response.text();
        
        // --- Option 1: Load entire file and potentially filter later ---
        // For simplicity now, let's render the whole file.
        // In a real scenario, you'd parse the markdown and extract the relevant section
        // based on mapping.section, or structure your .md files per lesson.
        if (typeof marked === 'undefined') {
             contentDiv.innerHTML = '<p>Error: marked.js library not found.</p>';
        } else {
             contentDiv.innerHTML = marked.parse(markdown); // Use marked.js to parse
        }
       
        contentDiv.dataset.loaded = 'true'; // Mark as loaded successfully
        
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
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.agent = { row: 0, col: 0 };
        this.goal = { row: rows - 1, col: cols - 1 };
        this.obstacles = [];
        this.isTraining = false;
        this.episodes = 0;
        this.steps = 0;
        
        this.initialize();
    }
    
    initialize() {
        // Create grid
        this.createGrid();
        
        // Create controls
        this.createControls();
        
        // Initial render
        this.render();
    }
    
    createGrid() {
        const gridElement = document.createElement('div');
        gridElement.className = 'grid-world';
        gridElement.style.display = 'grid';
        gridElement.style.gridTemplateColumns = `repeat(${this.cols}, 50px)`;
        gridElement.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;
        gridElement.style.gap = '2px';
        
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.style.width = '50px';
                cell.style.height = '50px';
                cell.style.backgroundColor = '#f0f0f0';
                cell.style.border = '1px solid #ccc';
                cell.style.display = 'flex';
                cell.style.justifyContent = 'center';
                cell.style.alignItems = 'center';
                
                gridElement.appendChild(cell);
                this.grid[row][col] = {
                    element: cell,
                    isObstacle: false,
                    reward: row === this.rows - 1 && col === this.cols - 1 ? 100 : -1
                };
            }
        }
        
        this.container.appendChild(gridElement);
    }
    
    createControls() {
        const controls = document.createElement('div');
        controls.className = 'grid-controls';
        controls.style.marginTop = '20px';
        
        // Start/Stop button
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Training';
        startButton.className = 'start-button';
        startButton.style.padding = '8px 16px';
        startButton.style.marginRight = '10px';
        startButton.style.backgroundColor = '#4a6baf';
        startButton.style.color = 'white';
        startButton.style.border = 'none';
        startButton.style.borderRadius = '4px';
        startButton.style.cursor = 'pointer';
        
        startButton.addEventListener('click', () => {
            if (this.isTraining) {
                this.stopTraining();
                startButton.textContent = 'Start Training';
            } else {
                this.startTraining();
                startButton.textContent = 'Stop Training';
            }
        });
        
        // Reset button
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.className = 'reset-button';
        resetButton.style.padding = '8px 16px';
        resetButton.style.backgroundColor = '#6c757d';
        resetButton.style.color = 'white';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '4px';
        resetButton.style.cursor = 'pointer';
        
        resetButton.addEventListener('click', () => {
            this.reset();
        });
        
        // Stats display
        const stats = document.createElement('div');
        stats.className = 'stats';
        stats.style.marginTop = '10px';
        stats.innerHTML = `
            <p>Episodes: <span id="episodes">0</span></p>
            <p>Steps: <span id="steps">0</span></p>
        `;
        
        controls.appendChild(startButton);
        controls.appendChild(resetButton);
        controls.appendChild(stats);
        
        this.container.appendChild(controls);
    }
    
    render() {
        // Clear all cells and reset styles
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.grid[row][col];
                cell.element.innerHTML = ''; // Clear previous content (emoji or img)
                
                // Reset background for non-obstacle cells
                // Relies on CSS for default cell background
                cell.element.style.backgroundColor = ''; 

                if (cell.isObstacle) {
                    // Use CSS variable or a specific color for obstacles if needed
                    cell.element.style.backgroundColor = 'var(--text-secondary-color)'; 
                } else if (row === this.goal.row && col === this.goal.col) {
                    // Set goal icon using img tag
                    //cell.element.style.backgroundColor = '#28a745'; // Remove background color, rely on icon
                    cell.element.innerHTML = '<img src="images/goal-icon.svg" alt="Goal" style="width: 70%; height: 70%; object-fit: contain;">';
                } 
                // Agent is handled separately below to overlay on any cell type except obstacle
            }
        }
        
        // Render agent (only if not on an obstacle cell)
        if (!this.grid[this.agent.row][this.agent.col].isObstacle) {
            const agentCell = this.grid[this.agent.row][this.agent.col];
             // Ensure agent icon does not overwrite goal icon if they overlap (agent wins)
            agentCell.element.innerHTML = '<img src="images/agent-icon.svg" alt="Agent" style="width: 80%; height: 80%; object-fit: contain;">'; 
        }
        
        // Update stats
        // Ensure stats elements exist before updating
        const episodesSpan = document.getElementById('episodes');
        const stepsSpan = document.getElementById('steps');
        if (episodesSpan) episodesSpan.textContent = this.episodes;
        if (stepsSpan) stepsSpan.textContent = this.steps;
    }
    
    startTraining() {
        this.isTraining = true;
        this.trainingInterval = setInterval(() => {
            this.step();
        }, 200); // Step every 200ms
    }
    
    stopTraining() {
        this.isTraining = false;
        clearInterval(this.trainingInterval);
    }
    
    step() {
        // Simple random policy for demonstration
        const actions = this.getValidActions();
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        // Move agent
        this.moveAgent(randomAction);
        
        // Check if reached goal
        if (this.agent.row === this.goal.row && this.agent.col === this.goal.col) {
            this.episodes++;
            this.resetAgent();
        }
        
        this.steps++;
        this.render();
    }
    
    getValidActions() {
        const actions = [];
        
        // Check up
        if (this.agent.row > 0 && !this.grid[this.agent.row - 1][this.agent.col].isObstacle) {
            actions.push('up');
        }
        
        // Check right
        if (this.agent.col < this.cols - 1 && !this.grid[this.agent.row][this.agent.col + 1].isObstacle) {
            actions.push('right');
        }
        
        // Check down
        if (this.agent.row < this.rows - 1 && !this.grid[this.agent.row + 1][this.agent.col].isObstacle) {
            actions.push('down');
        }
        
        // Check left
        if (this.agent.col > 0 && !this.grid[this.agent.row][this.agent.col - 1].isObstacle) {
            actions.push('left');
        }
        
        return actions;
    }
    
    moveAgent(action) {
        switch (action) {
            case 'up':
                this.agent.row--;
                break;
            case 'right':
                this.agent.col++;
                break;
            case 'down':
                this.agent.row++;
                break;
            case 'left':
                this.agent.col--;
                break;
        }
    }
    
    resetAgent() {
        this.agent = { row: 0, col: 0 };
    }
    
    reset() {
        this.stopTraining();
        this.resetAgent();
        this.episodes = 0;
        this.steps = 0;
        this.render();
        
        const startButton = document.querySelector('.start-button');
        if (startButton) {
            startButton.textContent = 'Start Training';
        }
    }
}

// Initialize the grid world demo when the page is fully loaded
window.addEventListener('load', function() {
    // Check if the demo container exists
    const demoContainer = document.getElementById('basic-rl-demo');
    if (demoContainer) {
        new GridWorldDemo('basic-rl-demo');
    }
});
