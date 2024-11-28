export async function initilizeSellers() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    // call api and get posts
    try {
        const response = await fetch(
            "http://localhost:8000/api/trova/admin/sellers",
            requestOptions
        );

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const sellers = await response.json(); // Assuming the API returns JSON
        console.log(sellers);

        const sellersHolder = document.getElementById('seller-table');
        sellersHolder.innerHTML = "";

        sellers.forEach((seller) => {
            const row = `
            <tr class="seller-view" data-seller="${seller.sid}">
                <td>${seller.name}</td>
                <td>${seller.email}</td>
              </tr>
            `;

            sellersHolder.innerHTML += row;
        });
        sellersHolder.addEventListener('click',(e)=>{
            const sellerId = e.target.closest('.seller-view').dataset.seller;
            console.log(sellerId);
            viewSeller(sellerId);
            document.getElementById('view-seller').style.display = "block";
        })

    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

async function viewSeller(sid) {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };

    try {
        const response = await fetch(
            `http://localhost:8000/api/trova/admin/sellerproduct?sid=${sid}`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const sellerProducts = await response.json();
        console.log(sellerProducts);
        document.getElementById('seller-name-show').innerHTML =sellerProducts[0].username??"";
        const productsHolder = document.getElementById('item-viewer-scroller');
        productsHolder.innerHTML = "";

        sellerProducts.forEach((product) => {
            let actionContainer;
            switch (product.status) {
                case "pending":
                    actionContainer = `
                    <div class="action-btns">
                        <p>${product.status}</p>
                        <a class="action-btn approve"><i class="fi fi-ss-check-circle" style="font-size: 60px"></i></a>
                        <a class="action-btn decline"><i class="fi fi-ss-cross-circle" style="font-size: 60px"></i></a>
                    </div>`;
                    break;
                case "available":
                    actionContainer = `
                    <div class="action-btns">
                        <p>${product.status}</p>
                        <a class="action-btn decline"><i class="fi fi-ss-cross-circle" style="font-size: 60px"></i></a>
                    </div>`;
                    break;
                case "decline":
                    actionContainer = `
                    <div class="action-btns">
                        <p>${product.status}</p>
                        <a class="action-btn approve"><i class="fi fi-ss-check-circle" style="font-size: 60px"></i></a>
                    </div>`;
                    break;
                default:
                    break;
            }

            const row = `
           <div class="item-view-container" data-proid="${product.productId}" data-seller="${product.sellerId}">
            <div class="item-image">
              <img src="http://127.0.0.1:8000/uploads/${product.images[0]}" alt="" />
              <div class="item-details">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <h2 class="price-count">LKR ${product.price}.00</h2>
              </div>
            </div>
            ${actionContainer}
          </div>`;

            productsHolder.innerHTML += row;
        });

        // Use event delegation to manage click events for approve/decline
        if (!productsHolder.hasAttribute("listener-attached")) {
            productsHolder.addEventListener('click', async(e) => {
                const proId = e.target.closest('.item-view-container')?.dataset.proid;
                const sellerID = e.target.closest('.item-view-container')?.dataset.seller;
                if (!proId) return;
                if (e.target.closest('.approve')) {
                    console.log(`approve ${proId}`);
                    await approve(proId, sellerID);
                } else if (e.target.closest('.decline')) {
                    console.log(`decline ${proId}`);
                    await decline(proId, sellerID);
                }
            });
            productsHolder.setAttribute("listener-attached", "true");
        }

    } catch (error) {
        console.error("Error loading posts:", error);
    }

    
}


async function approve(productId, sid) {
    try {
        const updateResponse = await fetch(
            "http://localhost:8000/api/trova/admin/product/approve",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // Ensure you're sending JSON
                },
                credentials: "include",
                body: JSON.stringify({
                    productId: productId,
                }),
            }
        );

        if (updateResponse.ok) {
            console.log(`Product ${productId} approved successfully.`);
            await viewSeller(sid); // Refresh the UI for the same seller
        } else {
            console.error("Failed to approve product:", updateResponse.statusText);
        }
    } catch (error) {
        console.error("Error in approving product:", error);
    }
}

async function decline(productId, sid) {
    try {
        const updateResponse = await fetch(
            "http://localhost:8000/api/trova/admin/product/decline",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // Ensure you're sending JSON
                },
                credentials: "include",
                body: JSON.stringify({
                    productId: productId,
                }),
            }
        );

        if (updateResponse.ok) {
            console.log(`Product ${productId} declined successfully.`);
            await viewSeller(sid); // Refresh the UI for the same seller
        } else {
            console.error("Failed to decline product:", updateResponse.statusText);
        }
    } catch (error) {
        console.error("Error in declining product:", error);
    }
}
