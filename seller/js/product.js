export const fetchProducts = async() =>{
    const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      // call api and get posts
      try {
        const response = await fetch(
          "http://localhost:8000/api/products/viewseller",
          requestOptions
        );
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
    
        const products = await response.json(); // Assuming the API returns JSON
        console.log(products);
        const productContainer = document.getElementById('product-list-section');
        productContainer.innerHTML='';
        if(products.length===0){
            productContainer.innerHTML=`
            <div class="product-item pending">
            <h3>No Products Available</h3>
          </div>`;
        }else{
            products.forEach((product) => {
                var statuscontainer = '';
                switch (product.status) {
                    case "available":
                        statuscontainer = `<img
                            src="assets/mark.png"
                            alt="Approved"
                            class="status-icon"
                            title="Status: Approved"
                            />`
                        break;
                    case "pending":
                        statuscontainer = `<img
                            src="assets/expired.png"
                            alt="Pending"
                            class="status-icon"
                            title="Status: Pending"
                            />`
                    default:
                        break;
                }

                const element = `
                <div class="product-item pending">
                    <div class="product-image">
                    <img src="http://127.0.0.1:8000/uploads/${product.images[0]}" alt="" />
                    </div>

                    <div>
                    <h3>${product.name}</h3>
                    <h6>${product.description}</h6>
                    <p>LKR ${product.price}</p>
                    </div>

                    ${statuscontainer}
                </div>
                `;

                productContainer.innerHTML += element;
            });
        }
        
      } catch (error) {
        console.error("Error loading posts:", error);
      }
}

export const fetchCategories = async() =>{
    const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      // call api and get posts
      try {
        const response = await fetch(
          "http://localhost:8000/api/products/category",
          requestOptions
        );
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
    
        const productsCategory = await response.json(); // Assuming the API returns JSON
        console.log(productsCategory);
        
        const categoryContainer = document.getElementById('productCategory');
        categoryContainer.innerHTML=``;
        categoryContainer.innerHTML +=`<option value="" disabled selected>Select a category</option>`;
        productsCategory.forEach((category)=>{
            const element = `<option value="${category.categoryId}">${category.categoryName}</option>`;
            categoryContainer.innerHTML += element;
        })
      } catch (error) {
        console.error("Error loading posts:", error);
      }
}