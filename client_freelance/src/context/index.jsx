import React, {useContext, createContext} from 'react';
import {useAddress, useContract, useMetamask, useContractWrite, useContractRead} from '@thirdweb-dev/react'
import Caver from "caver-js";
const caver = new Caver("https://rpc.ankr.com/klaytn");

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
  const { contract } = useContract("0x3e11813c31E28B16307b2fC7918755AcFD891f8b");
  const address = useAddress();
  const connect = useMetamask();
  const { mutateAsync: createGig } = useContractWrite(contract, "createGig");
  const { mutateAsync: deactivateGig } = useContractWrite(contract, "deactivateGig");
  const { mutateAsync: postReview } = useContractWrite(contract, "postReview");

  const publishGig = async (form) => {
	  try {
		  const data = await createGig({
			  args: [
				  address,
				  form.username,
				  form.title,
				  form.description,
				  form.shortDescription,
				  form.aboutSeller,
				  form.imageURL,
				  form.avatarURL,
				  form.price,
				  form.category,
				  form.deliveryTimeInDays
			  ]
		  });
		  console.log("contract call success", data);
	  } catch (error) {
		  console.log("contract call failure", error);
	  }
  }

  const getGigs = async () => {
	const gigs = await contract.call('getAllGigs');

	const parsedGigs = gigs.map((gig, i) => ({
		seller: gig.seller,
		username: gig.username,
		title: gig.title,
		description: gig.description,
		shortDescription: gig.shortDescription,
		aboutSeller: gig.aboutSeller,
		isActive: gig.isActive,
		imageURL: gig.imageURL,
		avatarURL: gig.avatarURL,
		price: caver.utils.fromPeb(gig.price.toString(), 'KLAY'),
		averageRanking: gig.averageRanking,
		category: gig.category,
		deliveryTimeInDays: gig.deliveryTimeInDays,
		buyers: gig.buyers,
		paidFirstHalf: gig.paidFirstHalf,
		paidSecondHalf: gig.paidSecondHalf,
		reviews: gig.reviews,
		pID: i
	})).filter((gig) => (gig.isActive === true));

	return parsedGigs;
  }

  const getMyGigs = async () => {
	const allGigs = await getGigs();
	const filteredGigs = allGigs.filter((gig)=> gig.seller === address);
	return filteredGigs;
  }

  const deleteGig = async (pID) => {
	try {
		await deactivateGig({args: [pID]});
		console.log("deactivated gig successfully");
	} catch (error) {
		console.log("could not deactivate the gig", error);
	}
  }

  const getMyOrders = async () => {
	const allMyGigs = await getMyGigs();
	const filteredGigs = allMyGigs.filter((gig) => (gig.buyers.length > 0));
	return filteredGigs;
  }

  const getMyPurchases = async () => {
	const allGigs = await getGigs(); //only active gigs though
	const filteredGigs = allGigs.filter((gig) => (gig.buyers.includes(address)));
	return filteredGigs;
  }

  const getGigByID = async (pID) => {
	const allGigs = await getGigs();
	const gig = allGigs.find((gig) => (gig.pID === pID));
	return gig;
  }

  const submitReview = async (review, pID) => {
	try {
		await postReview({args: [pID, review.comment, review.rating]}, review.address);		  
		console.log("review post success");
	} catch (error) {
		console.log("review post failure", error);
	}
  }
  
  const payInitialPrice = async (pID, amount) => {
	try {
		const data = await contract.call('payFirstHalf', [pID], {value: caver.utils.toPeb(amount, "KLAY")});
		console.log("purchase successful");
		return data;
	} catch (error) {
		console.log("purchase unsuccessful", error);
	}
  }

  const paySecondHalf = async (pID, amount) => {
	try {
		const data = await contract.call('paySecondHalf', [pID], {value: caver.utils.toPeb(amount, "KLAY")});
		console.log("purchase successful");
		return data;
	} catch (error) {
		console.log("purchase unsuccessful", error);
	}
  }

	return (
		<StateContext.Provider
		  value={{ 
			address,
			contract,
			connect,
			createGig: publishGig,
			getGigs,
			getMyGigs,
			deleteGig,
			getMyOrders,
			getMyPurchases,
			getGigByID,
			submitReview,
			payInitialPrice,
			paySecondHalf
		  }}
		>
		  {children}
		</StateContext.Provider>
	  )
}

export const useStateContext = () => useContext(StateContext);