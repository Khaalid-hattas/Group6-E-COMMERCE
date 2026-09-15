<template>
  <div class="artwork-page">

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-text">
        <p class="small-title">CREATIVE • UNIQUE • BEAUTIFUL</p>

        <h1>
          Art that tells<br />
          <span>a story.</span>
        </h1>

        <p class="hero-description">
          Discover beautiful artwork created by talented artists.
          Find something unique to make your space feel like home.
        </p>

        <button class="shop-button">
          Shop Artwork
        </button>
      </div>

      <div class="hero-image">
        <img
          src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80"
          alt="Beautiful artwork"
        />
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <div class="section-heading">
        <p>EXPLORE OUR COLLECTION</p>
        <h2>Find something you love</h2>
      </div>

      <div class="category-grid">

        <div class="category-card">
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80"
            alt="Paintings"
          />
          <h3>Paintings</h3>
          <p>Original pieces for your home.</p>
        </div>

        <div class="category-card">
          <img
            src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=600&q=80"
            alt="Wall Art"
          />
          <h3>Wall Art</h3>
          <p>Give your walls a new personality.</p>
        </div>

        <div class="category-card">
          <img
            src="https://images.unsplash.com/photo-1577083552431-6e5fd01988f5?auto=format&fit=crop&w=600&q=80"
            alt="Prints"
          />
          <h3>Prints</h3>
          <p>Affordable art for every space.</p>
        </div>

      </div>
    </section>

    <!-- Products -->
    <section class="products">
      <div class="section-heading">
        <p>OUR FAVOURITES</p>
        <h2>Featured Artwork</h2>
      </div>

      <div class="product-grid">

        <div class="product-card">
          <img
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=600&q=80"
            alt="Abstract artwork"
          />

          <div class="product-info">
            <h3>Abstract Dreams</h3>
            <p>Original Artwork</p>
            <strong>R850</strong>
          </div>
        </div>

        <div class="product-card">
          <img
            src="https://images.unsplash.com/photo-1577083552431-6e5fd01988f5?auto=format&fit=crop&w=600&q=80"
            alt="Modern artwork"
          />

          <div class="product-info">
            <h3>Modern Soul</h3>
            <p>Limited Print</p>
            <strong>R650</strong>
          </div>
        </div>

        <div class="product-card">
          <img
            src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=600&q=80"
            alt="Colourful artwork"
          />

          <div class="product-info">
            <h3>Colour Story</h3>
            <p>Original Artwork</p>
            <strong>R1,200</strong>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>

.artwork-page {
  background: #fff8f7;
  color: #3b2929;
  min-height: 100vh;
}

/* HERO */

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  padding: 70px 8%;
  background: #f3d6d3;
}

.hero-text {
  max-width: 550px;
}

.small-title {
  font-size: 13px;
  letter-spacing: 3px;
  font-weight: bold;
  color: #8b5e5e;
}

.hero h1 {
  font-size: 64px;
  line-height: 1.05;
  margin: 20px 0;
  font-weight: 700;
}

.hero h1 span {
  color: #9b6868;
}

.hero-description {
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 30px;
  color: #604747;
}

.shop-button {
  background: #704949;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
}

.shop-button:hover {
  background: #4e3030;
}

.hero-image {
  width: 45%;
}

.hero-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 4px;
}

/* SECTION HEADINGS */

.section-heading {
  text-align: center;
  margin-bottom: 40px;
}

.section-heading p {
  color: #9b6868;
  letter-spacing: 2px;
  font-size: 12px;
  font-weight: bold;
}

.section-heading h2 {
  font-size: 36px;
  margin-top: 10px;
}

/* CATEGORIES */

.categories {
  padding: 80px 8%;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.category-card {
  background: white;
  text-align: center;
  padding-bottom: 25px;
  box-shadow: 0 5px 20px rgba(80, 40, 40, 0.08);
}

.category-card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.category-card h3 {
  margin-top: 20px;
  font-size: 22px;
}

.category-card p {
  color: #765f5f;
}

/* PRODUCTS */

.products {
  padding: 80px 8%;
  background: #f9eeee;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.product-card {
  background: white;
  box-shadow: 0 5px 20px rgba(80, 40, 40, 0.08);
}

.product-card img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin: 0 0 5px;
  font-size: 20px;
}

.product-info p {
  color: #806b6b;
  margin-bottom: 15px;
}

.product-info strong {
  font-size: 18px;
  color: #704949;
}

/* MOBILE */

@media (max-width: 768px) {

  .hero {
    flex-direction: column;
    padding: 50px 6%;
  }

  .hero h1 {
    font-size: 45px;
  }

  .hero-image {
    width: 100%;
  }

  .hero-image img {
    height: 350px;
  }

  .category-grid,
  .product-grid {
    grid-template-columns: 1fr;
  }

  .categories,
  .products {
    padding: 60px 6%;
  }

}

</style>