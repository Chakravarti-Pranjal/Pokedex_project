
const useDebounce = (cb, delay = 2000) => {
    let timerid ;

    // setTimeout(() => {
    //     clearInterval(timerid);
    // },delay);

  return (...args) => {
    clearTimeout(timerid) ;
    timerid = setTimeout(() => {
        cb(...args);
    }, delay)
  }
}

export default useDebounce
