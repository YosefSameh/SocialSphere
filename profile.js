// ====== fetch elements ===========
let collectposts = document.querySelector(".collect-posts")
let nameUser = document.getElementById("name") 
let username = document.getElementById("username") 
let emailUser = document.getElementById("email")  
let countCommunt = document.getElementById("count-communt") 
let countPosts = document.getElementById("count-posts") 
let imgProfile = document.getElementById("img-profile") 
let btnDelet = document.getElementById("btn-delet") 
let modelDelet = document.getElementById("model-Delet") 
// ====== fetch elements ===========


let urlparmes = new URLSearchParams(window.location.search)
let id = urlparmes.get("postid")
let idUser 

if (id != null) {
    idUser = id
}else{
    idUser = localStorage.getItem("idUser")
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

let showUserdetiles  = ()=>{
    toggleloder(true)
    axios.get(`https://tarmeezacademy.com/api/v1/users/${idUser}`)
    .then((respons)=>{
        toggleloder(false)
    let user = respons.data.data
    console.log(user);
    nameUser.innerHTML = user.name
    username.innerHTML = user.username
    emailUser.innerHTML = user.email
    countCommunt.innerHTML = user.comments_count
    countPosts.innerHTML = user.posts_count
    imgProfile.src = user.profile_image
    
})


}
showUserdetiles ()

let showPostsUser = ()=>{
    toggleloder(true)
    axios.get(`https://tarmeezacademy.com/api/v1/users/${idUser}/posts`)
    .then((response)=>{
        let postsUser = response.data.data
        collectposts.innerHTML = ""
        let EditAndDeleteBtnContent = ``
        for(post of postsUser){

            if(localStorage.getItem("name") == post.author.name){
                EditAndDeleteBtnContent = `
                <button class="me-4 bg-danger" onclick="ShowAlertDelet(${post.id})" data-bs-toggle="modal" data-bs-target="#model-Delet" data-bs-whatever="@fat">Delet</button>
                `
            }else{
                EditAndDeleteBtnContent  = ``
            }

            collectposts.innerHTML +=`
            <div class="mb-5 div-post"   >
                    <div class="d-flex p-2  align-items-center ">
                    <img  class="imgporfile" src=${post.author.profile_image}>
                    <h5 class="ms-3">${post.author.username}</h5>
                    <div class="d-flex justify-content-end" style="width:84%" id="edit" >
                    ${EditAndDeleteBtnContent}     

                    </div>
                    </div>

                    <div  style="cursor: pointer;" onclick="gothePostDetiles(${post.id})">

                    <div class="" >
                    <img class="w-100" style="border-radius: 7px;"  src=${post.image} alt="">
                    </div>
                    <div class="mt-2 ms-3">
                    <p style="color: #6c6c6c;">${post.created_at}</p>
                    <p class="fw-bold"> ${post.body}</p>
                    <hr>
                    <p>(${post.comments_count}) Comments</p>
                    </div>
                    
                    </div>
                    </div>
                    `
                }
                
                
            })
            .finally(()=>{
                toggleloder(false)
            })
        }
    

        showPostsUser()
let gothePostDetiles = (id)=>{
    window.location = `postdetiles.html?postid=${id}`
}


let idpost
    let ShowAlertDelet = (id)=>{
        idpost = id
    }
    btnDelet.onclick = ()=>{
        let config = {
            headers:{
                "AUTHORIZATION":`Bearer ${localStorage.getItem("tokens")}`}
            }
            toggleloder(true)
        axios.delete(`https://tarmeezacademy.com/api/v1/posts/${idpost}`,config)
        .then((respons)=>{
            
            const hidenmodel = bootstrap.Modal.getInstance(modelDelet) 
                hidenmodel.hide()
            showPostsUser()
            showUserdetiles()
        })
        .finally(()=>{
            toggleloder(false)
        })
    }



