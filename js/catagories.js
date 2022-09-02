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
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                        additional
                                        content. This content is a little bit longer.</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        newsContainer.append(newsDiv);

    });
}

loadCategories();