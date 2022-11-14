//const URL = "https://api.um.warszawa.pl/api/action/dbstore_get/?id=ab75c33d-3a26-4342-b36a-6e5fef0a3ac3&name=Habicha&apikey=56b464f3-24b9-4aa2-a732-f7ee8603dd31"

const options = {
    method: 'GET',
    cache: 'no-cache'
}

export default async function getPosition(req,res){
    const { lineNumber, type } = req.query
    const serviceType = type == 'bus' ? '1' : '2'
    const URL = "https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=%20f2e5503e927d-4ad3-9500-4ab9e55deb59&apikey=56b464f3-24b9-4aa2-a732-f7ee8603dd31&type="+serviceType+"&line=" +lineNumber

    await fetch(URL,options)
    .then((response) => response.json())
    .then((data) => {
        return res.status(200).send(data)
    })
    .catch((err) => {
        return res.status(503).send(err)
    })
}