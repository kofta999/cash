'use client';
import { title } from 'process';
import React, {useState} from 'react'


interface Choice {
  label: string;
  value: string;
}

const Sell = () => {
  const [selectedChoice, setSelectedChoice] = useState('');
  const [title, setTitle] = useState ('');
  const handleChoiceChange = (e) => {
    setSelectedChoice(e.target.value);
  };

  const choices = [
    'Unisex Clothes',
    'Unisex Accessories',
    'Women\'s Clothes',
    'Men\'s Clothing',
    'Women\'s Accessories',
    'Men\'s Accessories',
  ];

  return ( 
  
    <div className="choice-box flex flex-col mt-8 mx-auto ml-4 h-screen ">  
      <h2>post your Ad</h2>
     <div className='choice-container mb-4 border border-gray-300 rounded-md px-4 py-2' >
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


      <div className='title-container mb-4 border border-gray-300 rounded-md px-4 py-2 '>
        <label htmlFor="title">Ad title:</label>
        <input 
          type="text"
          id="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter a descriptive title for your ad'
        />
      </div>
    </div>

  );
};


export default Sell