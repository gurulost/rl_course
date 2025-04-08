## 2.4 Introduction to Policy Gradients: Learning Policies Directly

Value-based methods like Q-learning and SARSA focus on learning the *value* of states or state-action pairs first, and then deriving a policy from those values (e.g., by acting greedily). **Policy Gradient (PG)** methods take a different approach: they learn the **policy directly**, without necessarily learning a value function first (though value functions are often used to improve PG methods, as we'll see in Actor-Critic).

### Key Idea: Parameterizing the Policy

In PG methods, the policy, denoted `π(a|s; θ)`, is represented by a function with tunable **parameters `θ`**. This function outputs the probability of taking action `a` given state `s`. If using a neural network, `θ` would represent the network's weights and biases.

*   If the action space is discrete, `π(a|s; θ)` gives a probability for each action.
*   If the action space is continuous (e.g., setting a steering angle), `π(a|s; θ)` might output the parameters of a probability distribution (like the mean and standard deviation of a Gaussian distribution) from which the action is sampled.

The goal is to find the optimal parameters `θ*` that make the policy `π(a|s; θ*)` achieve the highest possible expected cumulative reward.

### How it Works: Following the Gradient of Expected Reward

Policy Gradient methods use principles from optimization theory. They aim to maximize an objective function `J(θ)` that represents the expected total reward obtained by following the policy `π(a|s; θ)`.

They do this by calculating the **gradient** of the objective function with respect to the policy parameters: `∇θ J(θ)`. This gradient vector points in the direction in the parameter space (`θ`) where the expected reward increases the most.

The algorithm then updates the policy parameters by taking a small step in this direction (this is **gradient ascent**, since we are maximizing):

```
θ ← θ + α * ∇θ J(θ)
```

where `α` is the learning rate.

By repeatedly calculating the gradient and updating the parameters, the policy gradually shifts towards one that yields higher rewards.

### Advantages of Policy Gradients

*   **Continuous Action Spaces:** PG methods are naturally suited for problems with continuous action spaces, where value-based methods like Q-learning become difficult due to the infinite number of possible actions.
*   **Stochastic Policies:** They can learn optimal *stochastic* (probabilistic) policies. In some situations (like certain games or partially observable environments), the best strategy involves randomness. Value-based methods typically produce deterministic policies (always taking the single best action).
*   **Simpler Value Function Approximation (Potentially):** Sometimes, the optimal policy might be simpler to represent (e.g., with a smaller neural network) than the optimal value function, making PG potentially easier to approximate.

### Challenges

*   **High Variance:** A major challenge is that estimating the policy gradient `∇θ J(θ)` from sampled experience often results in estimates with very high variance. This means the calculated gradient can fluctuate wildly from one batch of experience to the next, leading to slow convergence and instability. Much research focuses on variance reduction techniques.
*   **Local Optima:** Like many optimization problems, policy gradient methods can sometimes get stuck in a local optimum (a good policy, but not the *best* possible one) rather than finding the global optimum.

### REINFORCE Algorithm

The simplest algorithm in the PG family is **REINFORCE**. It updates the policy parameters after each complete episode based on the total discounted reward (return) `G_t` received during that episode. The update involves scaling the gradient of the log-probability of the taken actions by the episode's return. While conceptually important, its high variance often makes it impractical for complex problems without further enhancements.

<!-- CODE_PLACEHOLDER data-example-id="pg-code" -->
*(Placeholder: Simple Policy Gradient (e.g., REINFORCE) code example)* 