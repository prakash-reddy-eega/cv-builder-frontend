import classes from './BasicDetails.module.css'
export const BasicDetails = (props) => {
    const {basicDetails} = props
    return (<div className={classes.profileNameContainer}>
        <img src={basicDetails.profile} className={classes.profile} />
        <div>
          {basicDetails.name && <h3>{basicDetails.name}</h3>}
          {basicDetails.wantedJobTitle && (
            <p>{basicDetails.wantedJobTitle}</p>
          )}
        </div>
      </div>)
}