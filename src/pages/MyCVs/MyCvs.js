import { useState } from "react"
import Button from "../Home/Button"
import classes from './MyCvs.module.css'
import { Link } from "react-router-dom"

export const MyCVs = () => {
    const [myCvs, setCVs] = useState([])
    return (<div className={classes.div}>
      <div className={classes.container}>
        <h2 >My CVs</h2>
        <Link to='/create'><Button className={classes.create}>Create CV</Button></Link>
      </div>
      <div>
      {myCvs.length > 0 ? <table className={classes.table}>
      <thead>
        <tr>
          <th>Sr No</th>
          <th>CVs</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Column 1</td>
          <td>Row 1, Column 2</td>
          <td>Row 1, Column 3</td>
        </tr>
        <tr>
          <td>Row 2, Column 1</td>
          <td>Row 2, Column 2</td>
          <td>Row 2, Column 3</td>
        </tr>
      </tbody>
    </table> : <h4>No CVs Created Yet</h4>}
      </div>
    </div>)
}