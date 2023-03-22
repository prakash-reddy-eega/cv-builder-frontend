import {Outlet} from 'react-router-dom'
import MainHeader from '../../components/Header/MainHeader'

export const RootLayout = () => {
    return (
        <>
            <MainHeader/>
            <Outlet/>
        </>
    )
}