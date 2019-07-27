import React from 'react';

function NotFound(detail){

    return(
        <div className="document fireplaceDoc">
            <div className="header">
                <div className="header-content-wrapper">
                    <div class="address-wrapper">
                        <h2><strong>{detail}</strong> Not Found.</h2>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default NotFound;