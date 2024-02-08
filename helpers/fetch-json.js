/**
 * An asynchronous helper function that wraps the standard node.js fetch API.
 * This function calls an API url passed as the first and mandatory parameter,
 * there is an optional payload parameter to send a json object, e.g. a filter.
 * It then calls the API and returns the response body parsed  as a json object.
 * @example <caption>fetchJson as returning function using the await keyword</caption>
 * const data = await fetchJson('https://api-url.com/endpoint/')
 * @example <caption>fetchJson as oneliner using the then() structure.</caption>
 * fetchJson('https://api-url.com/endpoint/').then((data)=>{
 *  // use data...
 * )
 *
 * @param {string} url the api endpoint to address
 * @param {object} [payload] the payload to send to the API
 * @returns the response from the API endpoint parsed as a json object
 */

// try and catch toegevoegd vanwege error handling omdat de error ook in de console zichtbaar is
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
// The function takes two parameters: 'url' and 'payload'. 'payload' has a default value of an empty object.
export default async function fetchJson(url, payload = {}) {
   try{
       return await fetch(url, payload) // The 'fetch' function is called with 'url' and 'payload' as arguments. 'fetch' returns a Promise that resolves to the Response to that request, whether it is successful or not.
           .then((response) => response.json())
       /* The 'then' method is called on the Promise returned by 'fetch'.
           This method takes a function as an argument, which is called when the Promise is
           https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
        fulfilled. Here,
        the function takes the Response object returned by 'fetch' and calls the 'json' method on
        it to parse the body text as JSON. This returns another Promise that resolves with the result of parsing the body text as JSON. */
   }
   catch(error){
       // return await fetch(url, payload)
       console.error('Error:', error); /* The 'catch' method is called on the Promise returned by 'then'. This method takes a function as an argument, which is called when the Promise is rejected. Here, the function takes the error that caused the Promise to be rejected and simply returns it. This means that if an error occurs anywhere in the chain of Promises, this function will be called and the error will be returned as the result of 'fetchJson'. */
   }
}
