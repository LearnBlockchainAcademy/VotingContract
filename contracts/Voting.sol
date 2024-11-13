// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint voteIndex;
    }

    enum VotingState { NotStarted, Ongoing, Ended }
    VotingState public state;

    mapping(uint => Candidate) public candidates;
    uint[] public candidateIds;
    mapping(address => Voter) public voters;
    uint public nextId;

    event CandidateRegistered(uint id, string name);
    event Voted(uint id, string name);
    event VotingEnded(string winnerName);

    modifier inState(VotingState _state) {
        require(state == _state, "Invalid state");
        _;
    }

    function startVoting() public {
        state = VotingState.Ongoing;
    }

    function registerCandidate(string memory _name) public inState(VotingState.NotStarted) {
        candidates[nextId] = Candidate(nextId, _name, 0);
        candidateIds.push(nextId);
        emit CandidateRegistered(nextId, _name);
        nextId++;
    }

    function vote(uint _id) public inState(VotingState.Ongoing) {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(candidates[_id].id == _id, "Invalid candidate");

        voters[msg.sender] = Voter(true, _id);
        candidates[_id].voteCount++;
        emit Voted(_id, candidates[_id].name);
    }

    function endVoting() public inState(VotingState.Ongoing) {
        state = VotingState.Ended;

        uint winningVoteCount = 0;
        string memory winnerName;

        for (uint i = 0; i < candidateIds.length; i++) {
            if (candidates[candidateIds[i]].voteCount > winningVoteCount) {
                winningVoteCount = candidates[candidateIds[i]].voteCount;
                winnerName = candidates[candidateIds[i]].name;
            }
        }

        emit VotingEnded(winnerName);
    }
}
