// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./PaymentToken.sol";
import "./PaymentReceipt.sol";

contract PaymentGateway is ReentrancyGuard {
    PaymentToken public paymentToken;
    PaymentReceipt public paymentReceipt;
    address public feeAddress;
    uint256 public feeBasisPoints;

    struct Payment {
        address payer;
        address payee;
        uint256 amount;
        bool isCompleted;
    }

    mapping(bytes32 => Payment) public payments;

    event PaymentCreated(bytes32 indexed paymentId, address payer, address payee, uint256 amount);
    event PaymentCompleted(bytes32 indexed paymentId);

    constructor(address _paymentToken, address _paymentReceipt, address _feeAddress, uint256 _feeBasisPoints) {
        paymentToken = PaymentToken(_paymentToken);
        paymentReceipt = PaymentReceipt(_paymentReceipt);
        feeAddress = _feeAddress;
        feeBasisPoints = _feeBasisPoints;
    }

    function createPayment(address payee, uint256 amount, string memory uri) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        paymentToken.transferFrom(msg.sender, address(this), amount);

        bytes32 paymentId = keccak256(abi.encodePacked(msg.sender, payee, block.timestamp));
        payments[paymentId] = Payment(msg.sender, payee, amount, false);

        uint256 tokenId = uint256(paymentId);
        paymentReceipt.safeMint(msg.sender, tokenId, uri);

        emit PaymentCreated(paymentId, msg.sender, payee, amount);
    }

    function confirmPayment(bytes32 paymentId) external nonReentrant {
        Payment storage payment = payments[paymentId];
        require(msg.sender == payment.payee, "Not authorized");

        uint256 fee = (payment.amount * feeBasisPoints) / 10000;
        paymentToken.transfer(payment.payee, payment.amount - fee);
        paymentToken.transfer(feeAddress, fee);

        payment.isCompleted = true;
        emit PaymentCompleted(paymentId);
    }
}