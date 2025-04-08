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
    // Toggle active class
    module.classList.toggle('active');
    
    // Update button text
    const button = module.querySelector('.expand-btn');
    if (module.classList.contains('active')) {
        button.textContent = 'Collapse';
    } else {
        button.textContent = 'Expand';
    }
    
    // Update progress
    updateProgress();
}

// Toggle lesson expand/collapse
function toggleLesson(lesson) {
    // Toggle active class
    lesson.classList.toggle('active');
    
    // Update progress
    updateProgress();
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
    // Load content for the first module
    loadModuleContent('module1');
}

// Load content for a specific module
function loadModuleContent(moduleId) {
    const module = document.getElementById(moduleId);
    if (!module) return;
    
    // For demonstration, we'll just simulate loading content
    console.log(`Loading content for ${moduleId}...`);
    
    // In a real implementation, this would fetch content from a server or load from local files
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
        // Clear all cells
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.grid[row][col];
                
                if (cell.isObstacle) {
                    cell.element.style.backgroundColor = '#343a40';
                } else if (row === this.goal.row && col === this.goal.col) {
                    cell.element.style.backgroundColor = '#28a745';
                    cell.element.textContent = '🎯';
                } else {
                    cell.element.style.backgroundColor = '#f0f0f0';
                    cell.element.textContent = '';
                }
            }
        }
        
        // Render agent
        const agentCell = this.grid[this.agent.row][this.agent.col];
        agentCell.element.textContent = '🤖';
        
        // Update stats
        document.getElementById('episodes').textContent = this.episodes;
        document.getElementById('steps').textContent = this.steps;
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
