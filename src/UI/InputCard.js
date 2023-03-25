import {MdExpandCircleDown, MdOutlineExpandLess, MdOutlineDelete} from 'react-icons/md'
import classes from './InputCard.module.css'   

export const InputCard = (props) => {
    const onClickToggleOpen = (id) => {
        props.toggle(id)
    }
    const showIcon = () => {
        if(props.isOpen){
            return <MdOutlineExpandLess className={classes.icon} onClick={() => onClickToggleOpen(props.details.id)} />
        }
        return <MdExpandCircleDown className={classes.icon} onClick={() => onClickToggleOpen(props.details.id)} />
    }
                                
    return <div className={classes.inputCardContainer}>
        <div className={classes.inputCardHeader} >
                <p onClick={() => onClickToggleOpen(props.details.id)}>{props.label}</p>
            <div className={classes.iconContainer}>
                {showIcon()}
                {props.recordsCount > 1 && <MdOutlineDelete className={classes.icon} onClick={()=> props.deleteRecord(props.details.id)}/> }
            </div>  
        </div>
        <div>{props.children}</div>
    </div>
} 