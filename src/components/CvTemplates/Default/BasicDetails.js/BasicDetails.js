import classes from "./BasicDetails.module.css";
import { SYDNEY, LONDON } from "../../../../utils/constants.js"
export const BasicDetails = (props) => {
  const { basicDetails, layoutStyle } = props;
  const details =
    basicDetails.email ||
    basicDetails.phone ||
    basicDetails.city ||
    basicDetails.state ||
    basicDetails.pin ||
    basicDetails.address ||
    basicDetails.wantedJobTitle ||
    basicDetails.name ;
  let headerClassname = "";
  if (layoutStyle === SYDNEY) {
    headerClassname = classes.sydney;
  }
  if (layoutStyle === LONDON) {
    headerClassname = classes.london;
  }
  return (
    <div>
      {details && 
      <header className={`${classes.div} ${headerClassname}`}>
        <div className={classes.profileNameContainer}>
          {basicDetails.profile && (
            <img src={basicDetails.profile} className={classes.profile} alt='profile' />
          )}
          <div>
            {basicDetails.name && <h2>{basicDetails.name}</h2>}
            {basicDetails.wantedJobTitle && (
              <p>{basicDetails.wantedJobTitle}</p>
            )}
          </div>
        </div>
        {details && (
          <div className={classes.details}>
            <h3>Details</h3>
            {basicDetails.address && <p>{basicDetails.address}</p>}
            {basicDetails.city && (
              <p>
                {basicDetails.city}{" "}
                {basicDetails.state && (
                  <span>
                    {", "}
                    {basicDetails.state}
                  </span>
                )}{" "}
                {basicDetails.pin && (
                  <span>
                    {", "}
                    {basicDetails.pin}
                  </span>
                )}{" "}
              </p>
            )}
            {basicDetails.phone && <p>{basicDetails.phone}</p>}
            {basicDetails.email && <p>{basicDetails.email}</p>}
          </div>
        )}
      </header> }
      {basicDetails.introduction && (
        <div className={classes.introduction}>
          <h3>Profile</h3>
          <p>{basicDetails.introduction}</p>
        </div>
      )}
    </div>
  );
};
