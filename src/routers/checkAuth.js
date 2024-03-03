

import {storeData,retrieveData,clearStorage } from '../localStorage'



export function createsession( user,pass ){

    const token = user+"|"+pass;
    if(storeData("TOKEN",token)){
            console.log(storeData("TOKEN",token))
            return true
    }

}


export function checkSession(){

    
    if( retrieveData("TOKEN")!==null ){
        // console.log(retrieveData("TOKEN"))
        return true
    }else{
        return false
    }

}

export function clearsession(){
    
    if(clearStorage()){
        // console.log("logout")
        // console.log(clearStorage())
        return true
    }else{
        return false
    }

}