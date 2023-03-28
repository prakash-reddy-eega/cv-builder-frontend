import { useState, useEffect, useCallback } from "react"
import Button from "../Home/Button"
import classes from './MyCvs.module.css'
import { Link, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import BackdropLoader from "../../UI/BackdropLoader/BackdropLoader"
import { ToastContainer, toast } from "react-toastify"
import { getCvs } from "../../services/cv"
import { Tooltip } from "@mui/material"
import {RiDeleteBin7Line} from 'react-icons/ri'
import {BiEdit} from 'react-icons/bi'
import {VscPreview} from 'react-icons/vsc'
import { useNavigate } from "react-router-dom"
import { deleteCv } from "../../services/cv"
import {ImDownload3} from 'react-icons/im'
import ConfirmBox from "../../UI/ConfirmBox/ConfirmBox"

export const MyCVs = () => {
    const [myCvs, setCVs] = useState([])
    const [isLoading ,setIsLoading] = useState(false)
    const [showConfirmBox, setShowConfirmBox] = useState(false)
    const [deleteRecordid, setDeleteRecordId] = useState(null)
    const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated) 
    const navigate = useNavigate()

    const fetchCvsList = useCallback( async()=> {
      try {
        setIsLoading(true)
        const response = await getCvs()
        setIsLoading(false)
        if (response.data.status === 1) {
          setCVs(response.data.data)
        } else if (response.data.status === 0) {
          let message = "";
          if (typeof response.data.data === "string") {
            message = response.data.message;
          } else {
             message = response.data.data.errors[0].msg;
          }
             toast.error(message);
      }
    } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data.message)
    }
  },[])

    useEffect( () => {
      fetchCvsList()
    }, [fetchCvsList])

//unauthorized redirect
    if(!isAuthenticated){
      return <Navigate to='/login' replace={true}/>
    }
 //view   
    const toPreviewPage = (data) => {
        return navigate('/view-cv', {state: {cvData: data.cvDetails, layoutStyle: data.template}})
    }
//update
    const toEditCv = (data) => {
        return navigate('/edit-cv', {state: data})
    }
//delete
    const onDeleteRecord = (id) => {
      setShowConfirmBox(true)
      setDeleteRecordId(id)
    }
    const modalHandler = () => {
      setShowConfirmBox(false)
    }

    const deleteFunction = async () => {
      setShowConfirmBox(false)
      try {
        setIsLoading(true)
        const response = await deleteCv(deleteRecordid)
        setIsLoading(false)
        if (response.data.status === 1) {
          toast.success(response.data.message);
          setDeleteRecordId(null)
          fetchCvsList()
        } else if (response.data.status === 0) {
          let message = "";
          if (typeof response.data.data === "string") {
            message = response.data.message;
          } else {
             message = response.data.data.errors[0].msg;
          }
             toast.error(message);
      }
      } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data.message)
      } 
    }
    // go to download preview page 
    const toDownloadPreviewPage = (data) => {
      return navigate('/download-cv', {state: {cvData: data.cvDetails, layoutStyle: data.template}})
    }
    return (
    <>
    <BackdropLoader show={isLoading}/>
    <ToastContainer />
    {showConfirmBox && (
        <ConfirmBox
          open={showConfirmBox}
          deleteFunction={deleteFunction}
          closeDialog = {modalHandler}
        />
      )}
    <div className={classes.div}>
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
        {myCvs.map( (eachItem, i) => (
          <tr key={i}>
            <td>{i+1}</td>
            <td>
              <div className={classes.cvNameContainer} onClick={() => toPreviewPage(eachItem)}>
                <p>{'CV'}{'-'}{i+1}</p> 
                <Tooltip title="view" placement="top" arrow>
                  <div>
                    <VscPreview/>
                  </div>
                </Tooltip>
                </div> 
            </td>
            <td >
              <div className={classes.iconsContainer}>
              <Tooltip title="delete" placement="top" arrow>
                <div onClick={() => onDeleteRecord(eachItem._id)}>
                  <RiDeleteBin7Line/>
                </div>
                </Tooltip>
                <Tooltip title="edit" placement="top" arrow>
                <div onClick = {() => toEditCv(eachItem)}>
                <BiEdit/>
                </div>
                </Tooltip>
                <Tooltip title="download PDF" placement="top" arrow>
                <div onClick={() => toDownloadPreviewPage(eachItem)}>
                <span style={{marginRight: '5px'}}>PDF</span><ImDownload3/>
                </div>
                </Tooltip>
              </div>
            </td>
          </tr>
        ))}
        
      </tbody>
    </table> : <h4>No CVs Created Yet</h4>}
      </div>
    </div>
  </>)
}

