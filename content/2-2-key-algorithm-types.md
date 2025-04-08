## 2.2 Key Algorithm Types: DP, MC, and TD Learning

Beyond the model-based vs. model-free distinction, Reinforcement Learning algorithms can be further classified by *how* they learn from experience and update their estimates. Three fundamental approaches form the basis for many specific algorithms:

1.  **Dynamic Programming (DP)**
2.  **Monte Carlo (MC) Methods**
3.  **Temporal Difference (TD) Learning**

These methods primarily differ in whether they require a model of the environment and how they estimate value functions (the expected cumulative future reward).

### 1. Dynamic Programming (DP)

*   **Core Idea:** DP methods use a **complete model** of the environment (i.e., knowing the transition probabilities \( P(s' | s, a) \) and reward function \( R(s, a) \)) to iteratively compute optimal value functions and, consequently, optimal policies.
*   **Requires Model?** Yes, a perfect model is required.
*   **How it Works:** DP uses **bootstrapping**: it updates estimates based on other estimates. For example, the value of a state is updated based on the estimated values of its successor states.
    *   **Policy Evaluation:** Given a policy \( \pi \), compute the state-value function \( V^\pi(s) \).
    *   **Policy Improvement:** Improve the policy by acting greedily with respect to the computed value function.
    *   **Policy Iteration:** Alternate between evaluation and improvement until convergence.
    *   **Value Iteration:** Combines evaluation and improvement into a single step, directly computing the optimal value function \( V^*(s) \).
*   **Key Equations:** Relies heavily on the Bellman equations (like the Bellman optimality equation for \( V^*(s) \)).
    \[ V^*(s) = \max_a \sum_{s', r} P(s', r | s, a) [r + \gamma V^*(s')] \]
*   **Pros:**
    *   Guaranteed to find the optimal policy (if the model is correct and computations complete).
    *   Foundation for many other RL concepts.
*   **Cons:**
    *   Requires a perfect model of the environment (often unavailable).
    *   Computationally expensive, especially for large state spaces ("curse of dimensionality"). It requires iterating over the entire state space.
*   **When Used:** Primarily in planning problems where a model is known (e.g., inventory management, shortest path problems with known maps) and as a theoretical basis for other methods.

### 2. Monte Carlo (MC) Methods

*   **Core Idea:** MC methods learn value functions directly from **complete episodes** of experience. They do not require a model of the environment dynamics.
*   **Requires Model?** No.
*   **How it Works:**
    1.  Run a complete episode from start to a terminal state, following some policy.
    2.  Record the sequence of states, actions, and rewards.
    3.  Calculate the **return** (cumulative discounted reward, \( G_t \)) from each state `s` visited in the episode.
    4.  Update the value estimate \( V(s) \) (or action-value \( Q(s, a) \)) by averaging the returns observed after visiting that state (or state-action pair) across many episodes.
*   **Key Concept:** Uses the average sample return as an estimate of the expected return.
*   **Pros:**
    *   Model-free.
    *   Learns directly from actual experience.
    *   Unbiased estimates of value functions (if enough episodes are averaged).
    *   Effective in episodic tasks (tasks with clear start and end points).
*   **Cons:**
    *   Only works for episodic tasks (must wait until the end of an episode to update).
    *   High variance: Returns can vary significantly between episodes, requiring many episodes to converge.
    *   Not suitable for continuous (non-episodic) tasks.

### 3. Temporal Difference (TD) Learning

*   **Core Idea:** TD learning is a blend of DP and MC methods. Like MC, it learns directly from experience without a model. Like DP, it updates value estimates based on other learned estimates (**bootstrapping**), without waiting for the end of an episode.
*   **Requires Model?** No.
*   **How it Works:**
    1.  Take a step in the environment: observe \( (s, a, r, s') \).
    2.  Update the value estimate \( V(s) \) (or \( Q(s, a) \)) immediately using the observed reward `r` and the *current estimate* of the next state's value \( V(s') \) (or \( \max_{a'} Q(s', a') \)).
    3.  The update typically involves a **TD error**: the difference between the estimated value and a better estimate based on the immediate reward and the next state's value.
        *   For \( V(s) \): \( \delta_t = r + \gamma V(s_{t+1}) - V(s_t) \)
        *   Update: \( V(s_t) \leftarrow V(s_t) + \alpha \delta_t \)
*   **Key Concept:** Learns from incomplete episodes by bootstrapping from the current value estimate of the successor state.
*   **Pros:**
    *   Model-free.
    *   Learns online (updates after each step, not just at the end of an episode).
    *   Generally more efficient (lower variance) than MC methods.
    *   Can be used in continuous (non-episodic) tasks.
*   **Cons:**
    *   Introduces bias because updates rely on potentially inaccurate estimates (bootstrapping).
    *   Sensitivity to hyperparameters (like learning rate \( \alpha \)).
*   **Examples:** Q-learning, SARSA, Actor-Critic methods often use TD updates.

### Comparison Summary

| Feature              | Dynamic Programming (DP)   | Monte Carlo (MC)       | Temporal Difference (TD) |
|----------------------|--------------------------|------------------------|--------------------------|
| **Requires Model?**  | Yes                      | No                     | No                       |
| **Bootstrapping?**   | Yes                      | No                     | Yes                      |
| **Learns From**      | Full Model               | Complete Episodes      | Incomplete Episodes    |
| **Update Timing**    | Iterative Sweeps         | End of Episode         | Every Step (Online)    |
| **Bias / Variance**  | Low Bias / Low Variance* | Low Bias / High Variance | Some Bias / Lower Variance |
| **Suitable Tasks**   | Planning / Episodic      | Episodic               | Episodic & Continuous  |

(* Low variance assumes model is correct and computations are exact*)

Understanding these three core approaches is essential, as most popular RL algorithms are variations or combinations of MC and TD learning principles. 