// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC1155, Ownable {
    using Strings for uint256;

    string public constant name = "Basevatar Test";
    string public constant symbol = "BSV";

    // Contract level metadata URI
    string private _contractURI;

    // Contract creation time
    uint256 public immutable creationTime;

    // Minting fee - 0.001 ETH
    uint256 public constant MINT_FEE = 0.001 ether;

    // Fee receiver address
    address public feeReceiver;

    // Mapping from day ID to base URI for that day's metadata
    // Example: dayBaseURIs[1] = "https://api.example.com/metadata/1/"
    mapping(uint256 => string) public dayBaseURIs;

    // Mapping to track token quantities per day
    mapping(uint256 => uint256) public tokenQuantities;

    // Event to announce when a new day's base URI is set
    event DayBaseURISet(uint256 indexed dayId, string baseURI);

    constructor(address _feeReceiver, address initialOwner) ERC1155("BasevatarTest") Ownable(initialOwner) {
        creationTime = block.timestamp;
        feeReceiver = _feeReceiver;
    }

    function _getCurrentDayId() internal view returns (uint256) {
        uint256 deploymentDay = creationTime / 1 days;
        uint256 currentDay = block.timestamp / 1 days;
        return currentDay - deploymentDay + 1;
    }

    function mint(address recipient) public payable returns (uint256) {
        uint256 currentDayId = _getCurrentDayId();

        // Check if minting is enabled for the current day by the owner
        require(
            bytes(dayBaseURIs[currentDayId]).length > 0,
            "Minting for today is not enabled or day has not been configured"
        );

        // Check if the minting fee has been paid
        require(msg.value >= MINT_FEE, "Insufficient payment: 0.001 ETH required");

        // Increment the quantity for this day's token
        tokenQuantities[currentDayId] += 1;

        // Mint the token (currentDayId is the token ID, quantity is 1)
        _mint(recipient, currentDayId, 1, "");

        // Send the fee to the feeReceiver
        (bool success, ) = feeReceiver.call{value: MINT_FEE}("");
        require(success, "Fee transfer failed");

        // Refund excess payment
        uint256 excess = msg.value - MINT_FEE;
        if (excess > 0) {
            (bool refundSuccess, ) = msg.sender.call{value: excess}("");
            require(refundSuccess, "Refund failed");
        }

        return currentDayId;
    }

    function setBaseURIForDay(uint256 dayId, string memory newBaseURI) public onlyOwner {
        require(dayId > 0, "Day ID must be greater than 0");
        dayBaseURIs[dayId] = newBaseURI;
        emit DayBaseURISet(dayId, newBaseURI);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(tokenId > 0, "Token ID must be greater than 0");

        string memory baseURI = dayBaseURIs[tokenId];
        require(bytes(baseURI).length > 0, "Base URI for this token ID is not set");

        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    // This function allows the contract owner to change the fee receiver address
    function setFeeReceiver(address _newFeeReceiver) public onlyOwner {
        feeReceiver = _newFeeReceiver;
    }

    // Function to get the minting deadline
    function mintDeadline() public view returns (uint256) {
        uint256 currentDayId = _getCurrentDayId();
        if (currentDayId == 0) return creationTime; // Before first day
        return creationTime + (currentDayId * 1 days);
    }

    // Function to check if minting is still active
    function isMintingActive() public view returns (bool) {
        uint256 currentDayId = _getCurrentDayId();
        if (currentDayId == 0) return false;
        return bytes(dayBaseURIs[currentDayId]).length > 0;
    }

    // Function to get the total quantity of a specific day's tokens
    function getDayTokenQuantity(uint256 dayId) public view returns (uint256) {
        return tokenQuantities[dayId];
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function setContractURI(string memory newContractURI) public onlyOwner {
        _contractURI = newContractURI;
    }
}
