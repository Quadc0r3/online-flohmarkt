import React from "react";
import "./Categories.css";

function Categories({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="categories">
            <h2>Categories</h2>
            <div className="category-list">
                <button
                    className={!selectedCategory ? "active" : ""}
                    onClick={() => onSelectCategory(null)}
                >
                    All
                </button>
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={selectedCategory === category ? "active" : ""}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Categories;
