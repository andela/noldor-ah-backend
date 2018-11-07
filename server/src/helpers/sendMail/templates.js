const resetPasswordTemplate = (baseUrl, token) => {
  const html = `
        <div style="background:#fff; margin:0 auto; padding:10px; text-align:center;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2); width:70%; font-sixe:14px;"> 
            <p style="margin-bottom:25px";>You told us you forgot your password. If you really did, click <a href= ${baseUrl}/${token}> here</a> to get a new one</p>

            <div style="border-top:25px; border-bottom:25px;">
                <p> <a style="background:#E66869; color:white;text-decoration:none;text-align:center;padding:10px;"; href="http://${baseUrl}/api/v1/users/forgot/${token}">Choose a new password</a> </p>
            </div>

            <p style="margin-top:25px;">If you didn't mean to change your password, you can just ignore this email; </br>
            Your password will not be changed.</p>
        </div>
        `;
  return html;
};


export default {
  resetPasswordTemplate,
};
