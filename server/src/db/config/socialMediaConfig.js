import dotenv from 'dotenv';

dotenv.config();

const socialMediaConfig = {
  facebook: {
    clientID: process.env.App_ID,
    clientSecret: process.env.App_Secret,
    callbackURL: process.env.App_Callback,
    passWord: process.env.SocialMediaPassword
  },
  google: {
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_Secret,
    clientCallback: process.env.Client_Callback,
    callbackURL: process.env.Client_Callback,
    passWord: process.env.SocialMediaPassword
  }
};

export default socialMediaConfig;
