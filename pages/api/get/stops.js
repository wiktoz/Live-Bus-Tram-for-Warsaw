const URL = "https://api.um.warszawa.pl/api/action/dbstore_get/?id=ab75c33d-3a26-4342-b36a-6e5fef0a3ac3&name=Habicha&apikey=56b464f3-24b9-4aa2-a732-f7ee8603dd31"

const options = {
    method: 'GET',
    cache: 'no-cache'
}

export default async function getStops(req, res){
    const { form } = req.query
    const stopsFetch = await fetch(URL, options).then(res => res.json()).catch(err => res.status(503).send(err))

    const responseArray = stopsFetch.result.map(item =>
        item.values.map(value => { return {[value.key]: value.value} }).reduce((acc, x) => {
            for (var key in x) acc[key] = x[key]
            return acc
        }, {})
    )

    if(form == 'short'){
        const shortArray = responseArray.map(item => {
            return { stop: item.nazwa_zespolu + " " + item.slupek }
        })
        return res.status(200).send(shortArray)
    }
    
    return res.status(200).send(responseArray)
}