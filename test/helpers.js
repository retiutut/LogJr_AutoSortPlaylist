/*
const isValidJSON = (jsonString) => {
  try {
    const o = JSON.parse(jsonString);
    // eslint-disable-next-line no-console
    console.log(o);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Not a valid JSON file.');
  }

  return false;
};
*/

// ES2015
const isAO = val => (!!(val instanceof Array || val instanceof Object));

export default isAO;
