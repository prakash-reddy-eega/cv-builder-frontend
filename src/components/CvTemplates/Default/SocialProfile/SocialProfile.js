import classes from './SocialProfile.module.css'
export const SocialProfile = (props) => {
    const {socialProfile} = props
    const isTrue = socialProfile[0].label || socialProfile[0].link
    return <div className={classes.div}>
        {isTrue && <h2>Social Profiles</h2>}
        <ul>
          {socialProfile.map( eachObj => {
            return <li key={eachObj.id}>
              <div className={classes.container}>
                {eachObj.label && eachObj.link && <span><a href={eachObj.link} target='_blank' >{eachObj.label}</a> </span>}
              </div>
            </li>
          })}
        </ul>

    </div>
}