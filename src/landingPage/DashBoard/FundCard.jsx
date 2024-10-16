import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie"; 


function FundCard({ funds }) {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const [cookies, removeCookie] = useCookies([]);
  const [status, setStatus] = useState(false);
  const [currUser, setCurrUser] = useState({
    id: ''
  });
  useEffect( () => {
    const verifyCookies = async ()=>{
      const { data } = await axios
      .post(`${backendDomain}/auth`, {}, { withCredentials: true });
      const { status, user } = data;

      if(status){
        setStatus(status);
      setCurrUser({id: user._id});
      }
      if(!status){
        removeCookie("token");
      }
    }
    verifyCookies();
  }, [cookies, removeCookie]);

  
  const domain = "http://localhost:5173";
  let handleShare = (el) => {
    let sharedText = `Hey everyone!

I’m reaching out to share details about an important fundraising campaign for ${el.fundName}. Our goal is to ${el.description}.

You can easily make a donation on fund raising webportal: 
${domain}/fund/${el._id}
Every contribution, no matter the size, helps us make a difference!

Feel free to share this message with anyone who might want to support this cause. Together, we can create a positive impact!

Thank you so much for your support! 🙏

web link: ${domain}/fund/${el._id} ,

Best,
${el.fundraiser} `;

    const encodedurl = encodeURIComponent(sharedText);
    let WhatappUrl = `https://api.whatsapp.com/send?text=${encodedurl}`;
    return(WhatappUrl);
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-start">
        {funds.map((el, idx) => (
          <div className="m-3" key={el._id}>
            <Card sx={{ maxWidth: 345 }}>
              <Link
                to={`/fund/${el._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {el.fundName.length < 20
                        ? el.fundName
                        : el.fundName.slice(0, 20) + "..."}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {el.description.length < 90
                        ? el.description
                        : el.description.slice(0, 90) + "..."}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                {(currUser.id!==el.owner)?<Link
                  className="ms-2 text-decoration-none"
                  to={`/donate/${el._id}`}
                >
                  Donate
                </Link>:<Link
                  className="ms-2 text-decoration-none"
                  to={`/fund/${el._id}`}
                >
                  View
                </Link>}
                <a
                  className="text-decoration-none"
                  href={handleShare(el)}
                >
                  Share
                </a>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default FundCard;
