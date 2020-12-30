import React from 'react';




const Buuton = props => {



    return (

        <div class="row mb-3 px-3 "> <button type="submit" data-testid="btn-login" class="btn btn-blue text-center" onClick={() => props.onSubmitLogin()}>ورود</button> </div>
    )

}


export default Buuton;

