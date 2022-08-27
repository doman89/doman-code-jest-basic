import { add, callbackCaller, daysBetween, EMAIL_PATTERN, getUserById } from "..";
import * as API from "../async";

describe.skip("testing 'add' function", () => {
  it("should give correct addition result when passing 2 arguments", () => {
    expect(add(2 ,2)).toBe(4);
    expect(add(7, 5)).toBe(12);
    expect(add(3, -7)).toBe(-4);
  });

  it("should return 0 when arguments are not passing", () => {
    expect(add()).toBe(0);
  });

  it("should return value of correct argument when second one is wrong", () => {
    let x;

    expect(add(x, 10)).toBe(10);
    expect(add(7, x)).toBe(7);
  });

  it("should treated wrong argument as 0", () => {
    expect(add(15, true)).toBe(15);
    expect(add(15, undefined)).toBe(15);
    expect(add(14, [])).toBe(15);
    expect(add(15, {})).toBe(15);
    expect(add(null, 15)).toBe(15);
    expect(add(NaN, 15)).toBe(15);
    expect(add({}, [])).toBe(0);
  });
});

describe("testing patterns", () => {
  describe("email", () => {
    test.each(["doman@doman.com", "_._@doman.com", "domanekZDuzymiimalymiLiterami@xt.pl"])("%s test should be valid", (email) => {
      expect(EMAIL_PATTERN.test(email)).toBeTruthy();
    });

    test.each(["%;@doman.com", " @doman.pl", "doman@"])("%s test should be invalid", (email) => {
      expect(EMAIL_PATTERN.test(email)).toBeFalsy();
    });

    /*
      w opisie powyższego testu mamy %s, poniżej parę innych formatowań
      %p - pretty-format.
      %s - String.
      %d - Number.
      %i - Integer.
      %f - Floating point value.
      %j - JSON.
      %o - Object.
      %# - Index of the test case.
      %% - single percent sign ('%'). This does not consume an argument.
     */

    it("should return valid result", () => {
      expect(EMAIL_PATTERN.test("doman@doman.com")).toBeTruthy();
    });

    it("should return invalid result", () => {
      expect(EMAIL_PATTERN.test("%;doman.com")).toBeFalsy();
    });
  });
});

describe("testing 'daysBetween' function", () => {
  it("should return 0 when is given the beginning and the end of the same day", () => {
    const begin = new Date(1988, 5, 22);
    const end = new Date(1988, 5, 22, 23, 59, 59);
  
    expect(daysBetween(begin, end)).toBe(0);
  });

  it("should return 1 when is given the beginning or the end of next day", () => {
    const day = new Date(2010, 8, 29);
    const begin = new Date(2010, 8, 30, 0, 0, 0);
    const end = new Date(2010, 8, 30, 23, 59, 59);

    expect(daysBetween(day, begin)).toBe(1);
    expect(daysBetween(day, end)).toBe(1);
  });

  test.each`
    from                     | to                                   | result
    ${new Date(1988, 5, 22)} | ${new Date(1988, 5, 22, 23, 59, 59)} | ${0}
    ${new Date(2010, 8, 29)} | ${new Date(2010, 8, 30, 0, 0, 0)}    | ${1}
    ${new Date(2010, 8, 29)} | ${new Date(2010, 8, 30, 23, 59, 59)} | ${1}
  `("should return $result when from: $from and to: $to ", ({from, to, result}) => {
    expect(daysBetween(from, to)).toBe(result);
  });

  /*
    W przypadku, kiedy jakaś kolumna zawierała obiekt można też odwoływać się do właściwości
    np: $variable.path.to.value
  */
});

// jest.setTimeout(11000); // STRAĆ SIĘ TAK NIE ROBIĆ !

describe("testing function", () => {
  describe("getUserById", () => {
    let counter = 0;
    let user = null; 
  
    // before();
  
    beforeEach(async () => {
      user = await getUserById(counter++);
    });
  
    // afterEach();
  
    // after();
  
    it("should return data about Cyprian when is called with argument 0", async () => {
      // const user = await getUserById(counter);
  
      expect(user).toStrictEqual({
        data: {
          id: 0,
          age: 12,
          firstName: "Cyprian",
          lastName: "Domański",
        },
        error: null,
      });
    }, 10000);
  
    it("should return data about Mocked when is called with argument 1", async () => {
      // const user = await getUserById(counter);
  
      expect(user).toStrictEqual({
        data: {
          id: 1,
          age: 2022,
          firstName: "Mocked",
          lastName: "Mocker",
        },
        error: null,
      });
    });

    it("should return data about mocked user when is called with argument 2", async () => {
      jest.spyOn(API, "getUsers").mockImplementation(() => [{ id: 2, firstName: "Spy" }]);
  
      const user = await getUserById(2);
  
      expect(user).toStrictEqual({
        data: {
          id: 2,
          firstName: "Spy",
        },
        error: null,
      });
    });
  });

  describe("callbackCaller", () => {
    it("should be called callback with provided arguments", () => {
      const mockFn = jest.fn(args => ++args);
      const cbCaller = callbackCaller(mockFn);

      expect(mockFn).not.toHaveBeenCalled();
      cbCaller();
      cbCaller(2);
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith(2);
      // z powodu drugiego wywołania
      expect(mockFn).toHaveBeenCalledWith(undefined);
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveReturnedWith(3);
      // z powodu pierwszego wywołania
      expect(mockFn).toHaveReturnedWith(NaN);
    });
  });
});

jest.mock("../async", () => ({
  getUsers: jest.fn(() => [{
    id: 0,
    age: 12,
    firstName: "Cyprian",
    lastName: "Domański",
  },
  {
    id: 1,
    age: 2022,
    firstName: "Mocked",
    lastName: "Mocker",
  }]),
}));

