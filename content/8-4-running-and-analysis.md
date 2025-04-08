## 8.4 Running the Code and Analyzing Results

Now that we have the complete `cartpole_qlearning.py` script (as assembled from the previous lesson), let's run it and see how our Q-learning agent performs.

### 1. Running the Script

1.  **Save the Code:** Ensure all the code snippets from the previous lesson (`8.3`) are combined into a single file named `cartpole_qlearning.py` in your project directory.
2.  **Activate Virtual Environment:** Open your terminal or command prompt, navigate (`cd`) to your project directory, and activate the virtual environment you created in lesson `8.2`.
    *   macOS/Linux: `source venv/bin/activate`
    *   Windows: `venv\Scripts\activate`
3.  **Run the Script:** Execute the Python script:

    ```bash
    python cartpole_qlearning.py
    ```

**What to Expect:**

*   You'll see output indicating the Q-table shape.
*   During training, progress updates will be printed every 1000 episodes, showing the average reward over the last 100 episodes and the current epsilon value.
*   Training might take a few minutes, depending on your computer's speed and the number of episodes (`num_episodes`).
*   Once training is complete, a Matplotlib window should pop up displaying the reward graph.

### 2. Analyzing the Reward Plot

The plot generated at the end of the script is crucial for understanding the agent's learning progress.

*   **Blue Line (Reward per Episode):** This shows the raw total reward obtained in each individual episode. It will likely be very noisy, especially early on, due to the exploration (`epsilon`) and the inherent randomness in the environment and learning process.
*   **Red Line (Moving Average):** This provides a smoothed view of the agent's performance trend. You should see this line generally trending upwards, indicating that the agent is learning to balance the pole for longer durations over time.

**Interpreting the Results:**

*   **Successful Learning:** If the moving average consistently increases and plateaus at a high reward level (e.g., close to the `max_steps_per_episode` of 500 for CartPole-v1), it signifies successful learning. The agent has learned a policy that effectively solves the task.
*   **Slow Learning:** If the curve rises very slowly, it might indicate that the learning rate (`alpha`) is too low, exploration is insufficient, or the state discretization isn't optimal.
*   **Instability:** If the moving average fluctuates wildly or even decreases after peaking, it could suggest the learning rate is too high, leading to unstable updates, or issues with hyperparameter tuning (like `epsilon` decay).
*   **Plateauing Low:** If the performance plateaus at a low reward level, the agent might be stuck in a suboptimal policy. This could be due to poor state discretization (bins are too coarse or too fine), insufficient exploration, or challenging hyperparameter settings.

### 3. Observing Agent Behavior (Optional)

If you want to *watch* the trained agent perform, you can modify the script slightly:

1.  **Comment out Training:** Temporarily comment out the entire training loop (`for episode in range(num_episodes): ...`).
2.  **Load Trained Q-Table:** If you saved the Q-table after training (we'll cover saving/loading in the next section), load it here. For now, assume the `q_table` variable holds the trained values.
3.  **Change Environment Mode:** Modify the environment creation line to enable rendering:
    ```python
    # env = gym.make('CartPole-v1') # Original
    env = gym.make('CartPole-v1', render_mode='human') # New
    ```
4.  **Set Epsilon to 0:** Force the agent to always exploit its learned policy:
    ```python
    epsilon = 0
    ```
5.  **Run a Few Test Episodes:** Add a small loop to run a few episodes using the learned policy:
    ```python
    print("Running trained agent...")
    num_test_episodes = 10
    for i in range(num_test_episodes):
        state_continuous, info = env.reset()
        state_discrete = discretize_state(state_continuous, state_bounds, num_bins)
        terminated = False
        truncated = False
        print(f"Test Episode: {i+1}")
        while not terminated and not truncated:
            env.render() # Render the environment window
            action = np.argmax(q_table[state_discrete]) # Always exploit
            next_state_continuous, reward, terminated, truncated, info = env.step(action)
            state_discrete = discretize_state(next_state_continuous, state_bounds, num_bins)
            # Optional: Add a small delay to slow down rendering
            # import time
            # time.sleep(0.02)
        print("Episode finished.")

    env.close()
    ```
6.  **Re-run the script:** `python cartpole_qlearning.py`. You should now see the CartPole environment window and the agent attempting to balance the pole.

This analysis helps confirm if the agent learned effectively and provides insights into potential areas for improvement, which we will discuss next. 