import { useEffect, useState } from "react";
import FundCard from "./FundCard";
import axios from "axios";

function AllFunds() {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const [allFunds, setAllFunds] = useState([]);
  useEffect(() => {
    axios.get(`${backendDomain}/getFunds`).then((res) => {
        setAllFunds(res.data);
    });
  }, []);
  return (
    <>
      <div className="container-fluid p-5" style={{height: '100%',minHeight: '90vh', backgroundColor: 'lightgray'}} >
        <h2 className="text-center mb-3"id='funds' >Available Funds</h2>
        <FundCard funds={allFunds} />
      </div>
    </>
  );
}

export default AllFunds;
