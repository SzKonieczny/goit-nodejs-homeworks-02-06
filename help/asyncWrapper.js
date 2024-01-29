const asyncWrapper = (fn) => {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (error) {
      console.log(error.message);
    }
  };
};

module.exports = asyncWrapper;
