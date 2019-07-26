import React, { Component } from 'react';

const documentLinks = (url, profile_name) => (
    <React.Fragment>
        <style type="text/css" media="print" href="/styles/css/print.css" />
        <link rel="stylesheet" type="text/css" href="/styles/css/document.css" />
        <link rel="stylesheet" href={url + "config/css/invoice.css"} />
    </React.Fragment>

)
export default documentLinks;
