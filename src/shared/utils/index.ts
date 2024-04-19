import { useEffect, useState } from "react";

export function chunk<T>(arr: Array<T>, count: number) {
  const outputArr: T[][] = Array(Math.ceil(arr.length / count));
  for (let i = 0; i < outputArr.length; i++) {
      outputArr[i] = arr.slice(i * count, (i * count) + count);
  }
  return outputArr;
}

export const useDebounce = <T>(value: T, delay: number) => {
  const [outputValue, setOutputValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOutputValue(value)
    }, delay)
    return () => clearTimeout(timeoutId)
  }, [value])

  return outputValue;
}

export function birthdayFormat(date: Date) {
  const dateNum = date.getDate();
  const month = Intl.DateTimeFormat('en-EN', { month: 'long' }).format(date);
  const year = date.getFullYear();
  return `${dateNum} ${month} ${year}`;
}
