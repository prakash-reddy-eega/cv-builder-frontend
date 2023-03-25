import classes from './Projects.module.css'
export const Projects = (props) => {
    const {projects} = props
    const isTrue = projects[0].projectName || projects[0].projectDescriptions
    return <div className={classes.div}>
        {isTrue && <h2>Projects</h2>}
        <ul>
          {projects.map( eachObj => {
            return <li key={eachObj.id}>
              <div className={classes.container}>
                {eachObj.projectName && <p><span>Project Name:</span>{' '}{eachObj.projectName}</p>}
                {eachObj.projectDescriptions && <p><span>Description:</span>{' '}{eachObj.projectDescriptions}</p>}
              </div>
            </li>
          })}
        </ul>

    </div>
}