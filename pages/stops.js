import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function stops(){
    const { data, error } = useSWR('/api/getStops', fetcher)

    console.log(data)
    return(
        <div>hi</div>
    )
}