## 8.2 Project Environment Setup & Libraries

To build our CartPole agent, we need a Python environment with a few key libraries.

### 1. Python Installation

Ensure you have a recent version of Python installed (Python 3.8 or later is recommended). If you don't have Python, you can download it from the official website: [python.org](https://www.python.org/).

### 2. Virtual Environment (Highly Recommended)

Using virtual environments is a best practice in Python development. It allows you to create isolated environments for each project, preventing conflicts between library versions.

Open your terminal or command prompt and follow these steps:

```bash
# Navigate to your desired project directory (e.g., rl_course_project)
cd path/to/your/project

# Create a virtual environment named 'rl_env' (or any name you prefer)
# On Windows:
py -m venv rl_env
# On macOS/Linux:
python3 -m venv rl_env

# Activate the virtual environment
# On Windows (Command Prompt):
rl_env\\Scripts\\activate.bat
# On Windows (PowerShell):
rl_env\\Scripts\\Activate.ps1
# On Windows (Git Bash):
source rl_env/Scripts/activate
# On macOS/Linux:
source rl_env/bin/activate
```
After activation, you should see the environment name (e.g., `(rl_env)`) prefixed to your terminal prompt. All subsequent `pip install` commands will install packages into this isolated environment.

### 3. Installing Required Libraries

With your virtual environment active, install the following libraries using `pip`:

*   **Gymnasium:** This library provides the CartPole environment and many others, along with a standard API for interacting with them. We install the `classic_control` group of environments.
    ```bash
    pip install "gymnasium[classic_control]"
    ```
*   **NumPy:** The fundamental package for numerical computing in Python. We'll use it extensively for managing the Q-table and handling state arrays.
    ```bash
    pip install numpy
    ```
*   **Matplotlib (Optional but Recommended):** A popular plotting library. We'll use it to visualize the agent's learning progress by plotting the rewards obtained over training episodes.
    ```bash
    pip install matplotlib
    ```

Verify the installations by trying to import them in a Python interpreter within your activated environment (e.g., run `python` then `import gymnasium`).

### 4. Creating Your Project File

Inside your project directory, create a new Python file named `cartpole_qlearning.py`. This file will contain all the code for our Q-learning agent implementation, which we'll build in the next lesson.

With the environment set up and libraries installed, you're ready to start coding! 