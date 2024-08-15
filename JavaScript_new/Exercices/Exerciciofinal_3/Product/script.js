const request = new XMLHttpRequest();
request.open('GET', 'https://fakestoreapi.com/products/14');
request.responseType = 'json';
request.send();

const createProduct = (product) => {
const productContainer = document.querySelector('.product_container');
productContainer.innerHTML = `        
            <div class="product_image">
                <img src="${product.image}"/>
            </div>
            <div class="product_info">
            <div class="product_title">
                <h2>${product.title}</h2>
            </div>
               <div class="product_category">
                <p>${product.category}</p>
            </div>
              <div class="product_description">
                  <p>${product.description}</p>
            </div>
              <div class="product_price">
                <h3>${product.price}€</h3>
            </div>
              <div class="product_rating">
                  <p>${product.rating.count}</p>
                 <p>${product.rating.rate}</p>
            </div>
            <div
       `
       return productContainer;
       
};
 
const relatedProducts = (product) => {
    const relProductsContainer = document.querySelector('.related_products');
    const relProductCard = document.createElement('div');
    relProductCard.className = 'rel_product_card';
    relProductCard.innerHTML = `
       <div class="rel_product_title">
                <img src="${product.image}"/>
            </div>
            <div class="rel_product_title">
                <h2>${product.title}</h2>
            </div>
               <div class="rel_product_category">
                <p>${product.category}</p>
            </div>
              <div class="rel_product_title">
                  <p>${product.description}</p>
            </div>
              <div class="rel_product_price">
                <h3>${product.price}€</h3>
            </div>
              <div class="rel_product_rating">
                  <p>${product.rating.count}</p>
                 <p>${product.rating.rate}</p>
            </div>
    `
    relProductsContainer.appendChild(relProductCard);
}
 
const loadRelatedProducts = async () => {
    try {
    const response = await fetch('https://fakestoreapi.com/products/category/jewelery');
    const relProductsData = await response.json();
    
    const threeProducts = relProductsData.slice(1,4);
    threeProducts.forEach((product) => {
       relatedProducts(product);
    });
} catch (error) {
        console.error('Erro ao carregar produtos relacionados')
    }
};

request.addEventListener('load', () => {
    if (request.status >= 200 && request.status <= 300) {
        const product = request.response;
        createProduct(product);
    } else {
        console.error('Erro ao carregar informações do produto!');
    }
});

loadRelatedProducts();

const dateFooter = new Date();
const textFooter = document.querySelector('.copywrite')
textFooter.textContent = `Copyright ${dateFooter.getFullYear()}`;
