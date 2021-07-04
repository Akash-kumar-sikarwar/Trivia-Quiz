import React from 'react';

import '../styles.css';

export default function Category (props){
    const {categories, selectedCategory} = props;
    return (
        <ul className="category-list">
            {categories.map((category)=>{
                return (
                    <li className="category-item" key={category}>
                        <button className="category-btn" value={category} onClick={selectedCategory}>{category}</button>
                    </li>
                );
            })}
        </ul>
    );

}