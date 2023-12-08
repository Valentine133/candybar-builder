import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  modals: Record<string, boolean>;
}

const initialState: ModalState = {
  modals: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalName } = action.payload;
      state.modals[modalName] = true;
    },
    closeModal: (state, action) => {
      const { modalName } = action.payload;
      state.modals[modalName] = false;
    },
    toggleModal: (state, action) => {
      const { modalName } = action.payload;
      state.modals[modalName] = !state.modals[modalName];
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export const selectIsOpen = (modalName: string) => (state: { modal: ModalState }) =>
  state.modal.modals[modalName] || false;
export default modalSlice.reducer;
