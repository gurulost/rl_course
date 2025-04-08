## 2.3.2 SARSA: Learning On-Policy

SARSA (State-Action-Reward-State-Action) is another fundamental Temporal Difference (TD) learning algorithm. It's very similar to Q-learning but differs in one crucial aspect: SARSA is an **on-policy** algorithm.

### Key Idea: Learning the Value of the Current Policy

While Q-learning tries to learn the value `Q*(s, a)` of the *optimal* policy directly, SARSA learns the Q-value function `Q(s, a)` for the **policy the agent is currently following**. This policy usually includes exploration steps (like epsilon-greedy).

This means SARSA learns how good it is to take action `a` in state `s`, *given that it will continue to behave according to its current exploration/exploitation strategy* in the future.

### The SARSA Update Rule

The SARSA update rule reflects this on-policy nature. The update occurs after observing the entire tuple (State `S_t`, Action `A_t`, Reward `R_{t+1}`, Next State `S_{t+1}`, Next Action `A_{t+1}`), where `A_{t+1}` is the action actually chosen by the current policy in state `S_{t+1}`:

\[ Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [ R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t) ] \]

Let's compare this directly to the Q-learning update:

*   **Q-Learning Target:** \( R_{t+1} + \gamma \max_a Q(S_{t+1}, a) \) (Uses the max Q-value of the next state)
*   **SARSA Target:** \( R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) \) (Uses the Q-value of the *actual next action taken* by the policy)

Because the update rule uses the action `A_{t+1}` actually selected by the current policy (which might be an exploratory random action if using epsilon-greedy), SARSA is an **on-policy** algorithm. It learns the value of behaving according to that specific policy.

### SARSA vs. Q-learning: The "Cliff Walking" Example

The difference between on-policy (SARSA) and off-policy (Q-learning) learning has practical consequences. Consider a classic example: "cliff walking".

*   **Setup:** An agent needs to get from a start `S` to a goal `G` in a grid. Some grid cells are a cliff (`C`). Stepping onto the cliff gives a large negative reward (-100) and sends the agent back to `S`. Reaching `G` gives a positive reward. Every other step gives a small negative reward (-1).

    ```
    +---+---+---+---+---+---+
    |   |   |   |   |   |   |
    +---+---+---+---+---+---+
    | S | C | C | C | C | G |
    +---+---+---+---+---+---+
    ```
*   **Optimal Path:** The objectively shortest path (fewest -1 steps) is right along the edge of the cliff.
*   **Exploration:** Assume the agent uses epsilon-greedy (sometimes takes random actions).

*   **Q-learning:** Learns Q-values reflecting the optimal path along the cliff edge. It finds the best path assuming optimal actions are always taken from the next state. However, while learning with epsilon-greedy, it might frequently step onto the cliff due to exploration, resulting in poor performance *during* learning.
*   **SARSA:** Learns Q-values reflecting its actual epsilon-greedy behavior. Since its behavior sometimes involves randomly stepping onto the cliff, the Q-values for states near the cliff edge will be lower (reflecting this risk). Consequently, SARSA often learns a safer (but potentially slightly longer) path further away from the cliff edge to avoid the high penalty associated with exploration near the cliff.

**In summary:**

*   **Q-learning (Off-policy):** Directly estimates the optimal value function. Can learn even from observing other agents or random exploration. May behave differently during learning than the policy it learns. Focuses on the *best possible* outcome.
*   **SARSA (On-policy):** Estimates the value function for the current behavior policy. Generally leads to more "realistic" or safer behavior during learning if the policy involves exploration in risky situations. The final learned policy depends on the exploration strategy used throughout training. Focuses on the expected outcome *given the current behavior*. 