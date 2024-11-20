import React from 'react'
import loader from '../../assets/anim/loader.gif'
const Loader = () => {
    return (
        <div className={`w-screen h-screen flex items-center justify-center`}>
            <img  src={loader} alt="" />
        </div>
    )
}

export default Loader