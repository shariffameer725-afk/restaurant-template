console.log("Restaurant Website");
const button = 
document.querySelector("#menu");
const message = 
document.querySelector("#message");

button.addEventListener("click",() =>{
    message.textContent ="our popular dishes";
    message.computedStyleMap.color = "green";
});
