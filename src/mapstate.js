import create from 'zustand'

export const mapState = create(set => ({
  width: 700,
  updateWidth: value => set({ width: value }),
  height: 700,
  updateHeight: () => set(state => ({ width: state.height })),
}))