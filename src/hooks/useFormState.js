import { useState } from 'react';

export default (initialValue = '') => {
  const [val, setVal] = useState(initialValue); 
  const changeVal = e => setVal(e.target.value);
  const clear = () => setVal('');
  return [val, changeVal, clear, setVal];
}