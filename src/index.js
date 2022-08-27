import { getUsers } from "./async";

export function add(firstNumber, secondNumber) {
  // const isFirstNumberCorrect = typeof firstNumber === "number";
  // const isSecondNumberCorrect = typeof secondNumber === "number";

  // const firstValue = isFirstNumberCorrect && !isNaN(firstNumber) ? firstNumber : 0;
  // const secondValue = isSecondNumberCorrect && !isNaN(secondNumber) ? secondNumber : 0;

  return returnNumberOr0(firstNumber) + returnNumberOr0(secondNumber);
}

function returnNumberOr0(number) {
  if (typeof number !== "number" || isNaN(number)) {
    return 0;
  }

  return number;
}

export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ONE_DAY_IN_MS = 86_400_000;

export function daysBetween(startDay, endDay) {
  return Math.floor(
    Math.abs((Number(startDay) - Number(endDay)) / ONE_DAY_IN_MS)
  );
}

export async function getUserById(id) {
  if (typeof id !== "number" || isNaN(id)) {
    return { data: null, error: "Provided argument has wrong type of data" };
  }

  const users = await getUsers();
  const user = users.find(user => user.id === id);

  if (!user) {
    return { data: null, error: `There is no user with id: ${ id }` };
  }

  return { data: user, error: null };
}

export function callbackCaller(callback) {
  return function (someArguments) {
    return callback(someArguments);
  }
}