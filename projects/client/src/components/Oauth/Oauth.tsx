import React from "react";
import oauth1 from "../../assets/oauth/apple.png";
import oauth2 from "../../assets/oauth/facebook.png";
import oauth3 from "../../assets/oauth/google.png";
import classes from "./oauth.module.css";

const Oauth = (): React.ReactElement => {
	return (
		<div className={classes.oauth}>
			<img alt="oauth1" src={oauth1} />
			<img alt="oauth2" src={oauth2} />
			<img alt="oauth3" src={oauth3} />
		</div>
	);
};

export default Oauth;
