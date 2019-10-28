console.log('maiaiain');

let s0 = {};

/**
 * Element 가져오는 함수입니다.
 */
function elm(elm) {
  let target = document.querySelectorAll(elm);
  if (target.length === 0) return null;
  if (target !== undefined || target !== null) {
    return (target.length === 1) ? target[0] : target;
  } else {
    return null;
  }
}

function exist(elm) {
  let target = document.querySelectorAll(elm);
  return (target.length === 0) ? false : true;
}

s0.elm = elm;
s0.exist = exist;
