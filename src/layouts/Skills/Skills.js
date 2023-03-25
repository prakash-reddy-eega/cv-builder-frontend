import classes from './Skills.module.css'
export const Skills = (props) => {
    const {skills} = props

    return <div className={classes.div}>
        {skills.skillsList && <h2>Skills</h2>}
        {skills.skillsList && <p>{skills.skillsList}</p>}
    </div>
} 