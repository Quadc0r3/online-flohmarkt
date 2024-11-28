import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from "react";

function Categories() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Kategorien vom Backend holen
        axios.get('http://localhost:8080/api/categories')
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryClick = (category) => {
        navigate(`/search`, { state: { category } });
    };

    return (
        <div className="categories">
            <h2>Explore Categories</h2>
            <div className="category-list">
                {categories.map((category, index) => (
                    <button key={index} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Categories;
