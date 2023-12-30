
async function getCategories() {
  const res =  fetch("http://localhost:3000/api/categories").then((r) => {
    return r.json()
  })
  .then((obj) => console.log(obj))
}

const r = getCategories()
console.log(r)

fetch("http://localhost:3000/api/categories").then((r) => {
    return r.json()
  })
  .then((obj) => console.log(obj))