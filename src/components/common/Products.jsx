import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/common/Navbar";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
export default function Products() {
  const navigate = useNavigate();
  const { category } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: "",
    parent: "",
    image: null
  });
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    brand: "",
    category: category || "",
    description: "",
    tag: "",
    image: null
  });
  useEffect(() => {

    API.get("/cart")
      .then((res) => {

        const items =
          res.data?.items || [];

        // store only product ids
        setCartItems(
          items.map(
            (item) =>
              item.productId._id
          )
        );
      })
      .catch(console.error);

  }, []);
  // 🔥 MAIN CATEGORIES
  useEffect(() => {
    API.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    API.get("/categories/all")
      .then((res) => {
        console.log("ALL CATEGORIES:", res.data);
        setAllCategories(res.data);
      })
      .catch(console.error);
  }, []);

  // 🔥 SUBCATEGORIES
  useEffect(() => {
    if (category) {
      API.get(`/categories/${category}`)
        .then((res) => setSubCategories(res.data))
        .catch(console.error);
    }
  }, [category]);

  // 🔥 PRODUCTS (ONLY if no subcategories)
  useEffect(() => {
    if (category && subCategories.length === 0) {
      setLoading(true);

      let url = `/products?category=${category}`;

      if (search) {
        url += `&search=${search}`;
      }

      API.get(url)
        .then((res) => setProducts(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, subCategories, search]);

  const openAddModal = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      price: "",
      stock: "",
      brand: "",
      category: "",
      description: "",
      tag: "",
      image: null
    });

    setShowModal(true);
  };

  const openCategoryEdit = (category) => {
    console.log("openCategoryEdit", category);
    setEditingCategory(category);


    setCategoryData({
      name: category.name,
      slug: category.slug,
      parent: category.parent?._id || "",
      image: null,
    });

    setShowCategoryModal(true);
  };

  const handleCategoryChange = (e) => {
    const { name, value, files } = e.target;

    setCategoryData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };
  const openEditModal = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      description: product.description || "",
      category: product.category?.slug || "",
      tag: product.tag || "",
      image: null
    });

    setShowModal(true);
  };

  const openSubCategoryEdit = (sub) => {
    setEditingSubCategory(sub);

    setCategoryData({
      name: sub.name,
      slug: sub.slug,
      image: null,
    });

    setShowCategoryModal(true);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("brand", formData.brand);
      data.append("category", formData.category);
      data.append(
        "tag",
        formData.tag
      );
      data.append(
        "description",
        formData.description
      );


      if (formData.image) {
        data.append("image", formData.image);
      }

      // ✅ CREATE
      if (!editingProduct) {
        await API.post("/products/create", data);

      } else {
        // ✅ UPDATE
        await API.put(`/products/${editingProduct._id}`, data);
      }

      setShowModal(false);

      // 🔥 REFRESH PRODUCTS
      const res = await API.get(`/products?category=${category}`);
      setProducts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", categoryData.name);

      data.append(
        "slug",
        categoryData.slug
          .toLowerCase()
          .replace(/\s+/g, "-")
      );

      data.append("parent", categoryData.parent);

      if (categoryData.image) {
        data.append("image", categoryData.image);
      }
    
const editingItem =
  editingCategory || editingSubCategory;

if (editingItem) {

  const categoryId =
    editingItem.id || editingItem._id;

  await API.put(
    `/categories/${categoryId}`,
    data
  );

} else {

  await API.post(
    "/categories/create",
    data
  );

}

      alert("Category created");

      setShowCategoryModal(false);

      setEditingCategory(null);

      setCategoryData({
        name: "",
        slug: "",
        parent: "",
        image: null,
      });

      // 🔥 refresh categories
      const all = await API.get("/categories/all");
      setAllCategories(all.data);

      const main = await API.get("/categories");
      setCategories(main.data);

    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      // 🔥 remove deleted product from UI instantly
      setProducts((prev) => prev.filter((p) => p._id !== id));

    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  };

  const toggleCart = async (
    productId
  ) => {

    try {

      const alreadyAdded =
        cartItems.includes(productId);

      // ✅ REMOVE
      if (alreadyAdded) {

        await API.delete(
          `/cart/remove/${productId}`
        );

        setCartItems((prev) =>
          prev.filter(
            (id) => id !== productId
          )
        );

        return;
      }

      // ✅ ADD
      await API.post("/cart/add", {
        productId,
        quantity: 1
      });

      setCartItems((prev) => [
        ...prev,
        productId
      ]);

    } catch (err) {

      console.log(err);
    }
  };
  return (
    <>

      <Navbar />
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? "Update Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className=" w-full border p-3 rounded-lg bg-white  text-sm outline-none focus:ring-2 focus:ring-black "
                required
              >
                <option value="">
                  Select Category
                </option>

                {allCategories
                  .filter((cat) => cat.parent)
                  .sort((a, b) =>
                    a.parent.name.localeCompare(b.parent.name)
                  )
                  .map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="
    w-full border p-3 rounded
    resize-none
  "
              />
              <div className="flex items-center gap-3">
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                >
                  <option value="">
                    Select Tag
                  </option>

                  <option value="BEST_SELLER">
                    Best Seller
                  </option>

                  <option value="NEW_ARRIVAL">
                    New Arrival
                  </option>

                  <option value="TRENDING">
                    Trending
                  </option>

                  <option value="FEATURED">
                    Featured
                  </option>
                </select>
              </div>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded"
                >
                  {editingProduct ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 py-3 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-2xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>

            <form
              onSubmit={handleCreateCategory}
              className="space-y-4"
            >

              {/* CATEGORY NAME */}
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={categoryData.name}
                onChange={handleCategoryChange}
                className="w-full border p-3 rounded"
                required
              />

              {/* SLUG */}
              <input
                type="text"
                name="slug"
                placeholder="category-slug"
                value={categoryData.slug}
                onChange={handleCategoryChange}
                className="w-full border p-3 rounded"
                required
              />

              {/* PARENT CATEGORY */}
              {!editingCategory && (
                <select
                  name="parent"
                  value={categoryData.parent}
                  onChange={handleCategoryChange}
                  className="w-full border p-3 rounded"
                >
                  <option value="">
                    Main Category
                  </option>

                  {categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}

              {/* IMAGE */}
              <input
                type="file"
                name="image"
                onChange={handleCategoryChange}
                className="w-full"
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded"
                >
                  {editingCategory ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 bg-gray-300 py-3 rounded"
                >
                  Cancel
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-white min-h-screen p-6">

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border mb-6"
        />

        {/* 🧭 Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>›</span>

          <Link to="/products" className="hover:text-black">Products</Link>

          {category && (
            <>
              <span>›</span>
              <span className="capitalize text-black font-medium">
                {category.replace("-", " ")}
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-black font-medium mb-3">
            Power Tools – Performance, Efficiency & Durability for Every Job
          </p>

          <p className="text-gray-600 mb-3 leading-relaxed">
            At NPT Power Tools, we deliver high-performance tools designed to maximize efficiency, precision, and speed.
          </p>
        </div>

        {/* 🔥 MAIN CATEGORY VIEW */}
        {!category && (
          <>
            {isAdmin && (
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => {
                    setEditingCategory(null);

                    setCategoryData({
                      name: "",
                      slug: "",
                      parent: "",
                      image: null,
                    });

                    setShowCategoryModal(true);
                  }}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  + Add Category
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="group"
                >
                  {/* IMAGE */}
                  <div
                    onClick={() => navigate(`/products/${cat.slug}`)}
                    className="
              cursor-pointer
              bg-gray-50
              overflow-hidden
              aspect-square
              flex
              items-center
              justify-center
            "
                  >
                    {cat.image ? (
                      <img
                        src={
                          cat.image.startsWith("http")
                            ? cat.image
                            : `http://localhost:5004/${cat.image}`
                        }
                        alt={cat.name}
                        className="
                  w-full
                  h-full
                  object-contain
                  group-hover:scale-105
                  transition
                  duration-300
                "
                      />
                    ) : (
                      <div className="text-6xl">
                        🧰
                      </div>
                    )}
                  </div>

                  {/* CATEGORY NAME */}
                  <h3
                    onClick={() =>
                      navigate(`/products/${cat.slug}`)
                    }
                    className="
              mt-5
              text-center
              text-2xl
              font-semibold
              text-gray-800
              cursor-pointer
              hover:text-teal-600
              transition
            "
                  >
                    {cat.name}
                  </h3>

                  {/* ADMIN EDIT */}
                  {isAdmin && (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() =>
                          openCategoryEdit(cat)
                        }
                        className="
                  px-5
                  py-2
                  border
                  rounded-lg
                  text-sm
                  hover:bg-black
                  hover:text-white
                  transition
                "
                      >
                        Edit Category
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* 🔥 SUBCATEGORY VIEW */}
      {category && subCategories.length > 0 && (
  <>
    <h2 className="text-xl font-bold mb-8 capitalize">
      {category.replace("-", " ")}
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14">
      {subCategories.map((cat) => (
        <div
          key={cat.id || cat._id}
          className="group"
        >
          {/* IMAGE */}
          <div
            onClick={() => navigate(`/products/${cat.slug}`)}
            className="
              cursor-pointer
              bg-gray-50
              overflow-hidden
              aspect-square
              flex
              items-center
              justify-center
            "
          >
            {cat.image ? (
              <img
                src={
                  cat.image.startsWith("http")
                    ? cat.image
                    : `http://localhost:5004/${cat.image}`
                }
                alt={cat.name}
                className="
                  w-full
                  h-full
                  object-contain
                  group-hover:scale-105
                  transition
                  duration-300
                "
              />
            ) : (
              <div className="text-6xl">
                🧰
              </div>
            )}
          </div>

          {/* NAME */}
          <h3
            onClick={() => navigate(`/products/${cat.slug}`)}
            className="
              mt-5
              text-center
              text-2xl
              font-semibold
              text-gray-800
              cursor-pointer
              hover:text-teal-600
              transition
            "
          >
            {cat.name}
          </h3>

          {/* ADMIN EDIT */}
          {isAdmin && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => openSubCategoryEdit(cat)}
                className="
                  px-5
                  py-2
                  border
                  rounded-lg
                  text-sm
                  hover:bg-black
                  hover:text-white
                  transition
                "
              >
                Edit Sub Category
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </>
)}
        {category && subCategories.length === 0 && isAdmin && (
          <div className="mb-6 flex justify-end">

            <button
              onClick={openAddModal}
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Add Product
            </button>

          </div>
        )}
        {/* 🔥 PRODUCT VIEW */}
        {category && subCategories.length === 0 && (
          <>
            <h2 className="text-xl font-bold mb-4 capitalize">
              {category.replace("-", " ")}
            </h2>

            {loading ? (
              <div className="text-center">Loading...</div>
            ) : products.length === 0 ? (
              <div className="text-center text-gray-500">
                No products found
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="
group relative overflow-hidden rounded-3xl
bg-white/80 backdrop-blur-lg border border-gray-200
shadow-lg hover:shadow-2xl
transition-all duration-500
hover:-translate-y-2
active:scale-[0.97]
active:shadow-md
touch-manipulation
"    >

                    {/* IMAGE SECTION */}
                    <div className="relative overflow-hidden">

                      {/* STOCK BADGE */}
                      <div className="absolute top-4 left-4 z-20">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${p.stock > 0
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                            }`}
                        >
                          {p.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      {/* IMAGE */}
                      <img
                        src={
                          p.image
                            ? p.image.startsWith("http")
                              ? p.image
                              : `http://localhost:5000/${p.image}`
                            : "https://via.placeholder.com/500"
                        }
                        alt={p.name}
                        className="
h-72 w-full object-cover
transition-transform duration-700
group-hover:scale-110
active:scale-105
"        />

                      {/* DARK OVERLAY */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-500" />

                      {/* QUICK ACTIONS */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">


                        <button
                          onClick={() =>
                            setSelectedProduct(p)
                          }
                          className="
    bg-white text-black
    px-4 py-2
    rounded-full
    text-sm font-medium
    shadow-lg
    hover:bg-black
    hover:text-white
    transition
  "
                        >
                          View
                        </button>
                        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-white hover:text-black transition">
                          Wishlist
                        </button>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">

                      {/* CATEGORY */}
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                        Premium Tools
                      </p>

                      {/* PRODUCT NAME */}
                      <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                        {p.name}
                      </h2>

                      {/* BRAND */}
                      <p className="text-sm text-gray-500 mt-1">
                        {p.brand}
                      </p>

                      {/* PRICE + STOCK */}
                      <div className="flex items-center justify-between mt-4">

                        <div>
                          <p className="text-2xl font-extrabold text-black">
                            ₹{p.price}
                          </p>

                          <p className="text-sm text-gray-400">
                            Stock: {p.stock}
                          </p>
                        </div>

                        {/* RATING */}
                        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-semibold text-yellow-700">
                            4.9
                          </span>
                        </div>
                      </div>

                      {/* ADD TO CART */}
                      <button
                        onClick={() =>
                          toggleCart(p._id)
                        }
                        className={`
    mt-5 w-full
    py-3 rounded-2xl
    font-semibold
    shadow-lg
    active:scale-95
    transition-all duration-300
    flex items-center
    justify-center gap-2

    ${cartItems.includes(p._id)
                            ? `
          bg-green-500
          hover:bg-green-600
          text-white
        `
                            : `
          bg-gradient-to-r
          from-black to-gray-800
          text-white
        `
                          }
  `}
                      >

                        {cartItems.includes(p._id) ? (
                          <>
                            Added
                          </>
                        ) : (
                          <>
                            Add to Cart
                          </>
                        )}
                      </button>

                      {/* ADMIN BUTTONS */}
                      {isAdmin && (
                        <div className="flex gap-3 mt-4">

                          <button
                            onClick={() => openEditModal(p)}
                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-xl font-semibold transition"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => handleDelete(p._id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {selectedProduct && (

        <div className="
    fixed inset-0 z-50
    bg-black/60 backdrop-blur-sm
    flex items-center justify-center
    p-4
  ">

          {/* MODAL */}
          <div className="
      relative
      bg-white
      w-full
      max-w-4xl
      rounded-[32px]
      shadow-[0_20px_80px_rgba(0,0,0,0.25)]
      overflow-hidden
      animate-in fade-in zoom-in
      max-h-[88vh]
      overflow-y-auto
    ">

            {/* CLOSE BUTTON */}
            <button
              onClick={() =>
                setSelectedProduct(null)
              }
              className="
          absolute top-4 right-4
          z-50
          w-10 h-10
          rounded-full
          bg-white
          shadow-lg
          flex items-center justify-center
          text-xl font-bold
          hover:bg-black
          hover:text-white
          transition-all duration-300
        "
            >
              ✕
            </button>

            <div className="
        grid grid-cols-1
        md:grid-cols-2
      ">

              {/* IMAGE SECTION */}
              <div className="
          bg-gradient-to-br
          from-gray-100 to-gray-200
          flex items-center justify-center
          p-6 sm:p-8
          min-h-[260px]
          md:min-h-full
        ">

                <img
                  src={
                    selectedProduct.image
                      ? selectedProduct.image.startsWith("http")
                        ? selectedProduct.image
                        : `http://localhost:5000/${selectedProduct.image}`
                      : "https://via.placeholder.com/500"
                  }
                  alt={selectedProduct.name}
                  className="
              w-full
              max-w-[280px]
              sm:max-w-[340px]
              object-contain
              drop-shadow-2xl
              hover:scale-105
              transition duration-500
            "
                />
              </div>

              {/* DETAILS */}
              <div className="
          p-5 sm:p-7 md:p-8
          flex flex-col
        ">

                {/* BADGE */}
                <div className="
            w-fit
            bg-gray-100
            text-gray-700
            px-4 py-1.5
            rounded-full
            text-xs
            font-semibold
            uppercase
            tracking-widest
          ">
                  Premium Tool
                </div>

                {/* TITLE */}
                <h1 className="
            mt-4
            text-2xl sm:text-3xl
            font-extrabold
            text-gray-900
            leading-tight
          ">
                  {selectedProduct.name}
                </h1>

                {/* BRAND */}
                <div className="
            mt-3
            flex items-center gap-2
            text-gray-600
          ">
                  <span className="
              font-medium
            ">
                    Brand:
                  </span>

                  <span className="
              font-bold text-black
            ">
                    {selectedProduct.brand}
                  </span>
                </div>

                {/* PRICE + STOCK */}
                <div className="
            mt-6
            flex items-center
            justify-between
            gap-4
            flex-wrap
          ">

                  <h2 className="
              text-3xl sm:text-4xl
              font-extrabold
              text-black
            ">
                    ₹{selectedProduct.price}
                  </h2>

                  <span className={`
              px-4 py-2
              rounded-full
              text-sm font-semibold

              ${selectedProduct.stock > 0
                      ? `
                    bg-green-100
                    text-green-700
                  `
                      : `
                    bg-red-100
                    text-red-700
                  `
                    }
            `}>
                    {selectedProduct.stock > 0
                      ? "In Stock"
                      : "Out OfStock"}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <div className="
            mt-7
          ">

                  <h3 className="
              text-lg sm:text-xl
              font-bold
              text-gray-900
              mb-3
            ">
                    Product Overview
                  </h3>

                  <p className="
              text-gray-600
              text-sm sm:text-base
              leading-7
            ">
                    {selectedProduct.description ||
                      "Professional-grade industrial power tool engineered for precision, durability, and high-performance industrial usage."}
                  </p>
                </div>

                {/* FEATURES */}
                <div className="
            mt-7
            grid grid-cols-2
            gap-3
          ">

                  {[
                    "⚡ High Performance",
                    "🔧 Durable Build",
                    "🚚 Fast Delivery",
                    "🛡 Warranty"
                  ].map((feature) => (

                    <div
                      key={feature}
                      className="
                  bg-gray-100
                  rounded-2xl
                  py-3 px-2
                  text-center
                  text-sm
                  font-medium
                  text-gray-700
                "
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="
            mt-8
            flex items-center
            gap-3
          ">

                  {/* ADD TO CART */}
                  <button
                    onClick={() =>
                      toggleCart(
                        selectedProduct._id
                      )
                    }
                    className={`
                flex-1
                h-14
                rounded-2xl
                font-bold
                text-base
                transition-all duration-300
                active:scale-95

                ${cartItems.includes(
                      selectedProduct._id
                    )
                        ? `
                      bg-green-500
                      hover:bg-green-600
                      text-white
                    `
                        : `
                      bg-black
                      hover:bg-gray-900
                      text-white
                    `
                      }
              `}
                  >

                    {cartItems.includes(
                      selectedProduct._id
                    )
                      ? "Added"
                      : "Add to Cart"}

                  </button>

                  {/* WISHLIST */}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}