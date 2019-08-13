import React, { Component } from 'react';

const documentLinks = (url, profile_name) => (
    <React.Fragment>
        {/* <link rel="stylesheet" type="text/css" href="/styles/css/print.css" /> */}
        <link rel="stylesheet" type="text/css" href="/styles/css/document.css" />
        <link rel="stylesheet" href={url + "config/css/invoice.css"} />
    </React.Fragment>

)
export default documentLinks;
