
const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const filtered = fruits.filter((fruit) =>
      fruit.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(value ? filtered : []);
  };

  const handleSuggestionClick = (value) => {
    setInput(value);
    setSuggestions([]);
  };

  return (
   <div className="container">
        {/* Do not remove the main div */}
      <h1>Fruit Autocomplete</h1>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type a fruit..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((fruit, index) => (
            <li key={index} onClick={() => handleSuggestionClick(fruit)}>
              {fruit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
