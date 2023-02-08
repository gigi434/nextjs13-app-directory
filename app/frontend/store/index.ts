// 認証とタスク両方の値を管理するグローバルステートと関数を定義する
import create from 'zustand'

type EditedTask = {
  id: string
  title: string | null
}

type LoginUser = {
  id: string | undefined
  email: string | undefined
}

// 関数とグローバルステートの型を定義する
type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
  loginUser: LoginUser
  updateLoginUser: (payload: LoginUser) => void
  resetLoginUser: () => void
}

const useStore = create<State>((set) => ({
  editedTask: { id: '', title: '' },
  updateEditedTask: (payload) => set({ editedTask: payload }),
  resetEditedTask: () => set({ editedTask: { id: '', title: '' } }),
  loginUser: { id: '', email: '' },
  updateLoginUser: (payload) => set({ loginUser: payload }),
  resetLoginUser: () => set({ loginUser: { id: '', email: '' } }),
}))
export default useStore
