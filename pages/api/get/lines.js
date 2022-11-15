const URL_BUSES = "https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=%20f2e5503e927d-4ad3-9500-4ab9e55deb59&apikey=56b464f3-24b9-4aa2-a732-f7ee8603dd31&type=1"
const URL_TRAMS = "https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=%20f2e5503e927d-4ad3-9500-4ab9e55deb59&apikey=56b464f3-24b9-4aa2-a732-f7ee8603dd31&type=2"

const options = {
    method: 'GET',
    cache: 'no-cache'
}

export default async function getLines(req,res){
    const busFetch = await fetch(URL_BUSES, options).then(res => res.json()).catch(error => res.status(503).send(error))
    const tramFetch = await fetch(URL_TRAMS, options).then(res => res.json()).catch(error => res.status(503).send(error))


    const filteredBus = [...new Set(busFetch.result.map(item => item.Lines))]
    const filteredTram = [...new Set(tramFetch.result.map(item => item.Lines))]

    const responseArray = [
        ...filteredBus.map((item) => {
            return {
                type: 'bus',
                number: item
            }
        }),
        ...filteredTram.map((item) => {
            return {
                type: 'tram',
                number: item
            }
        })
    ].sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }))

    return res.status(200).send(responseArray)
}

