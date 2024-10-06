"use client";
import React, { ChangeEventHandler, useState } from "react";
interface Choice {
  label: string;
  value: string;
}

const Sell = () => {
  const [selectedChoice, setSelectedChoice] = useState("");
  const [title, setTitle] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const handleChoiceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedChoice(e.target.value);
  };

  const handleGovernorateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGovernorate(e.target.value);
  };


  const choices = [
    "Unisex Clothes",
    "Unisex Accessories",
    "Women's Clothes",
    "Men's Clothing",
    "Women's Accessories",
    "Men's Accessories",
  ];

  const governorates: {label: string; value: string}[] = [
    {label: 'Alexandria' , value:'Alexandria'},
    {label: 'Aswan' , value:'Aswan'},
    {label: 'Assiut' , value:'Assiut'},
    {label: 'Beheira' , value:'Beheira'},
    {label: 'Beni Suef' , value:'Beni Suef'},
    {label: 'Cairo' , value:'Cairo'},
    {label: 'Dakahlia' , value:'Dakahlia'},
    {label: 'Damietta' , value:'Damietta'},
    {label: 'Fayoum' , value:'Fayoum'},
    {label: 'Gharbia' , value:'Gharbia'},
    {label: 'Ismailia' , value:'Ismailia'},
    {label: 'Kafr el-Sheikh' , value:'Kafr el-Sheikh'},
    {label: 'Matrouh' , value:'Matrouh'},
    {label: 'Minya' , value:'Minya'},
    {label: 'Menofia' , value:'Menofia'},
    {label: 'New Valley' , value:'New Valley'},
    {label: 'North Sinai' , value:'North Sinai'},
    {label: 'Port Said' , value:'Port Said'},
    {label: 'Qualyubia' , value:'Qualyubia'},
    {label: 'Qena' , value:'Qena'},
    {label: 'Red Sea' , value:'Red Sea'},
    {label: 'Al-Sharqia' , value:'Al-Sharqia'},
    {label: 'Sohag' , value:'Sohag'},
    {label: 'South Sinai' , value:'South Sinai'},
    {label: 'Suez' , value:'Suez'},
    {label: 'Luxor' , value:'Luxor'},  


  ];



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
     <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2"> {/* Title input container */}
        <label htmlFor="title">Ad Title :</label>
        <input
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
       
        <div className="governorate-container mb-4 border-gray-300 rouded-md px-4 py-2">
          <label htmlFor="governorate">Location:</label>
            <select id="governorate" value={selectedGovernorate} onChange={handleGovernorateChange}>
            <option value="">Select Governorate</option>
            {governorates.map((governorate, index) => (
            <option key={index} value={governorate.value}>
              {governorate.label}
            </option>
          ))}
          </select>

        </div>
        <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2"> {/* Title input container */}
          <label htmlFor="title">Name :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title for your ad"
          />
        </div>
        <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2"> {/* Title input container */}
          <label htmlFor="title">Phone Number :</label>
          <input
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
