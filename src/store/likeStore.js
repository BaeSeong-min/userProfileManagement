import { create } from 'zustand';

export const useLikeStore = create((set) => ({
  // 상태: 유저 ID별 좋아요 정보 저장
  likes: {},

  // 좋아요 토글: 누르면 +1, 다시 누르면 0으로
  toggleLike: (id) =>
    set((state) => {
      const isLiked = state.likes[id] === 1;
      return {
        likes: {
          ...state.likes,
          [id]: isLiked ? 0 : 1,
        },
      };
    }),

  // 최초 members 배열을 받아 초기화. mokAPI에 각 id가 있음
  initializeLikes: (members) =>
    set(() => {
      const initial = {};
      members.forEach((m) => {
        initial[m.id] = 0;
      });
      return { likes: initial };
    }),

  // 새 유저 추가 시 개별 초기화
  addLikeEntry: (id) =>
    set((state) => ({
      likes: {
        ...state.likes,
        [id]: 0,
      },
    })),
}));
