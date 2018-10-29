import React, { Component } from 'react';

export const srcs = {
    prod: {
        url: "https://fireplacedms.co.uk/"
    },
    dev: {
        url: "http://localhost:8000/"
    },
};

export const SrcContext = React.createContext(
    srcs.dev // default value
);