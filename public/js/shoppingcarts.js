$(document).ready(() => {


    let cleanedCarts;

    // Get logged in user's data
    let user = $.get("/api/user_data").then(function (data) {
        console.log('user.email: ', data.email);
        console.log('user.id: ', data.id);
        return data;
    });



    // ******************** Event listeners *********************
    $(document).on('click', (event) => {
        if ($(event.target).attr('id') === 'delete') {
            alert("delete");
            const cartId = $(event.target).attr('cartid');
             fetch(`/api/cart/${cartId}`, {
                method: 'DELETE'
              }).then(data => window.location.href = "/cart")
              .catch(err => console.error(err));
            
        }
        // Continue browsing button clicked
        if ($(event.target).attr('id') === 'continueBrowsing') {
            window.location.href = "/browse"
        }

        // Purchases history button clicked
        if ($(event.target).attr('id') === 'purchasesHistory') {
            $('#purchasesDiv').toggle();
        }

        // Confirm purchse button clicked
        if ($(event.target).attr('id') === 'confirmPurchase') {

            $.get("/api/cart").then(function (data) {
                // console.log('user.email: ', data.email);
                console.log("==================")
                console.log(data);

                // Add the shoppincart to the purchases
                data.forEach((cart) => {
                    $.post("/api/purchase", {
                        BookTitle: cart.title,
                        BookPrice:cart.price
                    }, (cart_answer) => {
                        console.log('cart_answer: ', cart_answer);
                        // window.location.href = "/cart";
                    });
                    // Object.values(cart).forEach((cartElement) => {
                        // if (typeof cartElement === 'object' && cartElement != null && cartElement[0] != undefined) {
                        //     $.post("/api/purchases", {
                        //         UserId: data.id,
                        //         BookId: cartElement[0].id
                        //     }.then((cart_answer) => {
                        //         // window.location.href = "/cart";
                        //         console.log('Cart deleted: ', cart_answer);
                        //     });
                        // }
                    // });
                });

                // Display the modal
                $('#purchaeConfirmationModal').modal();

                // Refresh shoppincart table and Show purchase history
                $('#purchaeConfirmationModal').on('hidden.bs.modal', function (e) {
                    loadShoppingcart();
                    loadPurchases();
                    $('#purchasesDiv').show();
                    $('#confirmPurchase').hide();
                })
            });


        }
    });

    // ******************** Functions *********************
    const loadShoppingcart = () => {
        console.log('loadShoppingcart()');

        // Clean the shoppingcart table
        $('#cartTableBody').empty();

        // Load the shoppingcarts
        $.ajax({
            method: "GET",
            url: "/api/cart/"
        }).then((shoppingcarts) => {
            let total = 0;
            console.log(shoppingcarts);
            if (shoppingcarts.length > 0) {
                // Clean the data
                cleanedCarts = shoppingcarts.map((shoppingcart) => {
                    return {
                        id: shoppingcart.id,
                        UserId: shoppingcart.user_id,
                        title: shoppingcart.title,
                        price: shoppingcart.price
                    }
                });
                console.log(cleanedCarts);
                // Create the table
                cleanedCarts.forEach((cart) => {
                    let tr = $('<tr>');
                    // let td0 = $('<td>');
                    let td1 = $('<td>');
                    // let td2 = $('<td>');
                    let td3 = $('<td>');
                    let td4 = $('<td>');
                    let td5 = $('<button id="delete" cartId="'+cart.id+'">Delete</button>')
                    console.log(cart);
                    // td0.text(cart.id);
                    td1.text(cart.UserId);
                    // td2.text(cart.id);
                    td3.text(cart.title);
                    td4.text("$ "+cart.price);
                    // Object.values(cart).forEach((cartElement) => {
                    //     if (typeof cartElement === 'object' && cartElement != null && cartElement[0] != undefined) {
                    //         td2.text(cart.id);
                    //         td3.text(cart.title);
                    //         td4.text(cart.price);
                    //         total += parseFloat(cart.price);
                    //     }
                        // tr.append(td0);
                        total += parseFloat(cart.price);
                        tr.append(td1);
                        // tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);
                        tr.append(td5);
                    // });
                    $('#cartTableBody').append(tr);
                });
                total = total.toFixed(2);
                let tr = $('<tr>');
                // let td0 = $('<td>');
                let td1 = $('<td>');
                // let td2 = $('<td>');
                let td3 = $('<td>');
                let td4 = $('<td>');
                td3.text('Total');
                td4.text(`${total}`);
                // tr.append(td0);
                tr.append(td1);
                // tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                $('#cartTableBody').append(tr);
            } else {
                $('#confirmPurchase').hide();
            }
        });
    }


    const loadPurchases = () => {
        // Clean the purchases table
        $('#purchasesTableBody').empty();

        // Load the purchases
        // $.get("/api/user_data").then(function (data) {
        //     console.log('user.email: ', data.email);
        //     console.log('user.id: ', data.id);

            $.ajax({
                method: "GET",
                url: `/api/purchase/` // Missing 
            }).then((purchases) => {

                // Clean the data
                let cleanedPurchases = purchases.map((purchase) => {
                    return {
                        id: purchase.id,
                        date: moment(purchase.date).format("MMM Do YY"),
                        UserId: purchase.user_id,
                        title: purchase.title,
                        price:purchase.price
                    }
                });
                console.log('cleanedPurchases: ', cleanedPurchases);

                // Create the table
                cleanedPurchases.forEach((purchase) => {
                    let tr = $('<tr>');
                    // let td0 = $('<td>');
                    let td1 = $('<td>');
                    // let td2 = $('<td>');
                    let td3 = $('<td>');
                    let td4 = $('<td>');
                    let td5 = $('<td>');
                    // td0.text(purchase.id);
                    td1.text(purchase.UserId);
                    td5.text(purchase.date);
                    // td2.text(purchase.id);
                    td3.text(purchase.title);
                    td4.text(purchase.price)
                    // tr.append(td0);
                    tr.append(td1);
                    // tr.append(td2);
                    tr.append(td3);
                    tr.append(td4);
                    tr.append(td5);
                    $('#purchasesTableBody').append(tr);
                });
            });
        // });

    }

    const init = () => {
        loadShoppingcart();
        loadPurchases()
        $('#purchasesDiv').hide();
    }

    init();
});
