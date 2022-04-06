import React, {useState} from 'react';
import { useQuery } from 'react-query';
import Planet from "./Planet";
import Person from "./Person";

const fetchPeople = async (page) => {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`)
    return res.json();
}

const People = () => {
    const [page, setPage] = useState(1);
    const { data, status } = useQuery(['people', page], () => fetchPeople(page), {keepPreviousData: true})

    return (
        <div>
            <h2>People</h2>

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
                        {data.results.map(person => <Person key={person.name} person={person} />)}
                    </div>
                </>
            )}
        </div>
    );
}

export default People;
