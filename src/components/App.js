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
  const activeQuery = useRef(null); // Track latest input request

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSuggestions([]); // Ensure suggestions clear on empty input
        return;
      }

      activeQuery.current = query; // Track the latest input request

      await new Promise((resolve) => setTimeout(resolve, 250)); // Reduced debounce delay

      // Ensure only the latest query updates state
      if (activeQuery.current === query) {
        const filtered = fruits.filter((fruit) =>
          fruit.toLowerCase().startsWith(query.toLowerCase())
        );
        setSuggestions(filtered);
      }
    }, 250),
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
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => handleClick(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
