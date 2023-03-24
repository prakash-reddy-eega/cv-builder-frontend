import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import classes from './Home.module.css'
import Button from "./Button"
import { Link } from "react-router-dom"

export const Home = () => {
    const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated)
    if(!isAuthenticated){
        return <Navigate to='/login' replace={true}/>
    }
    return(
        <div className={classes.container}>
            <h1>Welcome to Cv Builder</h1>
            <Link to='/templates'><Button className={classes.template}>Use  Templates</Button></Link>
            <Link to='/myCVs'><Button className={classes.create}>Create Resume</Button></Link>
        </div>
    )
}