import React, {useState} from 'react';
import { useQuery } from 'react-query';
import Planet from "./Planet";

const fetchPlanets = async (page) => {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
    return res.json();
}


const Planets = () => {
    const [page, setPage] = useState(1);
    const { data, status, isPreviousData } = useQuery(['planets', page], () => fetchPlanets(page), {keepPreviousData: true})

    return (
        <div>
            <h2>Planets</h2>
            {status === "error" && (
                <div>Error fetching data</div>
            )}

            {status === "loading" && (
                <div>Loading...</div>
            )}

            {status === "success" && (
                <>
                    <button onClick={() => setPage(old => Math.max(old - 1, 1))}
                            disabled={page === 1}
                    >Previous page</button>
                    <span>{page}</span>
                    <button onClick={() => setPage(old => (data?.next ? old + 1 : old))}
                            disabled={!data?.next}
                    >Next page</button>
                    <div>
                    {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                </div>
                </>
            )}
        </div>
    );
}

export default Planets;
