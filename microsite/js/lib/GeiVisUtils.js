export let __hotReload = true;

export function checkPartialOverflow (el, min) {
    if ( el.offsetHeight < min || el.offsetWidth < min ) {
      return "overflow";
    } else {
      if ( el.offsetHeight < el.scrollHeight || el.offsetWidth < el.scrollWidth) {
        return "partial-overflow";
      } else {
        return "no-overflow";
      }
    }
}

export function checkOverflow (el) {
    if ( el.offsetHeight < el.scrollHeight || el.offsetWidth < el.scrollWidth) {
      return "overflow";
    } else {
      return "no-overflow";
    }
}

export function makeSafeForCSS (name) {
  return name.replace(/[^a-z0-9]/g, function(s) {
      var c = s.charCodeAt(0);
      if (c == 32) return '-';
      if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
      return '__' + ('000' + c.toString(16)).slice(-4);
  });
}


// have the size of the hierarchy at each level
export function countValues (major) {
  let c = 0; major.forEach ( minor => { minor.values == undefined ? c++ : c+= countValues(minor.values); }); return c;
}


// this takes a nested map and returns in treemap compatible format
export function remap (root) {
  let newElement = {name : root.key};
  if (root.values) {
    newElement.size = countValues(root.values);
    newElement.children = root.values.map( value => {
      if (value.values) { 
        return remap(value)
      } else {
        value.size = 1;
        return value;
      }
    });
  }
  return newElement;
}