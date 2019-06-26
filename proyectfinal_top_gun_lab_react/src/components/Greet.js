import React from 'react'
/*
function Greet(){
    return <h1> Hello World, welcome to your first page with react ¡Neiver!</h1>
}
export default Greet;
*/

 const Greet=({imgSrc, name}) => {
    return(
        <figure>
            <img src={imgSrc} alt=""/>
            <figcaption>{name}</figcaption>
        </figure>

    );
 }
export default Greet;
