/**
 * Created by carlosriveros on 2017-03-20.
 */



const config = {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
        'Content-Type': 'application/json'
    })
}


export const genericHttpCall = (url) => {


    const request = new Request('http://localhost:8080/' + url, config);



    return window.fetch(request, config);

}