
import {GraphQLFormattedError} from "graphql"

type Error ={
    message : string,
    statusCode : string
}



const customFetch = async (url: string,options :RequestInit) => {
    const accessToken =localStorage.getItem('access_token');
    const headers = options.headers as Record <string ,string>;
    return await fetch(url,{...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization ||`Bearer ${accessToken}` , //getting autho from the header 
            "Content-Type":"application/json", //setting content type to json 
            "Apollo-Require-Preflight":"true", ///cors issue avoidance Apollo is a grapch ql cliet to make requests to the graph api
        }
    })
} //imporves code reuabllity by defining spacifics one ever header in this case autho heasders


//<--comprenhesive error handling soultion 
 const getGraphQLErrors =(body:Record <"errors",GraphQLFormattedError[] |undefined>):
Error | null  =>{
    if(!body){
        return {
            message:"Unknown_error",
            statusCode: "INTERNAL_SERVER_ERROR"
        }

    }
    if("errors"in body){
        const errors =body?.errors;
        const messages =errors?.map((error)=>error?.message)?.join("");
        const code =errors?.[0].extensions?.code;
        return {
            message:messages || JSON.stringify(errors),
            statusCode:code||500
        }
    }
    return null;
 }


export const fetchWrapper = async (url : string ,options: RequestInit) =>{
    const response = await customFetch(url,options);
    const responseClone = response.clone();
    const body =await responseClone.json();
    const error = getGraphQLErrors(body);
    if(error){
        throw error;
    }
    return response;
 }

///we hae ceaated our own custom fetch middleware function- before every gfetch we make and we have upgraded with custom error fucntion that we can exprt 