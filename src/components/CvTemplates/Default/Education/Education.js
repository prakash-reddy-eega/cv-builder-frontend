import classes from './Education.module.css'
export const Education = (props) => {
    const {education} = props
    const isTrueEducation = education[0].city || education[0].college || education[0].degree || education[0].startDate || education[0].endDate 
    return <div className={classes.div}>
        {isTrueEducation && <h2>Education</h2>}
        <ol>
          {education.map( eachObj => {
             return <li key={eachObj.id}>
              {isTrueEducation && <div className={classes.jobRoleContainer}>
                  {eachObj.degree && <span>{eachObj.degree}</span>}
                  {eachObj.college && <span>{" At "}{eachObj.college}</span>}
                  {eachObj.city && <span>{", "}{eachObj.city}</span>}
                </div>}
                <div className={classes.dateContainer}>
                    {eachObj.startDate && <span>{eachObj.startDate}</span>}
                    {eachObj.endDate && <span>{' to '}{eachObj.endDate}</span>}
                </div>
                <div className={classes.dateContainer}>
                    {eachObj.description && <p><span>Description:{' '}</span>{eachObj.description}</p>}
                </div>
            </li>
            })}
        </ol>
    </div>
}