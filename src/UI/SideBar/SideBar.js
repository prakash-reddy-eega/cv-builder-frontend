
import classes from "./SideBar.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { layoutStyleActions } from "../../store/LayoutStyle";
import { TEMPLATES } from "../../utils/constants";

const SideBar = (props) => {
    const dispatch = useDispatch()
    const layoutStyle = useSelector( state => state.layoutStyle.layoutStyle)
    const isOpen = useSelector( state => state.layoutStyle.isOpen)
    const onChangeTemplate = (id) => {
        dispatch(layoutStyleActions.onStyleChange(id))
        dispatch(layoutStyleActions.close())
        if(props.onChangeTemplate){
          props.onChangeTemplate(id)
        }
    }
  return (
    <>
      <div className={`${classes.sidebar} ${isOpen? classes.open: ''}`}>
        <h3>Templates</h3>
        <ul>    
          {TEMPLATES.map( each => {
            const isActive = layoutStyle === each.label
            return <li key={each.id}><button className={isActive? classes.activeButton: ''} type="button" onClick={()=> onChangeTemplate(each.id)}>{each.label}</button></li>
          })}
        </ul>
      </div>
    </>
  );
};

export default SideBar;