// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FIREToken is ERC20 {
    
    event Tally(uint256 day, address winner);
    
    mapping(address => mapping(uint256 => uint256)) public votes;
    
    bool public opening;
    address public owner;
    uint public rewardAmount;
    uint public postRewardAmount;
    uint256 public day = 0;
    address public winner;
    uint256 public winnerVoteAmount;
    bool public winnerGetReward = false;

    modifier isOpening {
        require(opening, "Voting period is not open");
        _;
    }
    modifier onlyOwner {
        require(msg.sender == owner, "onlyOwner");
        _;
    }

    constructor(uint256 _initialSupply, uint256 _rewardAmount, uint256 _postRewardAmount) ERC20("Fire", "FIRE") {
        _mint(address(this), _initialSupply);
        owner = msg.sender;
        rewardAmount = _rewardAmount;
        postRewardAmount = _postRewardAmount;
    }

    function vote(address _to, uint256 _amount) public isOpening returns(bool) {
        uint256 _amountSquare = _amount**2;
        require(balanceOf(msg.sender) >= _amountSquare, "Insufficient balance");
        require(msg.sender != _to, "cannot vote for yourself");
        _transfer(msg.sender, address(this), _amountSquare);
        votes[_to][day] += _amount;
        if(votes[_to][day] > winnerVoteAmount){
            winnerVoteAmount = votes[_to][day];
            winner = _to;
        }
        return true;
    }

    function getVote(address _addr, uint256 _day) public view returns(uint256) {
        return votes[_addr][_day];
    }

    function claimReward() public returns(bool) {
        require(msg.sender == winner, "msg.sender is not winner");
        require(!winnerGetReward, "winner had already get award");
        winnerGetReward = true;
        _transfer(address(this), msg.sender, rewardAmount);
        return true;
    }

    function tally() public isOpening onlyOwner {
        emit Tally(day, winner);
        opening = false;
    }

    function open() public onlyOwner {
        day += 1;
        winner = address(0);
        winnerVoteAmount = 0;
        opening = true;
    }

    function givePostReward(address _addr) public onlyOwner {
        _transfer(address(this), _addr, postRewardAmount);
    }

    function getBalance(address _addr) public view returns(uint256) {
        return balanceOf(_addr);
    }
}
