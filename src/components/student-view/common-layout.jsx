import { Outlet } from "react-router-dom"

function StundentViewCommonLayout (){
    return(
        <div>
            common content
            <Outlet/>
        </div>
    )
}

export default StundentViewCommonLayout;