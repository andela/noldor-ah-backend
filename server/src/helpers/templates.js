/* eslint-disable max-len */
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

const articleTakedown = (user, slug, article) => `<div style="background:#f0f0f0;margin:0 auto;
padding-top:50px;padding-bottom:50px;text-align:center;
width:100%;font-size:12px;font-family:verdana;border-radius:5px;color:#444">
<div>
  <img src=https://pli.io/2ptTUa.png width="70px" height="70px">
</div>

<p style="text-align:center;">
  Hello ${user},
  <br>
</p>

<p style="margin-bottom:25px";>
  Your article <a href="noldor-ah-frontend.herokuapp.com/${slug}">${article}</a>
   has been taken down because it violates our <a href="noldor-ah-frontend.herokuapp.com/bn-policy">Be Nice policy</a>.
</p>

<p style="margin:20px;">
  If you feel this is an error, you can send us an email explaining why you feel that way.
  <br>
  Please include the details of the article such as the title and the URL (copy the link in your address bar) in the
  body of your email. Thank you.
<p>

<a style="background:#e66869;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
  color:white;text-decoration:none;padding:13px 20px;border-radius:25px;
  border:0.5px solid #e66869;" 
    href="mailto:admin@authorshaven.com?Subject=Erroneous%20Article%20Takedown">Email Us
</a>

<p style="margin-top: 20px;">
  You can also edit your article (from your drafts) to comply with our <a href="noldor-ah-frontend.herokuapp.com/bn-policy">Be Nice policy</a> and then publish it again.
</p>
<span style="font-family:sans-serif;font-size:10px">&copy; 2018, Authors Haven</span>
</div>`;

const profileTakedown = user => `<div style="background:#f0f0f0;margin:0 auto;
padding-top:50px;padding-bottom:50px;text-align:center;
width:100%;font-size:12px;font-family:verdana;border-radius:5px;color:#444">
<div>
  <img src=https://pli.io/2ptTUa.png width="70px" height="70px">
</div>

<p style="text-align:center;">
  Hello ${user},
  <br>
</p>

<p style="margin-bottom:25px";>
  Your profile has been temporarily deactivated because you have violated our <a href="noldor-ah-frontend.herokuapp.com/bn-policy">Be Nice policy</a> more than 2 times.
</p>

<p style="margin:20px;">
  If you feel this is an error, you can send us an email explaining why you feel that way.
  <br>

  <p>
    <a style="background:#e66869;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
      color:white;text-decoration:none;padding:13px 20px;border-radius:25px;
      border:0.5px solid #e66869;" 
        href="mailto:admin@authorshaven.com?Subject=Erroneous%20Article%20Takedown">Email Us
    </a>
  </p>
<p>

<span style="font-family:sans-serif;font-size:10px">&copy; 2018, Authors Haven</span>
</div>`;

const profileReactivation = user => `<div style="background:#f0f0f0;margin:0 auto;
padding-top:50px;padding-bottom:50px;text-align:center;
width:100%;font-size:12px;font-family:verdana;border-radius:5px;color:#444">
<div>
  <img src=https://pli.io/2ptTUa.png width="70px" height="70px">
</div>

<p style="text-align:center;">
  Hello ${user},
  <br>
</p>

<p style="margin-bottom:25px";>
  Your profile has been reactivated. You can now <a href="noldor-ah-frontend.herokuapp.com/login">Log in</a> and start interacting with awesome content again.
</p>

<span style="font-family:sans-serif;font-size:10px">&copy; 2018, Authors Haven</span>
</div>`;

export default {
  resetPassword,
  notifyPaswordChange,
  articleTakedown,
  profileTakedown,
  profileReactivation,
  verifyEmailTemplate
};
