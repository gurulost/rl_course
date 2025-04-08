## 1.1 What is Reinforcement Learning?

### Definition and Core Concept

Reinforcement Learning (RL) is a fascinating area of machine learning concerned with how intelligent agents ought to take actions in an environment in order to maximize the notion of cumulative reward. Unlike supervised learning, where algorithms learn from a labeled dataset (input-output pairs), and unsupervised learning, which finds patterns in unlabeled data, RL learns through interaction and feedback.

Think of training a pet: you don't give it a manual on how to sit. Instead, you might give it a treat (a positive reward) when it sits correctly and perhaps a gentle correction (or lack of reward) when it doesn't. Over time, the pet learns which actions (like sitting) lead to desirable outcomes (treats).

RL operates on a similar principle: an **agent** interacts with an **environment**. The agent performs **actions**, the environment responds by changing its **state** and providing a **reward** (or penalty). The agent's goal is to learn a **policy**—a strategy for choosing actions—that maximizes the total accumulated reward over time.

### Comparison with Supervised and Unsupervised Learning

| Feature          | Supervised Learning                  | Unsupervised Learning        | Reinforcement Learning          |
|------------------|--------------------------------------|------------------------------|---------------------------------|
| **Input Data**   | Labeled data (input-output pairs)  | Unlabeled data             | Interaction data (state, action, reward, next state) |
| **Goal**         | Predict output for new inputs       | Discover hidden patterns     | Learn optimal behavior (policy) |
| **Learning Signal**| Labels / Ground truth              | Data structure / Similarity| Rewards / Penalties             |
| **Interaction**  | Passive (learns from fixed data)   | Passive                    | Active (learns by doing)        |
| **Key Challenge**| Generalization to unseen data       | Meaningful representation    | Exploration vs. Exploitation  |

RL is distinct because:
1.  **No Supervisor:** There are no explicit labels telling the agent the "correct" action for every situation.
2.  **Delayed Feedback:** The reward for an action might not be immediate. An action taken now could have consequences much later (e.g., a single move in chess).
3.  **Sequential Decisions:** Actions affect subsequent states and rewards. The agent needs to consider the long-term consequences of its actions.
4.  **Active Exploration:** The agent must explore the environment to discover which actions yield the most reward, balancing this with exploiting actions it already knows are good.

### Historical Development and Key Milestones

RL has roots in several fields, including computer science, psychology (behaviorism), control theory, and neuroscience.

*   **Early Ideas (1950s-1960s):** Concepts like trial-and-error learning and optimal control laid the groundwork. Bellman's work on Dynamic Programming and the Bellman Equation was crucial.
*   **Temporal Difference Learning (1980s):** Richard Sutton's work on Temporal Difference (TD) learning provided a way to learn from delayed rewards without needing a complete model of the environment, bridging Dynamic Programming and Monte Carlo methods.
*   **Q-Learning (1989):** Chris Watkins developed Q-learning, a groundbreaking model-free RL algorithm that learns the value of state-action pairs.
*   **TD-Gammon (1992):** Gerald Tesauro created TD-Gammon, a backgammon-playing program using TD learning that achieved world-class performance, demonstrating RL's potential in complex games.
*   **Deep Reinforcement Learning (2013-Present):** The combination of RL with deep neural networks (Deep Learning) led to major breakthroughs.
    *   **DeepMind's Atari Player (2013/2015):** Used a Deep Q-Network (DQN) to learn to play Atari games directly from pixel input, surpassing human performance on many.
    *   **AlphaGo (2016):** DeepMind's program defeated the world champion Go player using deep RL, value networks, and policy networks, combined with Monte Carlo Tree Search.
    *   **Advancements in Robotics, Control, and LLMs (Ongoing):** RL continues to push boundaries in complex control tasks, robotics, and increasingly, in fine-tuning and enhancing large language models.

Understanding these foundations sets the stage for exploring the core components and algorithms that drive modern Reinforcement Learning. 