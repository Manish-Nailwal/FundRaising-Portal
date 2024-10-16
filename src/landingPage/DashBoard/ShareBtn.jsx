function ShareBtn({el,text,clr}) {
  const domain = import.meta.env.VITE_DOMAIN|| `http://localhost:5173`;
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
    return WhatappUrl;
  };
  return (
    <>
      <a style={{textDecoration: 'none',color: 'white'}}href={handleShare(el)}>
        {text}
      </a>
    </>
  );
}

export default ShareBtn;
