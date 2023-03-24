import {MdExpandCircleDown, MdOutlineExpandLess} from 'react-icons/md'
import classes from './InputCard.module.css'   

export const InputCard = (props) => {
    const onClickToggleOpen = () => {
        props.toggle()
    }
    const showIcon = () => {
        if(props.isOpen){
            return <MdOutlineExpandLess className={classes.icon} />
        }
        return <MdExpandCircleDown className={classes.icon} />
    }
                                
    return <div className={classes.inputCardContainer}>
        <div className={classes.inputCardHeader} onClick={onClickToggleOpen}>
            <p>{props.label}</p>  
            {showIcon()}
        </div>
        <div>{props.children}</div>
    </div>
} 