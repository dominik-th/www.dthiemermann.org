export const TOGGLE_NAVBAR = 'TOGGLE_NAVBAR';
export function toggleNavBar() {
  return {
    type: TOGGLE_NAVBAR,
  }
}

export const EXPAND_NAVBAR = 'EXPAND_NAVBAR';
export function expandNavBar() {
  return {
    type: EXPAND_NAVBAR,
  }
}

export const COLLAPSE_NAVBAR = 'COLLAPSE_NAVBAR';
export function collapseNavBar() {
  return {
    type: COLLAPSE_NAVBAR,
  }
}
