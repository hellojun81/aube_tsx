'use client'
import React, { useState } from 'react';
import './sendEmail.css';
// import { makeStyles } from '@mui/styles';
import { Button, Container, Typography, TextField, Box } from '@mui/material';
const ApiEmailPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [status, setStatus] = useState('');





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('Sending...');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    if (attachment) {
      formData.append('attachment', attachment);
    }



    const countFiles = fetch('/api/countFiles?folder=public/1floor/height', {
      method: 'get',
    });

    console.log('countFiles', countFiles)


    const res = await fetch('/api/sendmail', {
      method: 'POST',
      body: formData,
    });

    if (res.status === 200) {
      setStatus('Email sent successfully!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setAttachment(null);
    } else {
      setStatus('Failed to send email.');
    }
  };

  return (

    <>

      <div className="container" id='sendEmail'>
        <div style={{ color: '#333' }}><p>TEL:<a href="tel:+821031019551">
          (010) 3101-9551</a> <br/> <a href="mailto:taulcontact@gmail.com">taulcontact@gmail.com</a> <br/> 
    
            <a href='https://www.instagram.com/aube._studio/'>@aube._studio</a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className='form'>
          <div className="form-group">
            <TextField
              label="Name"
              variant="standard"
              margin="normal"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              label="Email"
              variant="standard"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">

            <TextField
              label="Subject"
              variant="standard"
              margin="normal"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '10px' }}>

            <TextField
              id="Message"
              label="message"
              value={message}
              multiline
              rows={3}
              fullWidth
              variant="standard"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <input
              type="file"
              id="attachment"
              onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <button type="submit">Send</button>
        </form>
        {status && <p>{status}</p>}

        <div className='info'>
          예약관련<br />
          ∙예약문의는 전화, 문자, 이메일, DM을 통해 연락주시길 바랍니다.<br />
          [업체명 / 대관목적 / 대관희망일 / 사용인원 / 대관시간] <br />
          ∙ 사전답사 원하실 경우 사전 조율 부탁드립니다.<br />
          ∙ 대관은 최소 4시간 부터 가능합니다.<br />
          ∙ 계약금 납부계좌 : 기업은행 027-162297-04-021 ㈜타울<br />
          ∙ 계약진행 : 정산은 계약금(전체대금의 50%)납부 →  이용 →  잔금납부 → 세금계산서 발행 순서로 진행됩니다. <br />
          ∙ 예약취소 : 촬영 15일내 취소시 전체대금의 30% 위약금 발생<br />
          촬영 10일내 취소시 전체대금의 50% 위약금 발생<br />
          촬영 7일내 취소시 전체대금의 70% 위약금 발생<br />
          촬영 3일내 취소시 전체대금의 90% 위약금 발생<br />
          촬영 당일 취소시 전체대금의 100% 위약금 발생<br /><br /><br /><br /><br />





          기타<br />
          ∙주차는  전체대관시 4대 , 1개층 대관시 1대 가능하며 초과되는 차량은 <br />
          인근 주차장 이용 바랍니다.<br />

          ∙인근 주차장 : <br />
          - 성수 우림e비즈센터 (220m) : 서울 성동구 성수동2가 280-21 / 전일 7-22시 운영<br />
          - 하이파킹우리W타워 (190m) : 서울 성동구 성수동2가 277-28 / 전일 7-22시 운영<br />
          KT 성수분국 노상공영주차장 (175m) : 서울 성동구 성수동 2가 280-50 / 평일 9-19시 운영 / 토요일 9-15시 운영 / 공휴일 무료 개방<br />

          ∙기본제공 : 릴선 1개, 접이식 의자 10개, 간이 테이블 1개, 카메라테이블 1개,<br />
          스팀다리미 1개 , 행거 1개 제공 됩니다.<br />
          ∙ 스튜디오내 음식취사는 불가하며 음료만 가능합니다.<br />
          ∙ 마당 및 별채 촬영은 1층 대관시에만 가능합니다.<br />
        </div>


      </div>
    </>
  );
};

export default ApiEmailPage;
