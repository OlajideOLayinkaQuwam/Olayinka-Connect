



let profileImg = document.querySelector(".nav-profile-img");
let hiddenMenu = document.querySelector(".profile-menu-wrap");
profileImg.addEventListener("click", (e) => {
  e.stopPropagation();
  hiddenMenu.classList.toggle("open-menu");
});

// this means when any of the body is click the menu list will disappear
document.body.addEventListener("click", (e) => {

  //this means if i click anyplace that is not inside  menu, then close the menu
  if (!hiddenMenu.contains(e.target)) {
    hiddenMenu.classList.remove("open-menu");
  }
});











const currentUser = {
    name: "Elizabeth Williams",
    role: `Full Stack Developer, MERN Stack(MongoDb, React.js, Node.js, Express.js)`,
    initial: ` <img src="images/user-1.webp" alt="">`
};




const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
let selectedMedia = [];
const STORAGE_KEY = "linkedin_demo_posts";

 let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

posts = posts.map(normalizePost);//this fixed old data to work with new code.normalizePost function will be apply to all post
save();




/* ================= MEDIA PREVIEW ================= */
const mediaInput = document.getElementById("mediaInput");
const mediaPreview = document.getElementById("mediaPreview");

// Handle file input
mediaInput.onchange = () => handleFiles(mediaInput.files);

// Drag & Drop events
mediaPreview.addEventListener("dragover", e => { e.preventDefault(); mediaPreview.classList.add("drag"); });
mediaPreview.addEventListener("dragleave", () => mediaPreview.classList.remove("drag"));
mediaPreview.addEventListener("drop", e => {
    e.preventDefault();
    mediaPreview.classList.remove("drag");
    handleFiles(e.dataTransfer.files);q
});





function handleFiles(files) {
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            selectedMedia.push({
                type: file.type.startsWith("image") ? "image" : "video",
                src: reader.result
            });
            renderMediaPreview();
        };
        reader.readAsDataURL(file);
    });
}






const isMobile =
  window.matchMedia("(max-width: 768px)").matches;


function renderMediaPreview(){
    mediaPreview.innerHTML = selectedMedia.length === 0
        ? "Drag & drop files here or click to select"
        : "";

    selectedMedia.forEach((m, i) => {
        const div = document.createElement("div");
        div.className = "preview-item";
        div.draggable = true;
        div.dataset.index = i;

        // ---- MEDIA ELEMENT ----
        const el = m.type === "image"
            ? document.createElement("img")
            : document.createElement("video");

        el.src = m.src;
        if(m.type === "video") el.controls = true;

        div.appendChild(el);

        // ---- REMOVE BUTTON ----
        const btn = document.createElement("button");
        btn.textContent = "✕";
        btn.onclick = () => {
            selectedMedia.splice(i, 1);
            renderMediaPreview();
        };
        div.appendChild(btn);


// ===== MOBILE REORDER BUTTONS (LINKEDIN STYLE) =====
if (isMobile) {
  const upBtn = document.createElement("button");
  upBtn.textContent = "↑";
  upBtn.onclick = () => {
    if (i === 0) return;
    [selectedMedia[i - 1], selectedMedia[i]] =
      [selectedMedia[i], selectedMedia[i - 1]];
    renderMediaPreview();
  };

  const downBtn = document.createElement("button");
  downBtn.textContent = "↓";
  downBtn.onclick = () => {
    if (i === selectedMedia.length - 1) return;
    [selectedMedia[i + 1], selectedMedia[i]] =
      [selectedMedia[i], selectedMedia[i + 1]];
    renderMediaPreview();
  };

  div.appendChild(upBtn);
  div.appendChild(downBtn);
}














        // ---- DRAG EVENTS ----
        div.addEventListener("dragstart", () => {
            dragStartIndex = i;
            div.style.opacity = "0.5";
        });
  

        div.addEventListener("dragend", () => {
            div.style.opacity = "1";
            dragStartIndex = null;
        });

      

        div.addEventListener("dragover", (e) => {
            e.preventDefault();
        });


        div.addEventListener("drop", () => {
            if(dragStartIndex === null || dragStartIndex === i) return;

            const draggedItem = selectedMedia[dragStartIndex];
            selectedMedia.splice(dragStartIndex, 1);
            selectedMedia.splice(i, 0, draggedItem);

            renderMediaPreview();
        });

        mediaPreview.appendChild(div);
    });
}









function moveMedia(i, dir) {
    const newIndex = i + dir;
    if (newIndex < 0 || newIndex >= selectedMedia.length) return;
    [selectedMedia[i], selectedMedia[newIndex]] = [selectedMedia[newIndex], selectedMedia[i]];
    renderMediaPreview();
}

/* ================= POST BUTTON ================= */
document.getElementById("postBtn").onclick = () => {
    const text = document.getElementById("postInput").value.trim();
    if (!text && selectedMedia.length === 0) return;

    posts.unshift({
        id: Date.now(),
        author: currentUser,
            content: text,
        media: [...selectedMedia],
        history:[],
        future:[],
        audit:[],
        likes: [],
        comments: [],
        shares: 0,
        createdAt: new Date()
    });



    selectedMedia = [];
    mediaPreview.innerHTML = "Drag & drop files here or click Choose file to Upload File";
    document.getElementById("postInput").value = "";
    save(); renderFeed();

        
};





const time = t => new Date(t).toLocaleString();





console.log(posts)







function createEditController(post, el) {
    let tempMedia = post.media.map(m => ({ ...m }));

    const textarea = document.createElement("textarea");
    textarea.value = post.content || "";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/,video/";
    fileInput.multiple = true;

    const preview = document.createElement("div");
    preview.className = "edit-preview";

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,107,0,1)"><path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path></svg> SAVE`;
saveBtn.className ='space'

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel Edit";

    let dragStartIndex = null;







function renderPreview() {
  preview.innerHTML = "";

  tempMedia.forEach((m, i) => {
    const box = document.createElement("div");
    box.className = "preview-item";

    let mediaEl;
    if (m.type === "image") {
      mediaEl = document.createElement("img");
      mediaEl.src = m.src;
    } else {
      mediaEl = document.createElement("video");
      mediaEl.src = m.src;
      mediaEl.controls = true;
    }

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.onclick = () => {
      tempMedia.splice(i, 1);
      renderPreview();
    };

    box.append(mediaEl, removeBtn);

    /* ================= DESKTOP DRAG ================= */
    if (!isMobile) {
      box.draggable = true;

      box.addEventListener("dragstart", () => {
        dragStartIndex = i;
        box.style.opacity = "0.5";
      });

      box.addEventListener("dragend", () => {
        box.style.opacity = "1";
        dragStartIndex = null;
      });

      box.addEventListener("dragover", e => e.preventDefault());

      box.addEventListener("drop", () => {
        if (dragStartIndex === null || dragStartIndex === i) return;

        const draggedItem = tempMedia[dragStartIndex];
        tempMedia.splice(dragStartIndex, 1);
        tempMedia.splice(i, 0, draggedItem);

        renderPreview();
      });
    }

    //.......................................  MOBILE BUTTONS (LINKEDIN STYLE) 
    
    if (isMobile) {
      const upBtn = document.createElement("button");
      upBtn.textContent = "↑";
      upBtn.onclick = () => {
        if (i === 0) return;
        [tempMedia[i - 1], tempMedia[i]] =
          [tempMedia[i], tempMedia[i - 1]];
        renderPreview();
      };

      const downBtn = document.createElement("button");
      downBtn.textContent = "↓";
      downBtn.onclick = () => {
        if (i === tempMedia.length - 1) return;
        [tempMedia[i + 1], tempMedia[i]] =
          [tempMedia[i], tempMedia[i + 1]];
        renderPreview();
      };

      box.append(upBtn, downBtn);
    }

    preview.appendChild(box);
  });
}



    fileInput.onchange = () => {
        readFiles(fileInput.files, newMedia => {
            tempMedia.push(...newMedia);
            renderPreview();
        });
    };

    saveBtn.onclick = () => {
        snapshot(post,'Edited post')
        post.content = textarea.value;
        post.media = tempMedia;
        save();
        renderFeed();
    };

    cancelBtn.onclick = renderFeed;

    el.append(textarea, fileInput, preview, saveBtn, cancelBtn);
    renderPreview();
}





function normalizePost(post) {
    if (!Array.isArray(post.history)) post.history = [];
    if (!Array.isArray(post.future)) post.future = [];
    if (!Array.isArray(post.audit)) post.audit = [];
    if (!Array.isArray(post.media)) post.media = [];
    if (!Array.isArray(post.likes)) post.likes = [];
    if (!Array.isArray(post.comments)) post.comments = [];
    return post;
}



function renderFeed() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    posts.forEach(post => {
        const el = document.createElement("div");
        el.className = "card";

        /* ========= HEADER ========= */
        const header = document.createElement("div");
        header.className = "profile";
        header.innerHTML = `
            <div class="avatar">${post.author.initial}</div>
            <div>
                <h1 class='authors'>${post.author.name}</h1><br>
        <small class='smelly'>${post.author.role}</small><br>
                <small class='smelly smaller'> ${time(post.createdAt)} </small>
            </div>
        `;
        el.appendChild(header);

        /* ========= CONTENT ========= */
        const contentContainer = document.createElement("div");
        contentContainer.className ='textPost'
        contentContainer.id = `post-content-${post.id}`;

        if (post.content) {
            const p = document.createElement("p");
            p.textContent = post.content;
            contentContainer.appendChild(p);
        }

        if (post.media && post.media.length > 0) {
            const mediaContainer = document.createElement("div");
            mediaContainer.className = "post-media-container";

            post.media.forEach(m => {
                let mediaEl;
                if (m.type === "image") {
                  const  img = document.createElement("img");
                    img.src = m.src;
                    mediaContainer.appendChild(img)
                } else {
                    mediaEl = document.createElement("video");
                    mediaEl.src = m.src;
                    mediaEl.controls = true;
                }
            });

            contentContainer.appendChild(mediaContainer);
        }

        el.appendChild(contentContainer);


    // audit...................................


        if (post.audit.length) {
    const log = document.createElement("small");
    log.className ='auditTime'
    const last = post.audit.at(-1);
    log.textContent = `Last change: ${last.action} • ${new Date(last.time).toLocaleString()}`;
    el.appendChild(log);
}

        // edit button
        const editBtn = document.createElement("button");
editBtn.textContent ='Edit'
el.appendChild(editBtn)



// -- EDIT TEXT --
const editTextarea = document.createElement("textarea");
editTextarea.value = post.content || "";
editTextarea.classList.add('hidden','text')

// ----- EDIT MEDIA INPUT -----
const editMediaInput = document.createElement("input");

editMediaInput.type = "file";
editMediaInput.accept = "image/,video/";
editMediaInput.multiple = true;
editMediaInput.classList.add('hidden');

const priviewEdit = document.createElement('button')
priviewEdit.classList.add('hidden')





        /* ========= ANALYTICS ========= */
        const analytics = document.createElement("div");
        analytics.className = "analytics";
        analytics.innerHTML = ` ${post.likes.length}   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#00b3ff"><path d="M2 8.99997H5V21H2C1.44772 21 1 20.5523 1 20V9.99997C1 9.44769 1.44772 8.99997 2 8.99997ZM7.29289 7.70708L13.6934 1.30661C13.8693 1.13066 14.1479 1.11087 14.3469 1.26016L15.1995 1.8996C15.6842 2.26312 15.9026 2.88253 15.7531 3.46966L14.5998 7.99997H21C22.1046 7.99997 23 8.8954 23 9.99997V12.1043C23 12.3656 22.9488 12.6243 22.8494 12.8658L19.755 20.3807C19.6007 20.7554 19.2355 21 18.8303 21H8C7.44772 21 7 20.5523 7 20V8.41419C7 8.14897 7.10536 7.89462 7.29289 7.70708Z"></path></svg>                                                     
  • ${post.comments.length} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#00b3ff"><path d="M8 18H18.2372L20 19.3851V9H21C21.5523 9 22 9.44772 22 10V23.5L17.5455 20H9C8.44772 20 8 19.5523 8 19V18ZM5.45455 16L1 19.5V4C1 3.44772 1.44772 3 2 3H17C17.5523 3 18 3.44772 18 4V16H5.45455Z"></path></svg> • ${post.shares}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="14" height="14" fill="#00b3ff"><path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V3L23 11L13 19V14Z"></path></svg> `;
        el.appendChild(analytics);
const line = document.createElement('hr')
line.classList ='linebreak';

el.appendChild(line)







        //...........................................................ACTIONS 
        const actions = document.createElement("div");
        actions.className = "actions";

        const likeBtn = document.createElement("button");
        likeBtn.innerHTML = `<div class="feed-post"> 
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,107,0,1)"><path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path></svg>                      
                                                    <span>Like</span>
                                </div>`;
        likeBtn.onclick = () => likePost(post.id);

        const commentBtn = document.createElement("button");
        commentBtn.innerHTML = `  <div class="feed-post">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,107,0,1)"><path d="M5.45455 15L1 18.5V3C1 2.44772 1.44772 2 2 2H17C17.5523 2 18 2.44772 18 3V15H5.45455ZM4.76282 13H16V4H3V14.3851L4.76282 13ZM8 17H18.2372L20 18.3851V8H21C21.5523 8 22 8.44772 22 9V22.5L17.5455 19H9C8.44772 19 8 18.5523 8 18V17Z"></path></svg>
                                    <span>Comment</span>
                                </div> ` ;








        commentBtn.onclick = () => openComments(post);





        editBtn.innerHTML = `     <div class="feed-post">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"  fill="rgba(255,107,0,1)"><path d="M20 3C20.5523 3 21 3.44772 21 4V5.757L19 7.757V5H5V13.1L9 9.1005L13.328 13.429L11.9132 14.8422L9 11.9289L5 15.928V19H15.533L16.2414 19.0012L17.57 17.671L18.8995 19H19V16.242L21 14.242V20C21 20.5523 20.5523 21 20 21H4C3.45 21 3 20.55 3 20V4C3 3.44772 3.44772 3 4 3H20ZM21.7782 7.80761L23.1924 9.22183L15.4142 17L13.9979 16.9979L14 15.5858L21.7782 7.80761ZM15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7Z"></path></svg>                                                    <span>Edit</span>
                                </div>`;



        editMediaInput.type ='file';
        editMediaInput.accept ='image/*,video/*';
        editMediaInput.multiple =true;





     editBtn.onclick = () => {
   el.innerHTML = '';
   editTextarea.value = post.text
   createEditController(post, el)
};


        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `     <div class="feed-post">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"  fill="rgba(255,107,0,1)"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>                                                    <span>Delete</span>
                                </div>`;
        deleteBtn.onclick = () => deletePost(post.id);

        const shareBtn = document.createElement("button");
        
       shareBtn.innerHTML = ` <div class="feed-post">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,107,0,1)"><path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path></svg>
                                    <span>Share</span>
                                </div>`
        shareBtn.onclick = () => sharePost(post.id);








        // undo and redoPost...................................................................

        const undoBtn = document.createElement("button");
undoBtn.innerHTML = ` <div class="feed-post">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,107,0,1)"><path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path></svg>                                    <span>Undo</span>
                                </div>`;
undoBtn.disabled = !post.history.length;
undoBtn.onclick = () => undoPost(post);

const redoBtn = document.createElement("button");
redoBtn.innerHTML = ` <div class="feed-post">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,107,0,1)"><path d="M18.1716 6.99955H11C7.68629 6.99955 5 9.68584 5 12.9996C5 16.3133 7.68629 18.9996 11 18.9996H20V20.9996H11C6.58172 20.9996 3 17.4178 3 12.9996C3 8.58127 6.58172 4.99955 11 4.99955H18.1716L15.636 2.46402L17.0503 1.0498L22 5.99955L17.0503 10.9493L15.636 9.53509L18.1716 6.99955Z"></path></svg>                                    <span>Redo</span>
                                </div>`;
redoBtn.disabled = !post.future.length;
redoBtn.onclick = () => redoPost(post);

        actions.append(likeBtn, commentBtn, editBtn, deleteBtn, shareBtn,undoBtn,redoBtn);
        el.appendChild(actions);





        // COMMENT.........................
        const commentBox = document.createElement("div");
        
        commentBox.id = `comment-box-${post.id}`;
        commentBox.className = "hidden, comments-box";

     

        el.appendChild(commentBox);
        feed.appendChild(el);
    });
 }





// helper

function readFiles(files, callback) {
    const media = [];
    let loaded = 0;

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = () => {
            media.push({
                type: file.type.startsWith("image") ? "image" : "video",
                src: reader.result
            });

            loaded++;
            if (loaded === files.length) callback(media);
        };

        reader.readAsDataURL(file);
    });
}




//sharePost function........................................ 

function sharePost(id) {
    const o = posts.find(p => p.id === id);
    posts.unshift({
        ...o,
        id: Date.now(),
        author: currentUser,
        likes: [],
        comments: [],
        shares: 0,
        createdAt: new Date()
        
    });

   
    o.shares++;
    save(); renderFeed();


   
}

//..........like post function.........................





function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const liked = post.likes.includes(currentUser.name);

    if (liked) {
        post.likes = post.likes.filter(u => u !== currentUser.name);
    } else {
        post.likes.push(currentUser.name);
    }

    renderFeed(); // optimistic
    save();
}


function deletePost(id) {
    posts = posts.filter(p => p.id !== id);
   save();renderFeed();
}









// addComment function................................
function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    if (!text) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    post.comments.push({
        id: Date.now(),
        user: currentUser.name,
        text: text,
        likes: [],

        time: new Date()
    });

    input.value = "";
    save();
    renderFeed();
}






let activePost = null;

function openComments(post) {
  activePost = post;

  //  SAFETY: ensure comments always exists
  if (!activePost.comments) {
    activePost.comments = [];
  }

  document
    .getElementById("commentSheet")
    .classList.remove("hidden");

  renderSheetComments();



   setTimeout(()=>{
document.getElementById('sheetInput')?.focus();
  }, 100)
}

function closeComments() {
  document
    .getElementById("commentSheet")
    .classList.add("hidden");

  activePost = null;
  renderFeed(); // keeps your counts in sync



}


function renderSheetComments() {
  const list = document.getElementById("sheetComments");
  if (!list || !activePost || !Array.isArray(activePost.comments)) return;

  list.innerHTML = "";

  activePost.comments.forEach(comment => {
    // MAIN ROW
    const row = document.createElement("div");
    row.className = "sheet-comment";

    // TEXT
    const text = document.createElement("div");


    text.innerHTML = `
    
      <h1 class='authors'>   ${comment.user}</h1>

  
  <span class='smelly'>${currentUser.role}</span>
  
    <span class="smaller">${formatTime(comment.time)}</span>

    <br><br>

  <div class="comment-text">${comment.text}</div>
`;

    // ACTIONS
    const actions = document.createElement("div");
    actions.className = "comment-actions";

    // LIKE
    const likeBtn = document.createElement("button");
    likeBtn.innerHTML = `  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#00b3ff"><path d="M2 8.99997H5V21H2C1.44772 21 1 20.5523 1 20V9.99997C1 9.44769 1.44772 8.99997 2 8.99997ZM7.29289 7.70708L13.6934 1.30661C13.8693 1.13066 14.1479 1.11087 14.3469 1.26016L15.1995 1.8996C15.6842 2.26312 15.9026 2.88253 15.7531 3.46966L14.5998 7.99997H21C22.1046 7.99997 23 8.8954 23 9.99997V12.1043C23 12.3656 22.9488 12.6243 22.8494 12.8658L19.755 20.3807C19.6007 20.7554 19.2355 21 18.8303 21H8C7.44772 21 7 20.5523 7 20V8.41419C7 8.14897 7.10536 7.89462 7.29289 7.70708Z"></path></svg> (${comment.likes?.length || 0})`;
    likeBtn.onclick = () => likeSheetComment(comment.id);




   // REPLY TOGGLE
     const replyToggle = document.createElement("button");
    const replyCount = comment.replies?.length || 0;
    replyToggle.innerHTML = replyCount ? `Replied ·${replyCount}`: `<svg xmlns="http://www.w3.org/2000/svg" width='24' height='24' viewBox="0 0 24 24" fill="#00b3ff"><path d="M11 20L1 12L11 4V9C16.5228 9 21 13.4772 21 19C21 19.2727 20.9891 19.5428 20.9677 19.81C19.5055 17.0364 16.6381 15.119 13.313 15.0053L13 15H10.9999L11 20ZM8.99986 13H10.9999L13.0341 13.0003L13.3814 13.0065C14.6657 13.0504 15.9053 13.3165 17.0568 13.7734C15.5898 12.0749 13.4204 11 11 11H9V8.16125L4.20156 12L8.99992 15.8387L8.99986 13Z"></path></svg> reply`;





    // DELETE
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  width='24' height='24'viewBox="0 0 24 24" fill="#00b3ff"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>`;
    deleteBtn.onclick = () => {
      activePost.comments = activePost.comments.filter(c => c.id !== comment.id);
      save();
      renderSheetComments();
      renderFeed();
    };

    actions.append(likeBtn, replyToggle, deleteBtn);




    
    // REPLIES LIST
    const replies = document.createElement("div");
    replies.className = "replies";

    (comment.replies || []).forEach(r => {
      const rDiv = document.createElement("div");
      rDiv.className = "reply";
      rDiv.innerHTML =` <P>${r.user}</P> <P class='smelly'>${currentUser.role}</P>   <br>  <P>${r.text} </P> `;
      replies.appendChild(rDiv);
    });




    // REPLY INPUT
    const replyBox = document.createElement("div");
    replyBox.className = "reply-box";

    const replyInput = document.createElement("input");
    replyInput.placeholder = "Write a reply…";

    const replySend = document.createElement("button");
    replySend.textContent = "Post";
    replySend.className = 'replyBtn'

    replySend.onclick = () => {
      if (!replyInput.value.trim()) return;

      comment.replies = comment.replies || [];
      comment.replies.push({
        id: Date.now(),
        user: currentUser.name,
        text: replyInput.value,
        time: Date.now()
      });

      replyInput.value = "";
      save();
      renderSheetComments();
    };

    replyBox.append(replyInput, replySend);

    // TOGGLE LOGIC (LINKEDIN STYLE)
    replyToggle.onclick = () => {
      replies.classList.toggle("show");
      replyBox.classList.toggle("show");
    };

    row.append(text, actions, replies, replyBox);
    list.appendChild(row);
  });



  console.log("comments", activePost.comments);
}



function formatTime(t) {
  return new Date(t).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short"
  });
}







document.addEventListener("click", (e) => {
  if (e.target.id !== "sheetPost") return;

  const input = document.getElementById("sheetInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  if (!activePost) return;

  if (!Array.isArray(activePost.comments)) {
    activePost.comments = [];
  }

  activePost.comments.push({
    id: Date.now(),
    user: currentUser.name,
    text,
    likes: [],
    replies: [],
    time: new Date()
  });

  input.value = "";

  save();
  renderSheetComments();
  renderFeed();
});








document.addEventListener("keydown", e => {
  const input = document.getElementById("sheetInput");
  if (!input || document.activeElement !== input) return;

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    document.getElementById("sheetPostBtn")?.click();
  }
});












function postSheetComment(e) {
  e.preventDefault();
  if (!activePost) return;

  if (!Array.isArray(activePost.comments)) {
    activePost.comments = [];
  }

  const input = document.getElementById("sheetInput");
  const text = input.value.trim();
  if (!text) return;

  const tempComment = {
    id: Date.now(),
    user: currentUser.name,
    text,
    likes: [],
    replies: [],
    time: new Date()
  };

  // 🔥 OPTIMISTIC INSERT
    input.value = "";
  activePost.comments.push(tempComment);
  save()

  renderSheetComments();
  renderFeed(); // updates count immediately


  // async-like save
  setTimeout(() => save(), 0);




// swap down on mobile.....................................................................






let startY = 0;
let endY = 0;

const sheet = document.getElementById("commentSheet");

if (sheet) {
  sheet.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  sheet.addEventListener("touchend", e => {
    endY = e.changedTouches[0].clientY;
    const delta = endY - startY;

    // swipe down threshold
    if (delta > 80) {
      closeCommentSheet();
    }
  });
}

function closeCommentSheet() {
  sheet.classList.add("hidden");
  activePost = null;
}



 }








const emojis = ["😀","😂","😍","😎","🔥","👏","💯","🎉","❤"];

document.getElementById("emojiBtn").onclick = () => {
  const input = document.getElementById("sheetInput");
  if (!input) return;

  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  input.value += emoji;
  input.focus();
};




document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sheetPostBtn").addEventListener("click", postSheetComment);

  document.getElementById("closeComments").addEventListener("click", closeComments);
});



function likeSheetComment(commentId) {
  const c = activePost.comments.find(c => c.id === commentId);
  if (!c) return;

  const name = currentUser.name;

  if (c.likes.includes(name)) {
    c.likes = c.likes.filter(n => n !== name);
  } else {
    c.likes.push(name);
  }

  save();
  renderSheetComments();
}









renderFeed();


console.log('activePost', activePost)
console.log('activePost.comments', activePost && activePost.comments)




function snapshot(post, action) {
    post.history.push({
        content: post.content,
        media: post.media.map(m => ({ ...m })),
        time: Date.now()
    });

    post.audit.push({
        user: currentUser.name,
        action,
        time: Date.now()
    });

    post.future = [];

    if (post.history.length > 30) post.history.shift();
}

function undoPost(post) {
    if (!post.history.length) return;

    post.future.push({
        content: post.content,
        media: post.media.map(m => ({ ...m }))
    });

    const prev = post.history.pop();
    post.content = prev.content;
    post.media = prev.media;

    save();
    renderFeed();
}

function redoPost(post) {
    if (!post.future.length) return;

    post.history.push({
        content: post.content,
        media: post.media.map(m => ({ ...m }))
    });

    const next = post.future.pop();
    post.content = next.content;
    post.media = next.media;

    save();
    renderFeed();
}

















