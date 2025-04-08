## 2.3 SARSA: Learning On-Policy

SARSA (State-Action-Reward-State-Action) is another fundamental Temporal Difference (TD) learning algorithm. It's very similar to Q-learning but differs in one crucial aspect: SARSA is an **on-policy** algorithm.

### Key Idea: Learning the Value of the Current Policy

While Q-learning tries to learn the value `Q*(s, a)` of the *optimal* policy directly, SARSA learns the Q-value function `Q(s, a)` for the **policy the agent is currently following**. This policy usually includes exploration steps (like epsilon-greedy).

This means SARSA learns how good it is to take action `a` in state `s`, *given that it will continue to behave according to its current exploration/exploitation strategy* in the future.

### The SARSA Update Rule

The SARSA update rule reflects this on-policy nature. The update occurs after observing the entire tuple (State `S_t`, Action `A_t`, Reward `R_{t+1}`, Next State `S_{t+1}`, Next Action `A_{t+1}`), where `A_{t+1}` is the action actually chosen by the current policy in state `S_{t+1}`:

```
Q(S_t, A_t) ← Q(S_t, A_t) + α [ R_{t+1} + γ Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t) ]
```

Let's compare this directly to the Q-learning update:

*   **Q-Learning Target:** `R_{t+1} + γ *max_a* Q(S_{t+1}, a)` (Uses the max Q-value of the next state)
*   **SARSA Target:** `R_{t+1} + γ Q(S_{t+1}, *A_{t+1}*)` (Uses the Q-value of the *actual next action taken* by the policy)

Because the update rule uses the action `A_{t+1}` actually selected by the current policy (which might be an exploratory random action if using epsilon-greedy), SARSA is an **on-policy** algorithm. It learns the value of behaving according to that specific policy.

### SARSA vs. Q-learning: The "Cliff Walking" Example Revisited

The difference between on-policy (SARSA) and off-policy (Q-learning) learning has practical consequences. Consider the "cliff walking" scenario again:

*   An agent needs to get from a start point to a goal, moving along the edge of a cliff. Falling off gives a large negative reward. The optimal path is right along the edge.
*   **Q-learning:** Will learn Q-values reflecting the optimal path along the cliff edge. However, if its exploration policy (epsilon-greedy) sometimes makes it step off the cliff, it learns the optimal path *value* but might still perform badly *during* learning because its behavior policy is unsafe.
*   **SARSA:** Learns Q-values reflecting its actual epsilon-greedy behavior. Since its behavior sometimes involves randomly stepping off the cliff, the Q-values for states near the cliff edge will be lower (reflecting the risk). Consequently, SARSA often learns a safer (but potentially slightly longer/suboptimal) path further away from the cliff edge.

**In summary:**

*   **Q-learning (Off-policy):** Directly estimates the optimal value function. Can learn even from observing other agents or random exploration. May behave differently during learning than the policy it learns.
*   **SARSA (On-policy):** Estimates the value function for the current behavior policy. Generally leads to more "realistic" or safer behavior during learning if the policy involves exploration in risky situations. The final learned policy depends on the exploration strategy used throughout training.

<!-- CODE_PLACEHOLDER data-example-id="sarsa-code" -->
*(Placeholder: SARSA code example)*

<!-- DIAGRAM data-diagram="qlearn-sarsa-compare" -->
*(Placeholder: Q-learning vs SARSA update diagram/table)* 