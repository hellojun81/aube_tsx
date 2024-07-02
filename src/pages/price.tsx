"use client"
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [inputValues, setInputValues] = useState<string[]>(['', '']);
  const [selectedValue1, setSelectedValue1] = useState<string>('1');
  const [selectedValue2, setSelectedValue2] = useState<string>('1');
  const [tmoney, setTmoney] = useState<number>(0);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValues = [...inputValues];
    newValues[index] = e.target.value;
    setInputValues(newValues);
  };

  const handleSelectChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue1(e.target.value);
  };

  const handleSelectChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue2(e.target.value);
  };

  const handleButtonClick = () => {
    console.log({ selectedValue1: selectedValue1, selectedValue2: selectedValue2, inputValues: inputValues[0], inputValues1: inputValues[1] })
    console.log(inputValues);
    let hour = parseInt(inputValues[0])
    let users = parseInt(inputValues[1])
    let usersfee = 0
    if (users < 11) {
      users = 0
      usersfee=0
    }
    if (users < 11) {
      usersfee=10000
      users=users-10
    }
    if (users > 10 || users < 21) {
      usersfee=15000
      users=users-10
    }
    if (users > 20 || users < 31) {
      usersfee=20000
      users=users-10
    }
    if (users > 31) {
      usersfee=30000
      users=users-10
    }
    let gubun = 0
    switch (selectedValue1) {
      case '1':
        gubun = 0;
        break;
      case '2':
        gubun = 0;
        break;

    }


    let place = 0
    if (hour < 9) {
      switch (selectedValue2) {
        case '1':
          place = 300000;
          break;
        case '2':
          place = 200000;
          break;
        case '3':
          place = 200000;
          break;
      }
    } else {
      switch (selectedValue2) {
        case '1':
          place = 250000;
          break;
        case '2':
          place = 150000;
          break;
        case '3':
          place = 150000;
          break;
      }
    }


    console.log({ gubun: gubun, place: place, hour: hour, users: users })


    let tmoney = gubun + place * hour + (users * hour)+(users*usersfee)
    setTmoney(tmoney)
    // Calculation logic for `tmoney` can be added here based on input values and selected options
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>AUBESTUDIO PRICE</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="photo-video-select">촬영구분</label>
        <select
          id="photo-video-select"
          value={selectedValue1}
          onChange={handleSelectChange1}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        >
          <option value="1">사진</option>
          <option value="2">영상</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="location-select">렌탈장소</label>
        <select
          id="location-select"
          value={selectedValue2}
          onChange={handleSelectChange2}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        >
          <option value="1">1층</option>
          <option value="2">2층</option>
          <option value="3">3층</option>
          <option value="4">부속실</option>
        </select>
      </div>
      {inputValues.map((value, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          {index === 0 && <label>이용시간</label>}
          {index === 1 && <label>총인원수</label>}
          <input
            type="text"
            value={value}
            onChange={handleChange(index)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
      ))}
      <h1>{tmoney}원</h1>
      <button onClick={handleButtonClick} style={{ padding: '10px 20px' }}>
        계산
      </button>
    </div>
  );
};

export default Home;
