import classes from './EmploymentDetails.module.css'

export const EmploymentDetails = (props) => {
    const {employmentDetails} = props
    const isTrueEmpDet = employmentDetails[0].city || employmentDetails[0].jobTitle || employmentDetails[0].employer || employmentDetails[0].startDate || employmentDetails[0].endDate 
    return <div className={classes.div}>
        {isTrueEmpDet && <h2>Employmnet History</h2>}
        <ol>
          {employmentDetails.map( eachObj => {
             return<li key={eachObj.id}>
              {eachObj.jobTitle && <div className={classes.jobRoleContainer}>
                  {eachObj.jobTitle && <span>{eachObj.jobTitle}</span>}
                  {eachObj.employer && <span>{" At "}{eachObj.employer}</span>}
                  {eachObj.city && <span>{", "}{eachObj.city}</span>}
                </div>}
                <div className={classes.dateContainer}>
                    {eachObj.startDate && <span>{eachObj.startDate}</span>}
                    {eachObj.endDate && <span>{' to '}{eachObj.endDate}</span>}
                </div>
            </li>
            })}
        </ol>
    </div>
}