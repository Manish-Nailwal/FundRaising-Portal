import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
function TransactionHistory() {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [status, setStatus] = useState(false);
  const [currUser, setCurrUser] = useState({
    role: "",
    id: ''
  });
  const token = localStorage.getItem('token');
  useEffect(() => {
    const verifyCookie = async () => {
      if (!token) {
        setStatus(false);
      }
      const { data } = await axios.post(
        `${backendDomain}/auth`,
        {token},
        { withCredentials: true }
      );
      const { status, user } = data;
      return status
        ? setCurrUser({ role: user.role,id: user._id })
        : (localStorage.removeItem("token"), navigate("/login"));
    };
    verifyCookie();
    axios.get(`${backendDomain}/donate/transactions/${id}`).then((res) => {
      setData(res.data);
    });
  }, [navigate]);
  return (
    <>
      <div className="container-fluid p-5">
        <h4 className="text-center text-muted">Payments</h4>
        <div className="table-container px-5 ">
          <table className="table text-start mb-5">
            <thead>
              <tr style={{ border: "1px solid #d9dbde" }}>
                <th scope="col" className="text-muted fw-medium pricing-th">
                  ID
                </th>
                <th scope="col" className="text-muted fw-medium pricing-th">
                  Reciever
                </th>
                <th scope="col" className="text-muted fw-medium pricing-th">
                  Amount
                </th>
                <th scope="col" className="text-muted fw-medium pricing-th">
                  Transaction Id
                </th>
                <th scope="col" className="text-muted fw-medium pricing-th">
                  Date
                </th>
              </tr>
            </thead>
            <tbody
              style={{ border: "1px solid #d9dbde", borderTop: "none" }}
              className="text-start"
            >
              {data.map((trx, idx) => (
                <tr key={idx}>
                  {id !== trx.fundowner ? (
                    <>
                      <td className="pricing-td">{idx}</td>
                      <td className="pricing-td">{trx.receiver.fundName}</td>
                      <td className="pricing-td">{trx.amount}</td>
                      <td className="pricing-td">{trx._id}</td>
                      <td className="pricing-td">{trx.createdAt}</td>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currUser.role === "Donator" ? (
          <></>
        ) : (
          <>
            <h4 className="text-center text-muted mt-5">Received Payments</h4>

            <div className="table-container px-5">
              <table className="table text-start">
                <thead>
                  <tr style={{ border: "1px solid #d9dbde" }}>
                    <th scope="col" className="text-muted fw-medium pricing-th">
                      ID
                    </th>
                    <th scope="col" className="text-muted fw-medium pricing-th">
                      Sender
                    </th>
                    <th scope="col" className="text-muted fw-medium pricing-th">
                      Fund Name
                    </th>
                    <th scope="col" className="text-muted fw-medium pricing-th">
                      Amount
                    </th>
                    <th scope="col" className="text-muted fw-medium pricing-th">
                      Transaction Id
                    </th>
                    <th scope="col" className="text-muted fw-medium pricing-th">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody
                  style={{ border: "1px solid #d9dbde", borderTop: "none" }}
                  className="text-start"
                >
                  {data.map((trx, idx) => (
                    <tr key={idx}>
                      {id === trx.fundowner ? (
                        <>
                          <td className="pricing-td">{idx}</td>
                          <td className="pricing-td">{trx.sender.name}</td>
                          <td className="pricing-td">
                            {trx.receiver.fundName}
                          </td>
                          <td className="pricing-td">{trx.amount}</td>
                          <td className="pricing-td">{trx._id}</td>
                          <td className="pricing-td">{trx.createdAt}</td>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TransactionHistory;
