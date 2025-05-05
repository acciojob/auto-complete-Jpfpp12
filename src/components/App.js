import React, { useState, useEffect, useCallback } from "react";
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

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query) return setSuggestions([]);

      // Simulate async fetch (replace with real API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 300));

      const filtered = fruits.filter((fruit) =>
        fruit.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filtered);
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(input);
  }, [input, fetchSuggestions]);

  const handleChange = (e) => setInput(e.target.value);

  const handleClick = (value) => {
    setInput(value);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-container">
        {/* Do not remove the main div */}
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
