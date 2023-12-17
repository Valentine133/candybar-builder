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
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((modalName) => {
        state.modals[modalName] = false;
      });
    },
  },
});

export const { openModal, closeModal, toggleModal, closeAllModals } = modalSlice.actions;
export const selectIsOpen = (modalName: string) => (state: { modal: ModalState }) =>
  state.modal.modals[modalName] || false;
export default modalSlice.reducer;
