import React from 'react';

import '../styles.css';

export default function Category (props){
    const {categories, selectedCategory} = props;
    return (
        <>
        <h1 className="title">Please select a category</h1>
        <ul className="category-list">
            {categories.map((category)=>{
                return (
                    <li className="category-item" key={category}>
                        {/* <button className="category-btn" value={category} onClick={selectedCategory}>{category}</button> */}
                        <div className="card">
                            <img src={`../src/img/categories/${category}.jpg`} alt={category} className="category-thumbnail" onClick={selectedCategory}></img>
                            <div className="banner-title">
                                <div className="label">{category}</div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
        </>
    );

}