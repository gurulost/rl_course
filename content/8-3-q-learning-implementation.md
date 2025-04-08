## 8.3 Implementing the Q-Learning Agent

Let's build the Q-learning agent step-by-step in our `cartpole_qlearning.py` file.

### 1. Imports and Setup

First, import the necessary libraries and initialize the CartPole environment:

```python
import gymnasium as gym
import numpy as np
import math
import matplotlib.pyplot as plt

# Load the CartPole environment
env = gym.make('CartPole-v1')

# You can optionally render the environment, but it slows down training significantly.
# env = gym.make('CartPole-v1', render_mode='human')
```

### 2. Discretizing the Continuous State Space

Q-learning requires a discrete state space to build its Q-table. The CartPole environment gives us continuous values (position, velocity, angle, angular velocity). We need to convert these into discrete bins.

We'll define the number of bins for each state variable and calculate the size of each bin based on the environment's observation space limits.

```python
# Define the number of bins for each part of the state space
# (cart_position, cart_velocity, pole_angle, pole_velocity_at_tip)
num_bins = (6, 12, 6, 12) # Example values, can be tuned

# Get the bounds for each state variable
state_bounds = list(zip(env.observation_space.low, env.observation_space.high))

# Adjust some bounds for practicality (especially velocity and angular velocity)
state_bounds[1] = [-0.5, 0.5]
state_bounds[3] = [-math.radians(50), math.radians(50)] # Limit angular velocity

# Function to discretize a continuous state into a tuple of integers (bin indices)
def discretize_state(state, bounds, bins):
    discrete_state = []
    for i in range(len(state)):
        # Handle cases where state is outside the bounds
        if state[i] <= bounds[i][0]:
            bin_index = 0
        elif state[i] >= bounds[i][1]:
            bin_index = bins[i] - 1
        else:
            # Calculate bin index within the bounds
            bound_width = bounds[i][1] - bounds[i][0]
            offset = (state[i] - bounds[i][0]) / bound_width
            scaling = offset * bins[i]
            bin_index = int(math.floor(scaling))
            # Ensure bin_index is within [0, bins[i] - 1]
            bin_index = max(0, min(bins[i] - 1, bin_index))
        discrete_state.append(bin_index)
    return tuple(discrete_state)
```
*Explanation:* The `discretize_state` function takes the continuous state array, the calculated bounds, and the number of bins. For each state variable, it determines which bin the value falls into and returns a tuple of these bin indices, representing the discrete state.

### 3. Initializing the Q-Table

Now, we create the Q-table. It needs dimensions corresponding to the number of bins for each state variable, plus the number of actions.

```python
# Q-table dimensions: (bins_pos, bins_vel, bins_angle, bins_ang_vel, num_actions)
q_table_shape = num_bins + (env.action_space.n,)

# Initialize the Q-table with small random values (or zeros)
# Using small random values can help break ties during initial exploration
q_table = np.random.uniform(low=-1, high=0, size=q_table_shape)

print(f"Q-table shape: {q_table.shape}")
```

### 4. Defining Hyperparameters

Set the learning rate (`alpha`), discount factor (`gamma`), and exploration rate (`epsilon`) parameters. We'll also define how `epsilon` decays over time to shift from exploration to exploitation.

```python
# Learning parameters
learning_rate = 0.1  # Alpha
discount_factor = 0.99 # Gamma

# Exploration parameters (Epsilon-greedy)
epsilon = 1.0          # Initial exploration rate
epsilon_decay_rate = 0.001 # Rate of decay
min_epsilon = 0.01     # Minimum exploration rate
rng = np.random.default_rng() # Random number generator for epsilon-greedy
```

### 5. The Q-Learning Algorithm Loop

This is the core training loop where the agent interacts with the environment and updates the Q-table.

```python
num_episodes = 20000 # Total number of training episodes
max_steps_per_episode = 500 # Max steps before truncation (as per CartPole-v1)
rewards_per_episode = np.zeros(num_episodes) # To track rewards for plotting

# Training Loop
for episode in range(num_episodes):
    # Reset environment and get initial discrete state
    state_continuous, info = env.reset()
    state_discrete = discretize_state(state_continuous, state_bounds, num_bins)
    terminated = False
    truncated = False
    episode_reward = 0

    while not terminated and not truncated:
        # Epsilon-greedy action selection
        if rng.random() < epsilon:
            action = env.action_space.sample() # Explore: random action
        else:
            action = np.argmax(q_table[state_discrete]) # Exploit: best action from Q-table

        # Perform action and get next state, reward, flags
        next_state_continuous, reward, terminated, truncated, info = env.step(action)
        next_state_discrete = discretize_state(next_state_continuous, state_bounds, num_bins)

        # Update Q-value for the state-action pair
        # TD Target = R + gamma * max_a(Q(S', a))
        td_target = reward + discount_factor * np.max(q_table[next_state_discrete])
        # TD Error = TD Target - Q(S, A)
        td_error = td_target - q_table[state_discrete + (action,)]
        # Q-table Update: Q(S, A) <- Q(S, A) + alpha * TD Error
        q_table[state_discrete + (action,)] += learning_rate * td_error

        # Move to the next state and accumulate reward
        state_discrete = next_state_discrete
        episode_reward += reward

    # Decay epsilon after each episode
    epsilon = max(min_epsilon, epsilon * (1 - epsilon_decay_rate))
    # Slightly faster decay alternative:
    # epsilon = min_epsilon + (1.0 - min_epsilon) * np.exp(-epsilon_decay_rate*episode)

    rewards_per_episode[episode] = episode_reward

    # Print progress periodically
    if (episode + 1) % 1000 == 0:
        print(f"Episode {episode + 1}/{num_episodes} - Average Reward (last 100): {np.mean(rewards_per_episode[episode-99:episode+1]):.2f} - Epsilon: {epsilon:.3f}")

# Close the environment (especially needed if rendering was enabled)
env.close()
```

### 6. Visualizing Results (Optional)

Plot the rewards per episode to see how the agent's performance improved over time.

```python
# Calculate moving average for smoother plotting
window_size = 100
moving_avg_rewards = np.convolve(rewards_per_episode, np.ones(window_size)/window_size, mode='valid')

plt.figure(figsize=(12, 6))
plt.plot(rewards_per_episode, label='Reward per Episode', alpha=0.6)
plt.plot(np.arange(window_size - 1, num_episodes), moving_avg_rewards, label=f'{window_size}-Episode Moving Average', color='red')
plt.xlabel('Episode')
plt.ylabel('Total Reward')
plt.title('CartPole Q-Learning Training Progress')
plt.legend()
plt.grid(True)
plt.ylim(0, max_steps_per_episode + 10) # Set y-axis limit based on max possible reward
plt.show()
```

This completes the implementation. The next lesson will discuss running the code, analyzing the results, and potential improvements. 