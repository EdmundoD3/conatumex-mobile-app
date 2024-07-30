import { ExecutionInProgressError } from "../error/typeErrors";

//con eventManagger evitamos que se realicen multiples peticiones repetidas
const eventManager = (fn, delay = 3000) => {
  let executing = false;
  return async (...args) => {
    if (!executing) {
      executing = true;
      try {
        await fn(...args);
      } catch (error) {
        throw new ExecutionInProgressError(error)
      } finally {
        setTimeout(() => executing = false, delay);
      }
    }
  };
};

export {eventManager}