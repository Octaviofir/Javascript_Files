const request = new XMLHttpRequest();
request.open('GET', 'https://fakestoreapi.com/products');
request.responseType = 'json';
request.send();

const createProductCard = (product) => {
    const createDiv = document.createElement('div');
    createDiv.className = 'product_Card';
    createDiv.innerHTML = `
    <div class="product-img"><img src="${product.image}"></div>
    <div class="product-body">
    <h3 class="product-title">${product.title}</h3>
    <p class="product-price">Price: $${product.price}</p>
    <button class="btn btn-add-to-cart">Add to cart</button>
    </div>
        `
    const addToCartBtn = createDiv.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product.id);
    });
    return createDiv;
};

const cart = {
    userId: 1,
    date: new Date().toISOString().split('T')[0],
    products: []
};

const addToCart = (productId) => {
    let findProduct = cart.products.find((product) => {
        return product.productId === productId;
    });
    if (!findProduct) {
        cart.products.push({ productId: productId, quantity: 1 });
    } else {
        findProduct.quantity++;
    }
    updateCart();
};

const updateCart = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/carts/7', {
            method: 'PUT',
            body: JSON.stringify(cart),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Sem ligação ao carrinho!')
        } else {
            const data = await response.json();
            console.log('Carrinho atualizado com sucesso!', data)
        }
    } catch (error) {
        console.log('Falha ao conectar com o carrinho!', error)
    }
}

request.addEventListener('load', () => {
    if (request.status >= 200 && request.status < 300) {
        const products = request.response;
        const container = document.querySelector('.container');

        products.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });

    } else {
        console.error('Erro ao carregar os dados. Status:', request.status);
    }
});
request.addEventListener('error', () => {
    console.error('Erro de rede ao carregar os dados');
});
