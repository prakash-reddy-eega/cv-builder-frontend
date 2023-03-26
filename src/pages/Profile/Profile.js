import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Card from "../../UI/Card"
import { useEffect, useCallback, useState } from "react"
import { getProfile ,uploadProfile, removeProfile } from "../../services/auth"
import BackdropLoader from "../../UI/BackdropLoader"
import { ToastContainer, toast } from "react-toastify"
import { DUMMY_PROFILE } from "../../utils/constants"
import classes from './Profile.module.css'

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [profileData, setProfileData] = useState(null)
    const fetchProfileDetails = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await getProfile()
            setIsLoading(false)
            if (response.data.status === 1) {
                setProfileData(response.data.data[0])
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
        fetchProfileDetails()
    }, [fetchProfileDetails])

    const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated)
    if(!isAuthenticated){
        return <Navigate to='/login' replace={true}/>
    }

    //removing
    const removeImage = async() => {
        try {
            setIsLoading(true)
            const response = await removeProfile({profileImg: null}, profileData._id)
            setIsLoading(false)
            if (response.data.status === 1) {
                fetchProfileDetails()
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
    //getting image
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (event) => {
            setProfileData({...profileData, profileImg: event.target.result})
        };
        reader.readAsDataURL(e.target.files[0]);
        }
    };
    //upload profile
    const onClickSaveProfile = async () => {
        try {
            setIsLoading(true)
            const response = await uploadProfile({profileImg: profileData.profileImg}, profileData._id)
            setIsLoading(false)
            if (response.data.status === 1) {
                fetchProfileDetails()
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

    return (<>
        <ToastContainer/>
        <BackdropLoader show={isLoading}/>
        {profileData && <Card>    
          <div  className={classes.profileContainer}>
            { profileData.profileImg && ( <div className={classes.imageContainer}> <img  src={profileData.profileImg} alt="profile pic" width="110" height="100"/> 
             <span className={classes.imageRemove} onClick={removeImage}>remove</span>
             <button type="button" onClick={onClickSaveProfile}>save</button>
              </div> )}
            {!profileData.profileImg && (<div> <img src={DUMMY_PROFILE} alt="profile pic" width="100" height="100"/> </div>)}
             {!profileData.profileImg && <input type="file" accept="image/*" onChange={handleImageChange} />}
            <h2>{profileData.name}</h2>
            <h4>{profileData.email}</h4>
            <h4>{profileData.contactNumber}</h4>
          </div>
        </Card>}
        </>)
}