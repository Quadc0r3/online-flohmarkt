import axios from 'axios';
import { useEffect, useState } from "react";

function Categories({ onSelectCategory, selectedCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="categories">
            <h2>Explore Categories</h2>
            <div className="category-list">
                {categories.map((category, index) => (
                    <button 
                        key={index} 
                        onClick={() => onSelectCategory(category)}
                        className={category === selectedCategory ? "category-button selected-category" : "category-button"}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Categories;
