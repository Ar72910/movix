import React from 'react'
import { useSelector } from 'react-redux'
import "./style.scss"



const Genres = ({ data }) => {

    const { genres } = useSelector((state) => state.home);


    return (
        <div className='genres'>{
        data?.map((g) => {
            // if No genres is present then return  
            if (!genres[g]?.name) return;
            return (


                <div className="genre" key={g}>
                    {genres[g]?.name}     {/* optional chaning  */}
                </div>
            )
        })}
    </div>
    )
}

export default Genres