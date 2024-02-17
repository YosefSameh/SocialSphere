

let logout = document.getElementById("logout")
// elements alert 
let alert = document.getElementById("alert")
let contentAlert = document.getElementById("content-alert")
// elements alert 
//==============Login
let login = document.getElementById("login")
let usernameLogin = document.getElementById("recipient-name")
let passwordLogin = document.getElementById("message-text")
let sudmitLogin = document.getElementById("sudmit-login")
let btnlogin = document.getElementById("btn-login")
let modelLogin = document.getElementById("model-login")
let divCreate = document.getElementById("div-create")
//==============Login   

//=============Signin
let signin = document.getElementById("signin")
let modelSignin = document.getElementById("model-signin")
let btnSignin = document.getElementById("btn-signin")
let emailSignin = document.getElementById("email-signin")
let passwordSignin = document.getElementById("password-signin")
let usernameSignin = document.getElementById("username-signin")
let imgproSingin = document.getElementById("imgpro-singin")
let nameSignin = document.getElementById("name-signin")
//=============Signin

let collectposts = document.querySelector(".collect-posts")
let loader = document.getElementById("loader")

//=============
//=============Create
let btnCreate = document.getElementById("btn-create")
let titleCreate = document.getElementById("title-create")
let imgCreate = document.getElementById("img-create")
modelCreate = document.getElementById("model-create")
//=============Create

//=============Edit
let titleEdit = document.getElementById("title-edit")
let imgEdit = document.getElementById("img-edit")
let btnEdit = document.getElementById("btn-edit")
let modelEdit = document.getElementById("model-Edit")
//=============Edit

//=============Delet
let btnDelet = document.getElementById("btn-delet")
let modelDelet = document.getElementById("model-Delet")
//=============Delet



let yosef = () => {
    toggleloder(true)
    axios.get("https://tarmeezacademy.com/api/v1/posts?limit=100")
    .then((respons)=>{
        const posts = respons.data.data
        collectposts.innerHTML = ""
        let EditAndDeleteBtnContent = ``
        
        for(post of posts){
            
            if(localStorage.getItem("name") == post.author.name){
                EditAndDeleteBtnContent = `
                <button class="me-4 bg-danger" onclick="ShowAlertDelet(${post.id})" data-bs-toggle="modal" data-bs-target="#model-Delet" data-bs-whatever="@fat">Delet</button>
                <button  data-bs-toggle="modal" data-bs-whatever="@fat" data-bs-target="#model-Edit" onclick="EditPost('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>
                `
            }else{
                EditAndDeleteBtnContent  = ``
            }
            showalert(false)
            collectposts.innerHTML +=`
            <div class="div-post mb-5"   >
            <div class="d-flex p-2  align-items-center " >
            <div class="d-flex p-2  align-items-center "style="cursor: pointer;"  onclick="showDetilesUser(${post.author.id})">
            <img  class="imgporfile" style="height:35px; width:35px;" src=${post.author.profile_image}>
            <h5 class="ms-3">${post.author.username}</h5>
            </div>
            
                    <div class="d-flex justify-content-end" style="width:84%" id="edit" >
                    ${EditAndDeleteBtnContent}     
                    </div>
                    </div>
                    
                    <div style="cursor: pointer;" >
                    <div class="" onclick="gothePostDetiles(${post.id})" >
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
            .catch((error)=>{
                let errorMessage = error.response.data.message
                showalert(true,errorMessage)
                
                
            })
            .finally(()=>{
                toggleloder(false)
            })
        }
        
        
        let gothePostDetiles = (id)=>{
            window.location = `postdetiles.html?postid=${id}`
            
        }
        let showDetilesUser = (id)=>{
            window.location = `profile.html?postid=${id}`
            
        }

    // =========  Loader  ============
    
    let toggleloder = (show)=>{
        if (show) {
            loader.style.display = "flex"
            
        }else{
            
            loader.style.display = "none"
        }
    }
    
    // =========  Loader  ============
    
    // ====== Edit Post fun ========
    let postobj
    let EditPost = (post)=>{
        postobj = JSON.parse(decodeURIComponent(post))
        titleEdit.value = postobj.body
        // imgEdit.files = postobj.image
    }
    
    btnEdit.onclick = ()=>{
        let formdataToedite = new FormData()
        formdataToedite.append("body",titleEdit.value)
        formdataToedite.append("image",imgEdit.files[0])
        let config = {
            headers:{
                "AUTHORIZATION":`Bearer ${localStorage.getItem("tokens")}`}
            }
            toggleloder(true)
            formdataToedite.append("_method","put")
            axios.post(`https://tarmeezacademy.com/api/v1/posts/${postobj.id}`,formdataToedite,config)
            .then((respons)=>{
                yosef()
                const hidenmodel = bootstrap.Modal.getInstance(modelEdit) 
                hidenmodel.hide()
                showalert(false)
            })
            .catch((error)=>{
                let errorMessage = error.response.data.message
                showalert(true , errorMessage)
                

                
            })
            .finally(()=>{
                toggleloder(false)
            })
    }
    // ====== Edit Post fun ========
    
    
    
    // ====== Delet Post fun ========
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
            yosef()
        })
        .finally(()=>{
            toggleloder(false)
        })
    }
    // ====== Delet Post fun ========

    
btnlogin.onclick = (e)=>{
    e.preventDefault()
        
    const body = {
    "username":usernameLogin.value,
    "password":passwordLogin.value,
    }  
    toggleloder(true)
            axios.post("https://tarmeezacademy.com/api/v1/login",body)
            .then((respons)=>{
                token = respons.data.token
                let nametheuser = respons.data.user.name
                let username = respons.data.user.username
                let imgProfile = respons.data.user.profile_image
                let idUser = respons.data.user.id
                // set item in storge
                localStorage.setItem("name",nametheuser)
                localStorage.setItem("tokens",token)
                localStorage.setItem("idUser",idUser)
                localStorage.setItem("username",username)
                localStorage.setItem("imgProfile",imgProfile)
                // set item in storge
                
                if (token != "") {
                    yosef()
                checkeUserlogin()
                const hidenmodel = bootstrap.Modal.getInstance(modelLogin) 
                hidenmodel.hide()
                showalert(false)
                
            }
        })
        .catch((error)=>{
            let errorMessage = error.response.data.message
            showalert(true,errorMessage)
            
            
        })
        .finally(()=>{
            toggleloder(false)
        })
    }
    


let checkeUserlogin = ()=>{
    if (localStorage.getItem("tokens") != null) {
        
        signin.style.display = "none"
        login.style.display = "none"
        logout.style.display = "block"
        divCreate.style.display = "block"
    }
    
}

checkeUserlogin()

logout.onclick = (e)=>{
    e.preventDefault()
    localStorage.clear()
    signin.style.display = "block"
    login.style.display = "block"
    logout.style.display = "none"
    divCreate.style.display = "none"
    yosef()

}
// =============== event onclick signin

btnSignin.onclick = (e)=>{
    e.preventDefault()
    let formdatesingin = new FormData()
    formdatesingin.append("email",emailSignin.value)
    formdatesingin.append("password",passwordSignin.value)
    formdatesingin.append("username",usernameSignin.value)
    formdatesingin.append("image",imgproSingin.files[0])
    formdatesingin.append("name",nameSignin.value)
    toggleloder(true)
    axios.post("https://tarmeezacademy.com/api/v1/register",formdatesingin)
    .then((respons)=>{
    
        const hidenmodel = bootstrap.Modal.getInstance(modelSignin) 
        hidenmodel.hide()
        showalert(false)
        let idUser = respons.data.user.id
        let tokenSignin = respons.data.token
        let nametheuser = respons.data.user.username
        localStorage.setItem("name",nametheuser)
        localStorage.setItem("tokens",tokenSignin)
        localStorage.setItem("idUser",idUser)
        checkeUserlogin()
        yosef()
    })
    .catch((error)=>{
        let errorMessage = error.response.data.message
        showalert(true,errorMessage)
        

        
    })
    .finally(()=>{
        toggleloder(false)
    })
}

btnCreate.onclick = ()=>{
    
    let tokenwithlocla = localStorage.getItem("tokens")
    let formdata = new FormData()
    formdata.append("body",titleCreate.value)
    formdata.append("image",imgCreate.files[0])
    let config = {
        headers:{
            "AUTHORIZATION":`Bearer ${tokenwithlocla}`}
        }
        toggleloder(true)
        axios.post("https://tarmeezacademy.com/api/v1/posts",formdata ,config)
        .then((respons)=>{
            
            
            yosef()
            const hidenmodel = bootstrap.Modal.getInstance(modelCreate) 
            hidenmodel.hide() 
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
    yosef() 