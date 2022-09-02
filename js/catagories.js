const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
    .catch(error=>console.log(error))
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('category-container');
    console.log(categories)
    categories.forEach(category => {
        const divCategory = document.createElement('div');
        // divCategory.classList.add('d-flex');
        divCategory.innerHTML = `
   
     <button class="btn btn-info mx-md-3 mx-1 my-1 hover:bg-dark" onclick="loadNewsDetails('${category.category_id}')">
     ${category.category_name}</button>
        `; 
        categoriesContainer.append(divCategory);
        
    });
}

const loadNewsDetails = (code) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${code}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetailsNews(data.data))
        .catch(error => console.log(error))
    toggleLoader(true);
}

const displayDetailsNews = (newses) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    // console.log(newses)
    newses.forEach(news => {
        const newsDiv = document.createElement('news-div');
        newsDiv.classList.add('col');
        // newsDiv.classList.add('ms-5');
        newsDiv.innerHTML = `
           <div class="card mb-3" style="max-width: 800px;" id="card-box">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${news.title}</h5>
                                    <p class="card-text " id="elip">${news.details}</p>
                                    
                                </div>
                                  <div class="card-body d-md-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <div><img src="${news.author.img}" alt="" width="38" height="38" class="mt-1 me-2"></div>
                                <div>
                                    <small>${news.author.name ? news.author.name : 'no author'}</small> <br>
                                    <small>${news.author.published_date ? news.author.published_date: 'no date found'}</small>
                                </div> 
                            </div>
                            <div class="d-flex">
                                <div><img src="images/view.png" alt="" width="20" height="20"></div>
                                <div>
                                    <span class="ms-2 mt-1 fw-bold">${news.total_view ? news.total_view :'no data'}</span>
                                </div>
                            </div>
                            <div class="mx-2">
                            <i class="fa-solid fa-star fs-6"></i>
                            <i class="fa-solid fa-star fs-6 "></i>
                            <i class="fa-solid fa-star fs-6"></i>
                            <i class="fa-solid fa-star fs-6"></i>
                            <i class="fa-regular fa-star fs-6"></i>
                    
                            </div>
                            <div class="align-text-end">
                                <div><img onclick="loadNewsModal('${news._id}')" src="images/options.png" alt="" width="38" height="38" data-bs-toggle="modal" data-bs-target="#exampleModal"></div>
                            </div>

                            <div></div>

                        </div>

                            </div>
                        </div>
                    </div>
        `;
        newsContainer.append(newsDiv);
        toggleLoader(false)

    });
}
const loadNewsModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsModal(data.data[0]))
        .catch(error => console.log(error))
    
}

const displayNewsModal = (news) => {
    const newsTitle = document.getElementById('NewsModalLabel');
    newsTitle.innerText = news.title;
    const newsBody = document.getElementById('newsBody');
    newsBody.innerHTML = `
    <p class="card-text overflow-auto">${news.details}</p>
    <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
    <hr>
         <div class="card-body d-md-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <div><img src="${news.author.img}" alt="" width="38" height="38" class="mt-1 me-2"></div>
                                <div>
                                    <small>${news.author.name ? news.author.name : 'no author'}</small> <br>
                                    <small>${news.author.published_date ? news.author.published_date : 'no date found'}</small>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div><img src="images/view.png" alt="" width="20" height="20"></div>
                                <div>
                                    <span class="ms-2 mt-1 fw-bold">${news.total_view ? news.total_view : 'no data'}</span>
                                </div>
                            </div>
                            <div class="">
                                <div><span class="ms-2 mt-1 fw-bold">Ratings: ${news.rating.number ? news.rating.number : 'no data'}(${news.rating.badge})</span></div>

                            </div>
        </div>

    `;
}
// loadNewsModal();

const toggleLoader = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else { loader.classList.add('d-none'); }
}

loadCategories();