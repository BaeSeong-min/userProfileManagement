import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';

export default function MemberModal({ member, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onClose(); // fadeOut 끝난 뒤 진짜 닫힘
      }, 300); // fadeOut 지속 시간과 맞춤
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!member) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      setIsVisible(false);
    }
  };

  return (
    <Backdrop className="modal-backdrop" onClick={handleOutsideClick} $fadeOut={!isVisible}>
      <ModalBox $fadeOut={!isVisible}>
        <h2>{member.name}</h2>
        <p>포지션: {member.position}</p>
        <p>회사명: {member.tags}</p>
        <CloseButton onClick={() => setIsVisible(false)}>닫기</CloseButton>
      </ModalBox>
    </Backdrop>
  );
}

// 컴포넌트 스타일링
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.95); }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ $fadeOut }) => ($fadeOut ? fadeOut : fadeIn)} 0.3s ease;
`;

const ModalBox = styled.div`
  background: white;
  color: black;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
  max-width: 90%;
  animation: ${({ $fadeOut }) => ($fadeOut ? fadeOut : fadeIn)} 0.3s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
`;

const CloseButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;