import { useSelector } from "react-redux"
import { Preview } from "../Preview/preview"
import { useLocation, Navigate } from "react-router-dom"

export const ViewCv = () => {
    const location = useLocation()
    const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated)
    if(!isAuthenticated){
        return <Navigate to='/login' replace={true}/>
    }
    const localCvData = location.state.cvData
    const layoutStyle = location.state.layoutStyle
    return <div>
        {localCvData && <Preview cvData={localCvData} layoutStyle={layoutStyle}/>}
    </div>
}
