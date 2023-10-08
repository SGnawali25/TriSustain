// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract IPFSFileUpload {
    // Mapping from user's address to IPFS hash
    mapping(address => string) public photos;

    // Event to notify clients
    event PhotoAdded(address indexed user, string ipfsHash);

    function addPhoto(string memory ipfsHash) public {
        photos[msg.sender] = ipfsHash;
        emit PhotoAdded(msg.sender, ipfsHash);
    }

    function getPhoto(address user) public view returns (string memory) {
        return photos[user];
    }
}
