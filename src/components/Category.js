import React from 'react';

import '../styles.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../public/img/categories', false, /\.(png|jpe?g|svg)$/));

export default function Category (props){
    const {categories, selectedCategory} = props;
    return (
        <>
        <h1 className="title">Please select a category</h1>
        <ul className="category-list">
            {categories.map((category)=>{
                return (
                    <li className="category-item" key={category}>
                        <div className="card">
                            <img src={`./public/img/categories/${category}.jpg`} alt={category} className="category-thumbnail" onClick={selectedCategory}></img>
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