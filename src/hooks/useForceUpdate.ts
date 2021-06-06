import { useReducer } from 'react';

const useForceUpdate = () => useReducer(val => !val, false)[1];

export default useForceUpdate;
