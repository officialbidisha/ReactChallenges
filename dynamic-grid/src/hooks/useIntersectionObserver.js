import { useCallback, useRef } from "react";

const useIntersectionObserver = (deps, callback) =>{
    let observer = useRef();

    const ref = useCallback((node)=>{
        if(deps.every(Boolean)){
        if(observer.current.observe){
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting){
                callback();
            }
        })
        observer.observe(node);
    }
    },[deps, callback])

    return ref;
}

export default useIntersectionObserver;