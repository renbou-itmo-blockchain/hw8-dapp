// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

contract Storage {
    mapping(address => bytes) private _storage;

    function put(bytes calldata data) public {
        _storage[msg.sender] = data;
    }

    function get() public view returns (bytes memory) {
        return _storage[msg.sender];
    }
}
