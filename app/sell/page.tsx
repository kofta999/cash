"use client";
import React, { ChangeEventHandler, useState } from "react";
interface Choice {
  label: string;
  value: string;
}

const Sell = () => {
  const [selectedChoice, setSelectedChoice] = useState("");
  const [title, setTitle] = useState("");
  const handleChoiceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedChoice(e.target.value);
  };

  const choices = [
    "Unisex Clothes",
    "Unisex Accessories",
    "Women's Clothes",
    "Men's Clothing",
    "Women's Accessories",
    "Men's Accessories",
  ];

  return (
    <div className="choice-box">
      <h2>post your Ad</h2>

      {choices.map((choice, index) => (
        <div key={index} className="choice-item">
          <input
            type="radio"
            id={choice}
            name="choice"
            value={choice}
            checked={selectedChoice === choice}
            onChange={handleChoiceChange}
          />
          <label htmlFor={choice}>{choice}</label>
        </div>
      ))}

      <div>
        <label htmlFor="title"> title:</label>
        <input
          type="text"
          id="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title for your ad"
        />
      </div>
    </div>
  );
};

export default Sell;
