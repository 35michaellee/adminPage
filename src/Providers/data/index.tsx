import graphqlDataProvider ,{ GraphQLClient, liveProvider as graphqlLiveProvider } from "@refinedev/nestjs-query";
import {fetchWrapper} from "./fetch-wrapper";
import {createClient} from 'graphql-ws' //websocket client 
export const API_BASE_URL = 'https://api.crm.refine.dev'
export const API_URL = `${API_BASE_URL}/graphql`//api.crm.refine.dev`
export const WS_URL ='wss://api.crm.refine.dev/graphql'

export const client= new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {
        try{
            return fetchWrapper(url, options);

        }catch (error){
            return Promise.reject(error as Error);
        }
    } })

//create a websocket tolisten for websocket 
//live provider allows an app to update in real time. we will use a websocket clieit using graphql . we will pass to refine to make pages in real time and
//live mode must be turned on for


export const wsClient = typeof window !== "undefined" 
? createClient({
    url:WS_URL,
    connectionParams: ()=>{
        const accessToken = localStorage.getItem("access_token");
      return {
        headers:{
            Authorization: `Bearer ${accessToken}`,
        }
      }
    }
})
: undefined //return undefined if we are not within the browser 

//create a data provider ro make requests to graphQL

export const dataProvider = graphqlDataProvider(client); //comes directly from refine 
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined;