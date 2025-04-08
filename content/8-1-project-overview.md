## 8.1 Project Overview: Training a CartPole Agent

Now it's time to put theory into practice! In this hands-on module, we'll build and train a Reinforcement Learning agent to solve the classic **CartPole** control problem using Q-learning. This is a standard benchmark problem in RL, great for understanding the fundamentals of training an agent.

### The CartPole Environment

Imagine balancing a tall pole vertically on a small cart that can only move left or right on a frictionless track. That's CartPole! The environment is provided by the popular `Gymnasium` library (formerly OpenAI Gym).

<!-- IMAGE data-image="cartpole.gif" alt="CartPole Environment Animation" -->
*(Placeholder: Image/GIF of the CartPole environment)*

*   **Goal:** The agent's goal is to move the cart left or right at each timestep to keep the pole balanced upright for as long as possible.
*   **State:** The agent doesn't see the visual scene directly. Instead, it observes the environment's state through four continuous (floating-point) values:
    1.  Cart Position (meters from center)
    2.  Cart Velocity (meters per second)
    3.  Pole Angle (radians from vertical; 0 = perfectly upright)
    4.  Pole Angular Velocity (radians per second; rate of angle change)
*   **Actions:** The agent has two possible discrete actions it can take at each step:
    *   Action 0: Push the cart to the left with a fixed force.
    *   Action 1: Push the cart to the right with a fixed force.
*   **Reward:** The agent receives a reward of **+1** for every single timestep that the episode continues.
*   **Episode Termination:** An "episode" (one attempt at balancing) ends if any of the following occur:
    *   The pole angle goes beyond ±12 degrees from vertical.
    *   The cart position moves more than ±2.4 meters from the center of the track.
    *   The episode length (number of timesteps) reaches a predefined limit (e.g., 500 steps for the 'CartPole-v1' version).

### Our Objective

We will implement a **Q-learning** agent. Since standard Q-learning requires a *discrete* state space to build its Q-table (mapping state-action pairs to values), and CartPole provides *continuous* state values, our first challenge will be to **discretize** the state space. We'll convert the continuous values into discrete "bins" or ranges. Our agent will then learn a Q-table based on these discrete states and the two actions (left/right) to maximize the total reward per episode (effectively, maximizing the number of timesteps it can keep the pole balanced). 