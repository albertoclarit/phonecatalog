export const fetcher = async (query,variables={}) => {
    try {
        let result = await  fetch(  'api/graphql', {
            credentials: 'include', //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({query, variables}),
        })

        let json = await result.json()
        return json.data

    }catch(e){
        return e
    }

}
