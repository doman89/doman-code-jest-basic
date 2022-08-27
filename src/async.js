export async function getUsers() {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      {
        id: 0,
        age: 12,
        firstName: "Cyprian",
        lastName: "Domański",
      },
      {
        id: 1,
        age: 6,
        firstName: "Aleksander",
        lastName: "Domański",
      },
      {
        id: 2,
        age: 6,
        firstName: "Wiktor",
        lastName: "Domański",
      },
    ]), 9500);
  })
}