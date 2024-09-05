import { User } from '../Component/userInterface';

export interface State {
    users: User[];
    selectedUsers: User[];
}

export type Action =
   { type: 'SAVE'; payload: User[] }
  | { type: 'SELECT'; payload: User }
  | { type: 'DESELECT'; payload: User }
  | { type: 'REMOVE'; payload: string[] };


export const initialState: State = {
    users: [],
    selectedUsers: [],
};

export const userReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SAVE':
            return { ...state, users: action.payload };
        case 'SELECT':
            return { ...state, selectedUsers: [...state.selectedUsers, action.payload] };
        case 'DESELECT':
            return {
                ...state,
                selectedUsers: state.selectedUsers.filter(user => user._id !== action.payload._id),
            };
        case 'REMOVE':
            return {
                ...state,
                users: state.users.filter(user => !action.payload.includes(user._id)),
                selectedUsers: [],
            };
        default:
            return state;
    }
};
