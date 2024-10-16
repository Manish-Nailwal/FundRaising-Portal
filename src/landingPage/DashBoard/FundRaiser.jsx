import Fund from "./Fund";
import {Link} from 'react-router-dom';

function FundRaiser({user_id}) {
    return ( 
        <>
            <div className="container-fluid p-5">
                <div className="row text-center">
                    <h3 className="col-md-6 col-sm-12">All Listed Funds</h3>
                    <Link className="col-md-6 col-sm-12" to='newFundRaise'>Raise New Fund</Link>
                </div>
                <Fund fund_id={4253} />
            </div>
        </>
     );
}

export default FundRaiser;