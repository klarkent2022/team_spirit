// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Web3_Freelance {
	struct Review {
        address buyerID;
        uint256 rating; // 1-5 stars
        string comment;
    }

	struct Gig {
        address seller;
		string username;
        string title;
        string description;
		string shortDescription;
		string aboutSeller;
		string imageURL;
		string avatarURL;
        uint256 price;
        uint256 averageRanking;
		bool isActive;
		string category;
        uint256 deliveryTimeInDays;
        uint256 revisionNumber;
        address[] buyers;
		bool[] paidFirstHalf; //buyerAddress->bool
		bool[] paidSecondHalf; //buyerAddress->bool
		Review[] reviews;
    }

	uint256 public gigCounter = 0;
	mapping(uint256 => Gig) private gigs;

	function createGig(
        address _seller,
		string memory _username,
		string memory _title,
        string memory _description,
        string memory _shortDescription,
		string memory _aboutSeller,
        string memory _imageURL,
		string memory _avatarURL,
        uint256 _price,
        string memory _category,
        uint256 _deliveryTimeInDays
    ) public returns (uint256) {
        Gig storage newGig = gigs[gigCounter];
        
        newGig.seller = _seller;
		newGig.username = _username;
		newGig.title = _title;
        newGig.description = _description;
        newGig.shortDescription = _shortDescription;
		newGig.aboutSeller = _aboutSeller;
        newGig.imageURL = _imageURL;
		newGig.avatarURL = _avatarURL;
        newGig.price = _price;
        newGig.category = _category;
        newGig.deliveryTimeInDays = _deliveryTimeInDays;
        newGig.isActive = true;

		gigCounter++;
		return gigCounter - 1;
	}


	function payFirstHalf(uint256 _gigId) public payable {
		uint256 amount = msg.value;
		Gig storage gig = gigs[_gigId];

		(bool sent,) = payable(gig.seller).call{value: amount}("");
		if(sent) {
			gig.buyers.push(msg.sender);
			gig.paidFirstHalf.push(true);
			gig.paidSecondHalf.push(false);
        }
	}

	function paySecondHalf(uint256 _gigId) public payable {
		uint256 amount = msg.value;
		Gig storage gig = gigs[_gigId];

		(bool sent,) = payable(gig.seller).call{value: amount}("");
		if(sent) {
			gig.buyers.push(msg.sender);
			gig.paidFirstHalf.push(true);
			gig.paidSecondHalf.push(true);
        }
	}

	function updateAverageRanking(uint256 _gigId) private {
		Gig storage gig = gigs[_gigId];
		uint256 totalRating = 0;

		for(uint i = 0; i < gig.reviews.length; i++) {
			totalRating += gig.reviews[i].rating;
        }

		gig.averageRanking = totalRating / gig.reviews.length;
	}
	
	function paidFirstHalfByBuyerAddr(uint256 _gigId, address _buyerAddress) public view returns (bool) {
		Gig storage gig = gigs[_gigId];
		for(uint i = 0; i < gig.paidFirstHalf.length; i++) {
			if (gig.paidFirstHalf[i]==true && gig.buyers[i]==_buyerAddress) {
				return true;
			}
        }
		return false;
	}

	function paidSecondHalfByBuyerAddr(uint256 _gigId, address _buyerAddress) public view returns (bool) {
		Gig storage gig = gigs[_gigId];
		for(uint i = 0; i < gig.paidSecondHalf.length; i++) {
			if (gig.paidSecondHalf[i]==true && gig.buyers[i]==_buyerAddress) {
				return true;
			}
        }
		return false;
	}

	function postReview(uint256 _gigId, string memory _comment, uint256 _rating) public {
		Gig storage gig = gigs[_gigId];
		require((gig.seller != msg.sender), "owner cannot leave a review to his/her own gig");
		Review memory newReview = Review(msg.sender, _rating, _comment);
		gig.reviews.push(newReview);
		updateAverageRanking(_gigId);
	}

	function getAllGigs() public view returns (Gig[] memory) {
        Gig[] memory allGigs = new Gig[](gigCounter);

        for(uint i = 0; i < gigCounter; i++) {
            Gig storage item = gigs[i];
            allGigs[i] = item;
        }
        return allGigs;
    }

	function getActiveGigs() public view returns (Gig[] memory) {
    	uint256 activeGigCount = 0;

		// Count the number of active gigs
		for (uint i = 0; i < gigCounter; i++) {
			if (gigs[i].isActive) {
				activeGigCount++;
			}
		}

		// Create a new array to store active gigs
		Gig[] memory activeGigs = new Gig[](activeGigCount);
		uint256 currentIndex = 0;

		// Add active gigs to the array
		for (uint i = 0; i < gigCounter; i++) {
			if (gigs[i].isActive) {
				activeGigs[currentIndex] = gigs[i];
				currentIndex++;
			}
		}

		return activeGigs;
	}

	function getMyActiveGigs(address _seller) public view returns (Gig[] memory) {
    	uint256 activeGigCount = 0;

		// Count the number of active gigs for the specific seller
		for (uint i = 0; i < gigCounter; i++) {
			if (gigs[i].isActive && gigs[i].seller == _seller) {
				activeGigCount++;
			}
		}

		// Create a new array to store active gigs for the specific seller
		Gig[] memory activeGigs = new Gig[](activeGigCount);
		uint256 currentIndex = 0;

		// Add active gigs for the specific seller to the array
		for (uint i = 0; i < gigCounter; i++) {
			if (gigs[i].isActive && gigs[i].seller == _seller) {
				activeGigs[currentIndex] = gigs[i];
				currentIndex++;
			}
		}

		return activeGigs;
	}

	function getBoughtGigsByBuyer(address _buyer) public view returns (Gig[] memory) {
		uint256 boughtGigCount = 0;

		// Count the number of bought gigs by the specific buyer
		for (uint256 i = 0; i < gigCounter; i++) {
			if (paidFirstHalfByBuyerAddr(i, _buyer)) {
				boughtGigCount++;
			}
		}

		// Create a new array to store bought gigs by the specific buyer
		Gig[] memory boughtGigs = new Gig[](boughtGigCount);
		uint256 currentIndex = 0;

		// Add bought gigs by the specific buyer to the array
		for (uint256 i = 0; i < gigCounter; i++) {
			if (paidFirstHalfByBuyerAddr(i, _buyer)) {
				boughtGigs[currentIndex] = gigs[i];
				currentIndex++;
			}
		}

		return boughtGigs;
	}

	function deactivateGig(uint256 _gigId) public {
		Gig storage gig = gigs[_gigId];
		require(gig.seller == msg.sender, "Only seller can deactivate the gig");
		gig.isActive = false;
	}

	function getAllReviews(uint256 _gigId) public view returns (Review[] memory){
		return gigs[_gigId].reviews;
	}
}