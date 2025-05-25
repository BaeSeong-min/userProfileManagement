import { create } from 'zustand';

export const useMemberStore = create((set) => ({
  members: [],
  // 배열 전체를 설정 (최초 fetch 시 사용)
  setMembers: (members) => set({ members }), 

  // 한 명 추가 (클라이언트에서 수동 추가 시 사용)
  addMember: (member) => 
    set((state) => {
      const updatedMembers = [...state.members, member]; // member는 객체
      console.log("팀원 추가됨:", updatedMembers);
      return { members: updatedMembers};
    }),
}));
