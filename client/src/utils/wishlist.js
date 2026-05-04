export const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(item => item._id === product._id);

    if (!exists) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
};

export const getWishlist = () => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const removeFromWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist = wishlist.filter(item => item._id !== id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const isInWishlist = (id) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some(item => item._id === id);
};