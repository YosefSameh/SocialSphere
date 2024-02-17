
// fetch elements
let postDetiles = document.querySelector(".post-Detiles")
let alert = document.getElementById("alert")
let contentAlert = document.getElementById("content-alert")
// fetch elements


// fetch Id Posts
let urlparmes = new URLSearchParams(window.location.search)
let id = urlparmes.get("postid")
console.log(postDetiles);
// fetch Id Posts



let showpostdetiles = ()=>{
    
    toggleloder(true)
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
    .then((respons)=>{
        toggleloder(false)
        // ======
        let  post = respons.data.data
        const comment = post.comments
        // ======

        // ==== loop on comments ======
        let comentdiv = ``
        for(com of comment){
            console.log(com);
            comentdiv +=`
            <div class="mt-2 ms-3">
            <hr>
            <div class="w-100 d-flex   ">
            <img src="${com.author.profile_image}" alt="" style="width: 40px; height: 30px; border-radius: 50%;">
            <div class="p-2 ms-2" style="background-color: #eee; border-radius: 15px; width: fit-content;">
            <p class="ms-2">${com.author.name}</p>
            <p class="m-0">${com.body}</p>
            </div>
            </div>
            </div>
            `
        }
        // ==== loop on comments ======

        // ==== show post =====
        postDetiles.innerHTML = ""
        postDetiles.innerHTML += `
        <div class="" >
        <div class="d-flex p-2  align-items-center ">
        <img  class="imgporfile" src=${post.author.profile_image}>
        <h5 class="ms-3">${post.author.username}</h5>
        </div>
        <div class="">
        <img class="w-100" style="border-radius: 7px;"  src=${post.image} alt="">
        </div>
        <div class="mt-2 ms-3">
        <p style="color: #6c6c6c;">${post.created_at}</p>
        <p class="fw-bold"> ${post.body}</p>
        <hr>
        <p>(${post.comments_count}) Comments</p>
        </div>
        <div>
        ${comentdiv}
        </div>
        <div class="w-100 d-flex my-4 justify-content-center align-items-center div-comment "   id="div-comment" style="position: relative;">
                <input class="w-100 py-3 px-3" id="inp-comment" placeholder="Add Comment" style="height: 25px; border-radius: 15px; border-color: transparent; background-color: #eee; outline: none;" type="text">
                <div class="" onclick="commenadd()" style="position: absolute; position: absolute; right: 15px; top: 6px;" id="addcomments">
                    <i class="fa-solid fa-location-arrow" style="transform: rotate(47deg); font-size: 23px; cursor: pointer;"></i>
                    </div>
                    </div>
                    
                    
                    </div>
                    ` 
                    // ==== show post =====
    })
}



let commenadd = ()=>{
    let inpComment = document.getElementById("inp-comment").value
    // Send params body and token
    let body = {"body": inpComment}
    let config = {headers:{"AUTHORIZATION" : `Bearer ${localStorage.getItem("tokens")}`}}
    // Send params body and token
    toggleloder(true)
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,body,config)
    .then((respons)=>{
        console.log(respons);
        showpostdetiles()
        showalert(false)
    })
    .catch((error)=>{
        let errorMessage = error.response.data.message
        showalert(true,errorMessage)
        
    })
    .finally(()=>{
        toggleloder(false)
    })


    

}

    // =========== Loader ===========
    let loader = document.getElementById("loader")
    let toggleloder = (show)=>{
        if (show) {
            loader.style.display = "flex"
            
        }else{
            
            loader.style.display = "none"
        }
    }
    // =========== Loader ===========


    // ===== alert ====== 
    let showalert = (show , content)=>{
        if (show == true) {
            alert.style.display = "block"
            contentAlert.innerHTML = content

        }else{
            
            alert.style.display = "none"
        }
    }
    // ===== alert ====== 

showpostdetiles()
