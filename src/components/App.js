import React, { useState, useEffect, useCallback, useRef } from "react";
import 'regenerator-runtime/runtime';

const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const App = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const activeQuery = useRef(null);

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSuggestions([]); // Ensure `<ul>` stays in DOM
        return;
      }

      activeQuery.current = query;

      await new Promise((resolve) => setTimeout(resolve, 200)); // Reduced debounce delay

      if (activeQuery.current === query) {
        const filtered = fruits.filter((fruit) =>
          fruit.toLowerCase().startsWith(query.toLowerCase())
        );
        setSuggestions(filtered);
      }
    }, 200),
    []
  );

  useEffect(() => {
    fetchSuggestions(input);
  }, [input]);

  const handleChange = (e) => setInput(e.target.value);

  const handleClick = (value) => {
    setInput(value);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search fruits..."
      />
      <ul className="suggestions-list">
        {suggestions.length > 0 ? (
          suggestions.map((s, i) => <li key={i} onClick={() => handleClick(s)}>{s}</li>)
        ) : (
          <li style={{ visibility: 'hidden' }}>Placeholder</li> // Keeps `<ul>` in DOM
        )}
      </ul>
    </div>
  );
};

export default App;
