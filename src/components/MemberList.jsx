import { useQuery } from '@tanstack/react-query';
import { useMemberStore } from '../store/memberStore';
import { useEffect } from 'react';
import { useLikeStore } from '../store/likeStore';
import { useState } from 'react';
import MemberModal from './MemberModal';
import '../style/MemberList.css'

const fetchMembers = async () => {
  const res = await fetch('https://6831ba0c6205ab0d6c3d6745.mockapi.io/users');
  if (!res.ok) throw new Error('데이터 불러오기 실패');
  return res.json();
};

export default function MemberList() {
  const { data: fetchedMembers = [], isLoading, error } = useQuery({queryKey: ['members'], queryFn: fetchMembers,}); // data명을 members로 바꿈

  const members = useMemberStore((state) => state.members); // Zustand의 members 상태를 구독하고 있다. 따라서 members 상태가 바뀔 때마다 자동으로 해당 컴포넌트는 리렌더링된다.
  const setMembers = useMemberStore((state) => state.setMembers);
  const [selectedMember, setSelectedMember] = useState(null);

  const { likes, toggleLike, initializeLikes } = useLikeStore();

  // 최초 1회: fetch된 데이터를 Zustand Storage에 저장
  useEffect(() => {
      if (fetchedMembers.length > 0) {
        const membersWithId = fetchedMembers.map((member, index) => ({
        ...member,
        id: Date.now() + index, // 고유 ID 부여
      }));
        setMembers(membersWithId);
        initializeLikes(membersWithId);
      }
    }, [fetchedMembers, setMembers, initializeLikes]);

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="member-list">
      {members.map((member) => (
        <div key={member.id} className="member-card" onClick={() => setSelectedMember(member)}>
          <h3>{member.name}</h3>
          <p>포지션: {member.position}</p>
          <p>국적: {member.tags}</p>

          <button onClick={(e) => {
            e.stopPropagation();
            toggleLike(member.id)
            }}
          >
            {likes[member.id] ? '❤️' : '🤍'} {likes[member.id] || 0}
          </button>
        </div>
      ))}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
