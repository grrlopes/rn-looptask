
// interface SmallLargeState {
//   itemSmall: number | undefined;
//   itemLarge: number | undefined;
//   setSmallAndLarge: (small: number | undefined, large: number | undefined) => void;
// }

// export const useLabeledStore = create<SmallLargeState>((set) => ({
//   itemSmall: undefined,
//   itemLarge: undefined,
//   setSmallAndLarge: (small, large) => set({ itemSmall: small, itemLarge: large }),
// }));

// type Store = {
//   smallCount: number,
//   largeCount: number,
//   setSmallAndLarge: (small: number | undefined, large: number | undefined) => void;
// }

// const useStore = create<Store>((set) => ({
//   smallCount: 0,
//   largeCount: 0,
//   setSmallAndLarge(small: number | undefined, large: number | undefined) {
//     set((state) => ({
//       ...state,
//       smallCount: small,
//       largeCount: large,
//     }));
//   },
// }))
import { create } from 'zustand';

// Define types for state values and actions separately
type Item = {
  id: string;
  small: number;
  large: number;
};

type State = {
  smallCount: number;
  largeCount: number;
  items: Item[];
};

type Actions = {
  addSmall: (qty: number) => void;
  addLarge: (qty: number) => void;
  reset: () => void;
  addItem: (item: Item) => void;
  updateItem: (id: string, small: number, large: number) => void;
  removeItem: (id: string) => void;
  getItemById: (id: string) => Item | undefined;
};

// Define the initial state
const initialState: State = {
  smallCount: 0,
  largeCount: 0,
  items: [],
};

// Create store
const useStoreLabel = create<State & Actions>((set, get) => ({
  ...initialState,
  addSmall: (qty: number) => {
    set((state) => ({ smallCount: state.smallCount + qty }));
  },
  addLarge: (qty: number) => {
    set((state) => ({ largeCount: state.largeCount + qty }));
  },
  reset: () => {
    set(initialState);
  },
  addItem: (item: Item) => {
    set((state) => ({ items: [...state.items, item] }));
  },
  updateItem: (id: string, small: number, large: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, small, large } : item
      ),
    }));
  },
  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  getItemById: (id: string) => {
    return get().items.find((item) => item.id === id);
  },
}));

export default useStoreLabel;

