# Assignment: Develop a Voting Smart Contract in Solidity

## Objective
Your goal is to create a decentralized voting smart contract in Solidity. This assignment will guide you through defining the structure and implementing functions and attributes without providing the complete code. Follow the steps and instructions to build the contract from scratch.

## Requirements
1. **Setup Development Environment**
   - Ensure you have Node.js and npm installed.
   - Install Hardhat and set up a new project.

## Part 1: Define the Contract Structure

1. **Contract Name and Pragma Directive**
   - Set the Solidity version.
   - Name your contract `Voting`.

## Part 2: Define Data Structures

1. **Enums**
   - Create an enum `VotingState` with the states: `NotStarted`, `Ongoing`, `Ended`.

2. **Structs**
   - Define a `Candidate` struct with attributes:
     - `uint id`
     - `string name`
     - `uint voteCount`
   - Define a `Voter` struct with attributes:
     - `bool hasVoted`
     - `uint voteIndex`

## Part 3: State Variables

1. **State Variable for Contract State**
   - Create a public state variable `state` of type `VotingState`.

2. **Mappings**
   - Create a mapping `candidates` to map `uint` to `Candidate`.
   - Create a mapping `voters` to map `address` to `Voter`.

3. **Arrays**
   - Create an array `candidateIds` to store `uint` values of candidate IDs.

4. **Counters**
   - Create a counter `nextId` of type `uint` to generate unique candidate IDs.

## Part 4: Events

1. **Define Events**
   - `CandidateRegistered(uint id, string name)`
   - `Voted(uint id, string name)`
   - `VotingEnded(string winnerName)`

## Part 5: Modifiers

1. **State Modifier**
   - Create a modifier `inState(VotingState _state)` to enforce function execution based on the contract's state.

## Part 6: Functions

1. **startVoting()**
   - **Description:** Transitions the contract to the `Ongoing` state.
   - **Requirements:** Must only be callable when the state is `NotStarted`.

2. **registerCandidate(string memory _name)**
   - **Description:** Registers a new candidate with a given name.
   - **Requirements:** Must only be callable when the state is `NotStarted`.
   - **Actions:** Create a new `Candidate` struct, store it in the `candidates` mapping, and update `candidateIds`.

3. **vote(uint _id)**
   - **Description:** Allows a voter to vote for a candidate by ID.
   - **Requirements:** Must only be callable when the state is `Ongoing`.
   - **Actions:** Check if the voter has already voted, update `Voter` struct, and increment the candidate's `voteCount`.

4. **endVoting()**
   - **Description:** Ends the voting process and determines the winner.
   - **Requirements:** Must only be callable when the state is `Ongoing`.
   - **Actions:** Transition to the `Ended` state, calculate the candidate with the highest votes, and emit `VotingEnded` event with the winner's name.

## Submission

- **Deadline:** [Specify Deadline]
- **Deliverables:**
  - Solidity contract code file (`Voting.sol`).
  - A brief report explaining your implementation and any challenges faced.

## Additional Instructions

- Test your contract using Hardhat.
- Ensure your code follows Solidity best practices for security and efficiency.

Good luck, and happy coding! Remember to reach out if you encounter any issues or need further assistance.
