import React, { useRef, useState, useEffect } from "react";
import "./Gigs.scss";
import Loader from '../../components/loader/Loader';
import SingleGig from "../../components/singleGig/SingleGig";
import { useStateContext } from '../../context'
import { useParams } from 'react-router-dom';

function Gigs() {
  const [isLoading, setIsLoading] = useState(false);
  const [gigs, setGigs] = useState([]);
	const { address, contract, getGigs } = useStateContext();
  const [allGigs, setAllGigs] = useState([]);
  const { category } = useParams();

	const fetchGigs = async () => {
		setIsLoading(true);
		const data = await getGigs();
    if (category) setAllGigs(data.filter((gig) => (gig.category === category)))
    else setAllGigs(data);
    if (category) setGigs(data.filter((gig) => (gig.category === category)))
    else setGigs(data);
		setIsLoading(false);
	}
	useEffect(() => {
		if (contract) fetchGigs();
	}, [address, contract, category])

  ///////////////////Sorting by min & max prices/////////////////
  const minRef = useRef();
  const maxRef = useRef();
  const sortByMinMaxPrices = () => {
    console.log(minRef.current.value, maxRef.current.value);
    setIsLoading(true);
    setGigs(allGigs.filter((gig) => (parseFloat(gig.price) >= parseFloat(minRef.current.value) && parseFloat(gig.price) <= parseFloat(maxRef.current.value))));
    setIsLoading(false);
  }
  const resetMinMaxSorting = () => {
    setIsLoading(true);
    setGigs(allGigs);
    setIsLoading(false);
  }
  ////////////////////////////////////////////////////////////////

  return (
    <div className="allgigs">
      <div className="container">
        <h1>All Gigs</h1>

        <div className="minmax">
          <span>Between</span>
          <input ref={minRef} type="number" placeholder="min price" />
          <span> - </span>
          <input ref={maxRef} type="number" placeholder="max price" />
          <button onClick={sortByMinMaxPrices}>Filter</button>
          <button onClick={resetMinMaxSorting}>Reset</button>
        </div>

        {!isLoading ? <div className="gigcards">
          {gigs.map((gig) => (
            <SingleGig key={gig.pID} item={gig}/>
          ))}
        </div> : (<div className="loader">
          <Loader />
        </div>)}

      </div>
    </div>
  );
}

export default Gigs;
