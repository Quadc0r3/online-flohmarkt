import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard.jsx";
import "./SearchPage.css";

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState(""); // Suchbegriff
    const [filteredItems, setFilteredItems] = useState([]); // Gefilterte Artikel
    const [allItems, setAllItems] = useState([]); // Alle Artikel
    const [categories, setCategories] = useState([]); // Kategorienliste
    const [selectedCategory, setSelectedCategory] = useState(""); // Ausgewählte Kategorie
    const [priceRange, setPriceRange] = useState(1000); // Maximaler Preis als Slider-Wert
    const [maxPrice, setMaxPrice] = useState(1000); // Dynamischer Maximalwert für den Slider

    // Artikel aus der Datenbank laden
    useEffect(() => {
        axios.get("http://localhost:8080/api")
            .then((res) => {
                setAllItems(res.data);
                extractCategories(res.data);
                calculateMaxPrice(res.data); // Maximalen Preis bestimmen
            })
            .catch((err) => console.error(err));
    }, []);

    // Kategorien aus Artikeln extrahieren
    const extractCategories = (items) => {
        const uniqueCategories = [...new Set(items.map(item => item.category))];
        setCategories(uniqueCategories);
    };

    // Maximalen Preis aus den Artikeln berechnen
    const calculateMaxPrice = (items) => {
        const prices = items.map(item => item.price);
        const highestPrice = Math.max(...prices);
        setPriceRange(highestPrice);
        setMaxPrice(highestPrice);
    };

    // Funktion zur Verarbeitung der Filter
    const handleFilters = () => {
        let results = allItems;

        // Suchbegriff filtern
        if (searchTerm) {
            results = results.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Kategorie filtern
        if (selectedCategory) {
            results = results.filter(item => item.category === selectedCategory);
        }

        // Preis filtern
        results = results.filter(item => item.price <= priceRange);

        setFilteredItems(results); // Gefilterte Artikel setzen
    };

    // Suchfeld-Verarbeitung
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Kategorie-Verarbeitung
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Preis-Slider-Verarbeitung
    const handlePriceChange = (e) => {
        setPriceRange(Number(e.target.value));
    };

    // Filter aktualisieren, wenn ein Filter geändert wird
    useEffect(() => {
        handleFilters();
    }, [searchTerm, selectedCategory, priceRange, allItems]);

    return (
        <div className="search-page">
            <header className="search-header">
                <h1>Search for Items</h1>

                <div className="filters">
                    {/* Suchfeld */}
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                    {/* Kategorieauswahl */}
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    {/* Preis-Slider */}
                    <div className="price-slider">
                        <label htmlFor="price">Max Price: {priceRange}€</label>
                        <input
                            type="range"
                            id="price"
                            min="0"
                            max={maxPrice}
                            value={priceRange}
                            onChange={handlePriceChange}
                        />
                    </div>
                </div>
            </header>

            <div className="search-results">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={`${item.price}€`}
                            imageURL={item.imageURL}
                        />
                    ))
                ) : (
                    <p>No items found matching your search.</p>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
