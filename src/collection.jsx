import React from "react";
import MyLoader from "./component/loader";

function Collection({ name, images,isLoading }) {
    return (
          isLoading ? (
                <div className="skeleton-list">
                    <MyLoader/>
                    <MyLoader/>
                    <MyLoader/>
                </div>
            ) : (
                <div className="collection">
                    <img className="collection__big" src={images[0]} alt="Item"/>
                    <div className="collection__bottom">
                        <img className="collection__mini" src={images[1]} alt="Item"/>
                        <img className="collection__mini" src={images[2]} alt="Item"/>
                        <img className="collection__mini" src={images[3]} alt="Item"/>
                    </div>
                    <h4>{name}</h4>
                </div>
            )

    );
}

export default Collection