import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import './SearchBar.css';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
        const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim() === '') {
                setSuggestions([]);
                return;
            }
            setLoading(true);
            try {
                const peopleRef = collection(db, 'indigenousPeople');
                const q = query(
                    peopleRef,
                    where('name', '>=', searchTerm),
                    where('name', '<=', searchTerm + '\uf8ff'),
                    limit(5)
                );
                const querySnapshot = await getDocs(q);
                const suggestionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSuggestions(suggestionsData);
            } catch (error) {
                console.error("Error fetching suggestions: ", error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceFetch = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounceFetch);
    }, [searchTerm]);

    const handleSelect = (name) => {
        setSearchTerm(name);
        setSuggestions([]);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
            </div>
            {loading && <div className="suggestions-loading">Loading...</div>}
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((person) => (
                        <li key={person.id} onClick={() => handleSelect(person.name)}>
                            {person.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
