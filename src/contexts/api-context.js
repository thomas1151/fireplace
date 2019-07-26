import React, { Component } from 'react';
import axios from 'axios';

export const srcs = {
    prod: {
        url: "https://fireplacedms.co.uk/"
    },
    dev: {
        url: "http://localhost:8000/",
        token: "a14ddd527ef7bd5f011f727b92706fbb4cc0ff5b",
        get: axios.create(
            {
            baseURL: "http://localhost:8000/",
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token a14ddd527ef7bd5f011f727b92706fbb4cc0ff5b'
            }
            }
            )
        

    }
};

export const SrcContext = React.createContext(
    srcs.dev // default value
);