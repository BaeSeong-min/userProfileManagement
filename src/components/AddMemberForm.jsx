import { useState } from 'react';
import { useMemberStore } from '../store/memberStore';
import '../style/AddMemberForm.css';

export default function AddMemberForm({ onClose }) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [tags, setTags] = useState('');
  const addMember = useMemberStore((state) => state.addMember); // store 객체에서 addMember함수 불러옴옴

  const handleSubmit = () => {
    if (!name || !position || !tags) return;

    const newMember = {
      id: Date.now(),
      name,
      position,
      tags: tags.split(',').map((tag) => tag.trim()), // 국적
    };

    addMember(newMember);
    onClose();
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-box" onClick={(e) => e.stopPropagation()}>
        <h3>새 팀원 추가</h3>
        <input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="포지션"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          placeholder="태그 (쉼표로 구분)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="form-actions">
          <button onClick={handleSubmit}>추가</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
