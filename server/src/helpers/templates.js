const resetPassword = (baseUrl, token) => {
  const html = `
  <div style="background:#f0f0f0;margin:0 auto;
      padding-top:50px;padding-bottom:50px;text-align:center;
      width:100%;font-size:12px;font-family:verdana;border-radius:5px;color:#444">
      <div>
          <img src=https://pli.io/2ptTUa.png width="70px" height="70px">
      </div>
      <p style="margin-bottom:25px";>You told us you forgot your password. 
      If you really did, click the button below to reset password.</p>

    <div style="margin: 50px 50px">
      <p><a style="background:#e66869;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
        color:white;text-decoration:none;text-align:center;padding:13px 20px;border-radius:25px;
        border:0.5px solid #e66869;" 
          href="http://${baseUrl}/api/v1/users/forgot/${token}">Reset password
      </a>
  </p>
</div>
<p style="margin-top:50px;">
  If you didn't mean to change your password, you can ignore this email.<br>
  Your password will not be changed.</p><br>
  <span style="font-family:sans-serif;font-size:10px">&copy; 2018, Authors Haven</span>
</div>`;

  return html;
};

const notifyPaswordChange = (homepage) => {
  const html = `
  <div style="background:#f0f0f0;margin:0 auto;
    padding-top:50px;padding-bottom:50px;text-align:center;
    width:100%;font-size:12px;font-family:verdana;border-radius:5px;color:#444">
    <div>
        <img src=https://pli.io/2ptTUa.png width="70px" height="70px">
    </div>
    <p> You have successfully changed your password. </p>
    <div style="margin: 50px 50px">
      <p><a style="background:#e66869;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
          color:white;text-decoration:none;text-align:center;padding:13px 20px;border-radius:25px;
          border:0.5px solid #e66869;" 
            href="http://${homepage}/">Continue to Authors Haven</a></p></br>
    </div><br>
    <span style="font-family:sans-serif;font-size:10px">&copy; 2018, Authors Haven</span>
  </div>`;

  return html;
};

const verifyEmailTemplate = (username, url, hash) => {
  const html = `<div style="background:#f0f0f0;margin:0 auto;
  padding-top:50px;padding-bottom:50px;text-align:center;
  width:100%;font-size:12px;font-family:verdana;border-radius:5px;color:#444">
  <div>
      <img src=https://pli.io/2ptTUa.png width="70px" height="70px">
  </div>
  <h2>Welcome to Authors Haven, ${username}</h2><br>
  <p>Please click the button below to verify your account.<p>

<div style="margin: 50px 50px">
  <p><a style="background:#e66869;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
    color:white;text-decoration:none;text-align:center;padding:13px 20px;border-radius:25px;
    border:0.5px solid #e66869;" 
         href="http://${url}/api/v1/users/verify?id=${hash}">Verify your account
      </a>
  </p>
</div>
<p style="margin-top:50px;">
  If you didn't sign up an account on Authors Haven please ignore this email</p><br>
  <span style="font-family:sans-serif;font-size:10px">&copy; 2018, Authors Haven</span>
</div>`;

  return html;
};


export default {
  resetPassword,
  notifyPaswordChange,
  verifyEmailTemplate
};
