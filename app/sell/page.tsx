"use client";
import React, { ChangeEventHandler, useRef, useState } from "react";
import ImageUploader from "./_components/image-uploader";
import { choices, governorates } from "./consts";

const Sell = () => {
  const [selectedChoice, setSelectedChoice] = useState("");
  const [title, setTitle] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("");

  const handleChoiceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedChoice(e.target.value);
  };

  const handleGovernorateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGovernorate(e.target.value);
  };

  return (
    <div className="choice-box">
      <h1>post your Ad</h1>
      <div className="choice-container mb-4 border border-gray-300 rounded-md px-4 py-2">
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
      </div>
      <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2">
        {" "}
        {/* Title input container */}
        <label htmlFor="title">Ad Title :</label>
        <input
          className="input input-bordered"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title for your ad"
        />
      </div>

      <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2">
        <label htmlFor="description"> Description:</label>
        <textarea
          id="description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Describe your product and additional details (brand, size, material, etc.)"
          className="w-full h-48 resize-none overflow-auto"
        />
      </div>

      <ImageUploader />

      <div className="governorate-container mb-4 border-gray-300 rouded-md px-4 py-2">
        <label htmlFor="governorate">Location:</label>
        <select
          id="governorate"
          value={selectedGovernorate}
          onChange={handleGovernorateChange}
        >
          <option value="">Select Governorate</option>
          {governorates.map((governorate, index) => (
            <option key={index} value={governorate.value}>
              {governorate.label}
            </option>
          ))}
        </select>
        I
      </div>
      <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2">
        {" "}
        {/* Title input container */}
        <label htmlFor="title">Name :</label>
        <input
          className="input input-bordered"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title for your ad"
        />
      </div>
      <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2">
        {" "}
        {/* Title input container */}
        <label htmlFor="title">Phone Number :</label>
        <input
          className="input input-bordered"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter phone Number"
        />
      </div>
    </div>
  );
};

export default Sell;
