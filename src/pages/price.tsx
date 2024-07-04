"use client"
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [inputValues, setInputValues] = useState<string[]>(['', '']);
  const [phototype, setphototype] = useState<string>('1');
  const [floortype, setfloortype] = useState<string>('1');
  const [userCnt, setuserCnt] = useState<string>('10');
  const [useHour, setuseHour] = useState<string>('half');
  const [tmoney, setTmoney] = useState<number>(0);
  const [originTmoney, setOriginTmoney] = useState<number>(0);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValues = [...inputValues];
    newValues[index] = e.target.value;
    setInputValues(newValues);
  };

  const handleSelectChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setphototype(e.target.value);
  };

  const handleSelectChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setfloortype(e.target.value);
  };
  const handleSelectChange3 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setuseHour(e.target.value);
  };

  const handleSelectChange4 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setuserCnt(e.target.value);
  };


  const handleButtonClick = () => {
    console.log({ phototype: phototype, floortype: floortype, hour: userCnt, users: useHour })
    console.log('user', userCnt);

    let hour = useHour
    let users = parseInt(userCnt)
    let floor_fee = []

    if (hour =='half') {
      floor_fee[0] = 300000;
      floor_fee[1] = 1200000;
      floor_fee[2] = 800000;
      floor_fee[3] = 800000;
    } else {
      floor_fee[0] = 500000;
      floor_fee[1] = 1900000;
      floor_fee[2] = 1300000;
      floor_fee[3] = 1300000;
    }

    if (phototype == '2') {
      if (hour =='half') {
        floor_fee[0] = 350000;
        floor_fee[1] = 1500000;
        floor_fee[2] = 1000000;
        floor_fee[3] = 1000000;
      } else {
        floor_fee[0] = 600000;
        floor_fee[1] = 2300000;
        floor_fee[2] = 1600000;
        floor_fee[3] = 1600000;
      }
    }

    console.log('floor_fee', floor_fee)
    let usersfee=GetUserFee(phototype,users,hour)
    let GetPlaceMoney = GetplaceMoney(phototype, floor_fee, hour, floortype)
    console.log({ GetPlaceMoney: GetPlaceMoney, hour: hour, usersfee: usersfee, users: users,phototype:phototype })
    let tmoney = GetPlaceMoney + usersfee
    const origin_Tmoney = tmoney
    setOriginTmoney(origin_Tmoney)
    setTmoney(tmoney)
  };
  const GetUserFee = (phototype: string, usersCnt: number,hour:string): number => {
    let UsersFee = 0
    
    if (usersCnt <= 10) {
      usersCnt = 0
      UsersFee = 0
    }
    if (usersCnt > 10 && usersCnt <= 15) {
      UsersFee = 300000
      if (floortype == '10') {
        UsersFee = 500000
        if(phototype=='2'&& hour=='all'){
          UsersFee=700000
        }
      }
    }
    if (usersCnt > 15 && usersCnt <= 20) {
      UsersFee = 500000
      if (floortype == '10') {
        UsersFee = 1000000
        if(phototype=='2'&& hour=='all'){
          UsersFee=1400000
        }
      }
    }
    if (usersCnt > 20 && usersCnt <= 25) {
      UsersFee = 800000
      if (floortype == '10') {
        UsersFee = 1500000
        if(phototype=='2'&& hour=='all'){
          UsersFee=2100000
        }
      }
    }
    if (usersCnt > 25 && usersCnt <= 30) {
      UsersFee = 1000000
      if (floortype == '10') {
        UsersFee = 2000000
        if(phototype=='2'&& hour=='all'){
          UsersFee=2800000
        }
      }
    }
    if (usersCnt >= 31) {
      UsersFee = 1300000
      if (floortype == '10') {
        UsersFee = 2500000
        console.log({GetUserFee_phototype:phototype,hour:hour})
        if(phototype=='2' && hour=='all'){
          UsersFee=3500000
        }
      }
    }
    console.log('GetUserFee',UsersFee)
    return UsersFee;
    
  }

  const GetplaceMoney = (phototype: string, floor_fee: number[], hour: string, floor: string): number => {
    console.log({ floor_fee: floor_fee, hour: hour, floor: floor })
    let place = 0
    place = floor_fee[parseInt(floortype)];
    if (phototype == '1') {
      if (hour  =='half') {
        switch (floor) {
          case '4':   //1층+별채
            place = floor_fee[1] + floor_fee[0];
            break;
          case '5':   //1층+2층
            place = floor_fee[1] + floor_fee[2] - 300000;
            break;
          case '6':   //1층+3층
            place = floor_fee[1] + floor_fee[3] - 300000;
            break;
          case '7':   //2층+3층
            place = floor_fee[2] + floor_fee[3] - 400000;
            break;
          case '8':   //1층+2층+별채
            place = floor_fee[1] + floor_fee[2] + floor_fee[0] - 400000;
            break;
          case '9':   //1층+3층+별채
            place = floor_fee[1] + floor_fee[2] + floor_fee[0] - 400000;
            break;
          case '10':   //ALL
            place = floor_fee[1] + floor_fee[2] + floor_fee[3] + floor_fee[0] - 600000;
            break;
        }
      } else {
        switch (floortype) {
          case '4':   //1층+별채
            place = floor_fee[1] + floor_fee[0];
            break;
          case '5':   //1층+2층
            place = floor_fee[1] + floor_fee[2] - 500000;
            break;
          case '6':   //1층+3층
            place = floor_fee[1] + floor_fee[3] - 500000;
            break;
          case '7':   //2층+3층
            place = floor_fee[2] + floor_fee[3] - 700000;
            break;
          case '8':   //1층+2층+별채
            place = floor_fee[1] + floor_fee[2] + floor_fee[0] - 600000;
            break;
          case '9':   //1층+3층+별채
            place = floor_fee[1] + floor_fee[2] + floor_fee[0] - 600000;
            break;
          case '10':   //ALL
            place = floor_fee[1] + floor_fee[2] + floor_fee[3] + floor_fee[0] - 1200000;
            break;
        }
      }
    }

    if (phototype == '2') {
      if (hour =='half') {
        switch (floor) {
          case '4':   //1층+별채
            place = floor_fee[1] + floor_fee[0];
            break;
          case '5':   //1층+2층
            place = floor_fee[1] + floor_fee[2] - 500000;
            break;
          case '6':   //1층+3층
            place = floor_fee[1] + floor_fee[3] - 500000;
            break;
          case '7':   //2층+3층
            place = floor_fee[2] + floor_fee[3] - 600000;
            break;
          case '8':   //1층+2층+별채
            place = floor_fee[1] + floor_fee[2] + floor_fee[0] - 550000;
            break;
          case '9':   //1층+3층+별채
            place = floor_fee[1] + floor_fee[2] + floor_fee[0] - 550000;
            break;
          case '10':   //ALL
            place = floor_fee[1] + floor_fee[2] + floor_fee[3] + floor_fee[0] - 850000;
            break;
        }
      } else {
        switch (floortype) {
          case '4':   //1층+별채
            place = floor_fee[1] + floor_fee[0];
            break;
          case '5':   //1층+2층
            place = floor_fee[1] + floor_fee[2] - 700000;
            break;
          case '6':   //1층+3층
            place = floor_fee[1] + floor_fee[3] - 700000;
            break;
          case '7':   //2층+3층
            place = floor_fee[2] + floor_fee[3] - 900000;
            break;
          case '8':   //1층+2층+별채
            place = floor_fee[1] + floor_fee[2] + floor_fee[0] - 800000;
            break;
          case '9':   //1층+3층+별채
            place = floor_fee[1] + floor_fee[2] + floor_fee[0] - 800000;
            break;
          case '10':   //ALL
            place = floor_fee[1] + floor_fee[2] + floor_fee[3] + floor_fee[0] - 1500000;
            break;
        }
      }

    }

    return place
  };

  const formatMoney = (amount: number): string => {
    return amount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>AUBESTUDIO PRICE</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="photo-video-select">촬영구분</label>
        <select
          id="photo-video-select"
          value={phototype}
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
          value={floortype}
          onChange={handleSelectChange2}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        >
          <option value="1">1층</option>
          <option value="2">2층</option>
          <option value="3">3층</option>
          <option value="0">별채</option>
          <option value="4">1층+별채</option>
          <option value="5">1층+2층</option>
          <option value="6">1층+3층</option>
          <option value="7">2층+3층</option>
          <option value="8">1층+2층+별채</option>
          <option value="9">1층+3층+별채</option>
          <option value="10">ALL</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="location-select">이용시간</label>
        <select
          id="location-select"
          value={useHour}
          onChange={handleSelectChange3}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        >
          <option value='half'>4시간(HALF)</option>
          <option value='all'>9시간(ALL)</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="location-select">총인원수</label>
        <select
          id="location-select"
          value={userCnt}
          onChange={handleSelectChange4}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        >
          <option value={10}>10인이하</option>
          <option value={11}>11~15인</option>
          <option value={16}>16~20인</option>
          <option value={21}>21~25인</option>
          <option value={26}>26~30인</option>
          <option value={31}>31이상 협의</option>
          {/* <option value={40}>40~50인</option>
          <option value={50}>50인이상</option> */}
        </select>
      </div>

      <h1>견적가:{formatMoney(originTmoney)}원</h1>
      <h1>할인가:{formatMoney(tmoney)}원</h1>
      <button onClick={handleButtonClick} style={{ padding: '10px 20px' }}>
        계산
      </button>
    </div>
  );
};

export default Home;
