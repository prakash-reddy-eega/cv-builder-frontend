import { DEFAULT, SYDNEY, LONDON } from "../../utils/constants"
import { useSelector } from "react-redux"
import Default from "../../layouts/Default"
import classes from './Preview.module.css'

export const Preview = (props) => {
    const layoutStyle = useSelector( state => state.layoutStyle.layoutStyle)
    return <>
        <div className={classes.div}>
        {layoutStyle === DEFAULT && <Default cvData={props.cvData}/>}
    </div>
    </>
}