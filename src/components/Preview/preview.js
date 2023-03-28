import { DEFAULT, SYDNEY, LONDON } from "../../utils/constants"
import Default from '../CvTemplates/Default'
import classes from './Preview.module.css'

export const Preview = (props) => {
    const layoutStyle = props.layoutStyle
    return <>
        <div className={classes.div}>
        {layoutStyle === DEFAULT && <Default cvData={props.cvData} layoutStyle={layoutStyle}/>}
        {layoutStyle === SYDNEY && <Default cvData={props.cvData}  layoutStyle={layoutStyle}/>}
        {layoutStyle === LONDON && <Default cvData={props.cvData}  layoutStyle={layoutStyle}/>}
    </div>
    </>
}