import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {debounce} from "lodash";

export function useLatest(value){
    const valueRef = useRef(value);

    useLayoutEffect(()=>{
        valueRef.current = value
    },[value])

    return valueRef;
}

export function useDebounceWithUseLatest(callback, delay) {
    const latestCb = useLatest(callback);
    return useMemo(() => debounce((...args) => latestCb.current(...args), delay), [delay, latestCb]);
}

export function makeDebouncedHook(func) {
    return function useDebounceWithUseLatest(callback, delay){
        const latestCb = useLatest(callback);
        const debouncedFunc =  useMemo(() => func((...args) => latestCb.current(...args), delay), [delay, latestCb]);

        useEffect(()=>{
            return ()=> debouncedFunc.cancel()
        },[debouncedFunc])

        return debouncedFunc
    };
}


export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 500);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debouncedValue;
}
