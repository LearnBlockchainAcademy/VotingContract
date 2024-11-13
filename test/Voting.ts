import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Voting", function () {
  let Voting: any;
  let voting: any;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1, addr2] = await ethers.getSigners();
    voting = await Voting.deploy();
    await voting.deployed();
  });

  it("Should start voting", async function () {
    await voting.startVoting();
    const state = await voting.state();
    expect(state).to.equal(1); // VotingState.Ongoing
  });

  it("Should register a candidate", async function () {
    await voting.registerCandidate("Candidate 1");
    const candidate = await voting.candidates(0);
    expect(candidate.name).to.equal("Candidate 1");
  });

  it("Should not register a candidate when voting is ongoing", async function () {
    await voting.startVoting();
    await expect(voting.registerCandidate("Candidate 1")).to.be.revertedWith("Invalid state");
  });

  it("Should allow voting", async function () {
    await voting.registerCandidate("Candidate 1");
    await voting.startVoting();
    await voting.connect(addr1).vote(0);
    const candidate = await voting.candidates(0);
    expect(candidate.voteCount).to.equal(1);
  });

  it("Should not allow double voting", async function () {
    await voting.registerCandidate("Candidate 1");
    await voting.startVoting();
    await voting.connect(addr1).vote(0);
    await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("Already voted");
  });

  it("Should end voting and announce the winner", async function () {
    await voting.registerCandidate("Candidate 1");
    await voting.registerCandidate("Candidate 2");
    await voting.startVoting();
    await voting.connect(addr1).vote(0);
    await voting.connect(addr2).vote(0);
    await voting.endVoting();
    const state = await voting.state();
    expect(state).to.equal(2); // VotingState.Ended
  });
});
