import { BaseUrls } from './serviceparams';
import { NetworkErrorMessages } from '../common/Messages';
import { AppSettings } from '../common/AppSettings';


// ==========================================================================
// Base

// Basic method to post and receive json response.
// returns a POST promise 
// async/await is not used, as it is not supported in all browsers (including IE all versions)
export const httpPost = function (url, data) {
    console.log("fetchcall", data);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : JSON.stringify({})
    })
        .then(checkStatus)
        .then(parseJSON)
}

export const httpGet = function (url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkStatus)
        .then(parseJSON)
}

export const httpPut = function (url, data) {
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : JSON.stringify({})
    })
        .then(checkStatus)
        .then(parseJSON)
}

export const httpDelete = function (url) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkStatus)
        .then(parseJSON)
}

// checks for Http Status 
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(NetworkErrorMessages.ServiceUnavailable);
        throw error
    }
}

// parse response and convert to json object
function parseJSON(response) {
    return response.json()
}

// ==========================================================================
// Common request for all features

export const placePostRequest = function (extension, reqobj, successCallback, errorCallback) {
    
    httpPost(BaseUrls[AppSettings.appEnvironment] + extension, reqobj).then(function (respobj) {
        if (successCallback)
            successCallback(respobj);

    }).catch(function (error) {
        if (errorCallback)
            errorCallback(error);
    });
}


export const placeGetRequest = function (extension, successCallback, errorCallback) {
    httpGet(BaseUrls[AppSettings.appEnvironment] + extension).then(function (respobj) {
        console.log("Callback")
        if (successCallback){
            
            successCallback(respobj);
        }
            

    }).catch(function (error) {
        if (errorCallback)
            errorCallback(error);
    });
}


export const placeDeleteRequest = function (extension, successCallback, errorCallback) {
    
    httpDelete(BaseUrls[AppSettings.appEnvironment] + extension).then(function (respobj) {
        if (successCallback)
            successCallback(respobj);

    }).catch(function (error) {
        if (errorCallback)
            errorCallback(error);
    });
}

export const placePutRequest = function (extension, reqobj, successCallback, errorCallback) {
    
    httpPut(BaseUrls[AppSettings.appEnvironment] + extension, reqobj).then(function (respobj) {
        if (successCallback)
            successCallback(respobj);

    }).catch(function (error) {
        if (errorCallback)
            errorCallback(error);
    });
}


// ==========================================================================