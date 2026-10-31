const params = new URLSearchParams(window.location.search);
const groep = params.get("groep");

console.log(groep);