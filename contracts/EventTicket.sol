// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EventTicket {

    // Event to notify when a ticket is purchased
    event TicketPurchased(address indexed buyer, address indexed host, uint256 amount, uint256 pricePaid);

    // Function for users to purchase tickets
    function purchaseTicket(address hostAddress, uint256 expectedPrice) external payable {
        require(msg.value == expectedPrice, "Incorrect VET sent");

        // Transfer the $VET to the specified host's address
        payable(hostAddress).transfer(msg.value);

        emit TicketPurchased(msg.sender, hostAddress, msg.value, expectedPrice);
    }
}
