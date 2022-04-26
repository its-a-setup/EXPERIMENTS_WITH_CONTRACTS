pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

contract Test {
  address public owner = msg.sender;
  string public message;

  constructor() {
    message = "Hello You!";
  }

  modifier ownerOnly() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function changeName(string memory _message) public ownerOnly returns(string memory) {
    require(bytes(_message).length > 0);
    message = _message;
    return message;
  }
}