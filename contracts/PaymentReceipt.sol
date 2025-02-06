// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentReceipt is ERC721, ERC721URIStorage, Ownable { // Inherit ERC721URIStorage
    constructor(address initialOwner) 
        ERC721("PaymentReceipt", "PAYR") 
        Ownable(initialOwner) 
    {
        _transferOwnership(initialOwner);
    }

    function safeMint(address to, uint256 tokenId, string memory uri) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri); // Now uses ERC721URIStorage's _setTokenURI
    }

    // Override required by Solidity for multiple inheritance
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // Override to fix inheritance
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}