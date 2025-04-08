## 2.3.3 Introduction to Policy Gradients: Learning Policies Directly

Value-based methods like Q-learning and SARSA focus on learning the *value* of states or state-action pairs first, and then deriving a policy from those values (e.g., by acting greedily). **Policy Gradient (PG)** methods take a different approach: they learn the **policy directly**, without necessarily learning a value function first (though value functions are often used to improve PG methods, as we'll see in Actor-Critic).

### Key Idea: Parameterizing the Policy

In PG methods, the policy, denoted \( \pi(a|s; \theta) \), is represented by a function with tunable **parameters \( \theta \)**. This function outputs the probability of taking action `a` given state `s`. If using a neural network, \( \theta \) would represent the network's weights and biases.

*   If the action space is discrete, \( \pi(a|s; \theta) \) gives a probability for each action.
*   If the action space is continuous (e.g., setting a steering angle), \( \pi(a|s; \theta) \) might output the parameters of a probability distribution (like the mean and standard deviation of a Gaussian distribution) from which the action is sampled.

The goal is to find the optimal parameters \( \theta^* \) that make the policy \( \pi(a|s; \theta^*) \) achieve the highest possible expected cumulative reward.

### How it Works: Following the Gradient of Expected Reward

Policy Gradient methods use principles from optimization theory. They aim to maximize an objective function \( J(\theta) \) that represents the expected total reward obtained by following the policy \( \pi(a|s; \theta) \).

They do this by calculating the **gradient** of the objective function with respect to the policy parameters: \( \nabla_\theta J(\theta) \). This gradient vector points in the direction in the parameter space (\( \theta \)) where the expected reward increases the most.

The algorithm then updates the policy parameters by taking a small step in this direction (this is **gradient ascent**, since we are maximizing):

\[ \theta \leftarrow \theta + \alpha \nabla_\theta J(\theta) \]

where \( \alpha \) is the learning rate.

The **Policy Gradient Theorem** provides a way to compute \( \nabla_\theta J(\theta) \) without needing to know the environment dynamics. A common form is:
\[ \nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} [ \sum_{t=0}^{T} \nabla_\theta \log \pi(a_t|s_t; \theta) Q^{\pi_\theta}(s_t, a_t) ] \]
This essentially means we want to increase the probability (\( \log \pi(a_t|s_t; \theta) \)) of actions \( a_t \) that lead to higher-than-average expected returns (represented by \( Q^{\pi_\theta}(s_t, a_t) \) or often approximated by the sample return \( G_t \) or an advantage function).

By repeatedly calculating the gradient and updating the parameters, the policy gradually shifts towards one that yields higher rewards.

### Advantages of Policy Gradients

*   **Continuous Action Spaces:** PG methods are naturally suited for problems with continuous action spaces, where value-based methods like Q-learning become difficult due to the infinite number of possible actions.
*   **Stochastic Policies:** They can learn optimal *stochastic* (probabilistic) policies. In some situations (like certain games or partially observable environments), the best strategy involves randomness. Value-based methods typically produce deterministic policies (always taking the single best action).
*   **Simpler Value Function Approximation (Potentially):** Sometimes, the optimal policy might be simpler to represent (e.g., with a smaller neural network) than the optimal value function, making PG potentially easier to approximate.

### Challenges

*   **High Variance:** A major challenge is that estimating the policy gradient \( \nabla_\theta J(\theta) \) from sampled experience often results in estimates with very high variance. This means the calculated gradient can fluctuate wildly from one batch of experience to the next, leading to slow convergence and instability. Much research focuses on variance reduction techniques (e.g., using baselines, Actor-Critic methods).
*   **Local Optima:** Like many optimization problems, policy gradient methods can sometimes get stuck in a local optimum (a good policy, but not the *best* possible one) rather than finding the global optimum.
*   **Sample Efficiency:** Basic PG methods can be sample inefficient, requiring many interactions to learn.

### REINFORCE Algorithm

The simplest algorithm in the PG family is **REINFORCE** (also known as Monte Carlo Policy Gradient). It updates the policy parameters after each complete episode based on the total discounted return \( G_t \) from that episode, used as an estimate of \( Q^{\pi_\theta}(s_t, a_t) \). The update rule for an episode is effectively:
\[ \theta \leftarrow \theta + \alpha \sum_{t=0}^{T} \nabla_\theta \log \pi(a_t|s_t; \theta) G_t \]
While conceptually important, its high variance (due to using the full return \( G_t \) without subtracting a baseline) often makes it impractical for complex problems without further enhancements. 