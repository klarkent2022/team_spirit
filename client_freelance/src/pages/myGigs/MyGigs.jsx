import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";

import Loader from '../../components/loader/Loader';
import { useStateContext } from '../../context'

function MyGigs() {
  const [isLoading, setIsLoading] = useState(false);
  const [myGigs, setMyGigs] = useState([]);
	const {address, contract, getMyGigs, deleteGig} = useStateContext();

	const fetchMyGigs = async () => {
		setIsLoading(true);
		const data = await getMyGigs();
		setMyGigs(data);
		setIsLoading(false);
	}
	useEffect(() => {
		if (contract) fetchMyGigs();
	}, [address, contract])

  const handleDelete = async (pID) => {
    setIsLoading(true);
    await deleteGig(pID);
    fetchMyGigs();
    setIsLoading(false);
  }

  return (
    <div className="list">
      <div className="container">
        <div className="header">
          <h1>My Gigs</h1>
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
        </div>
        {!isLoading ? <table>
          <tr>
            <th>Cover Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {myGigs.map((gig)=>(
              <tr>
                <td>
                  <Link to={"/gig/" + `${gig.pID}`}>
                  <img
                    className="imageD"
                    src={gig.imageURL}
                    alt=""
                  />
                  </Link>
                </td>
                <Link to={"/gig/" + `${gig.pID}`} style={{textDecoration: 'none', color: 'black'}}>
                  <td>{gig.title}</td>
                </Link>
                <td>{gig.price} KLAY</td>
                <td>{(gig.buyers).length}</td>
                <td>
                  <button onClick={() => handleDelete(gig.pID)}>
                    <img className="delete" src="./img/delete.svg" alt="" />
                  </button>
                </td>
              </tr>
          ))}
        </table> : (<div className="loader-container">
        <Loader />
        </div>)
      }
      </div>
    </div>
  );
}

export default MyGigs;
