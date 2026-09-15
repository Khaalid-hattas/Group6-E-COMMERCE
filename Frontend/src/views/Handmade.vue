<template>
  <div class="handmade-page">

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-text">
        <p class="small-title">HANDCRAFTED • UNIQUE • MADE WITH LOVE</p>

        <h1>
          Made by hand,<br />
          <span>made with love.</span>
        </h1>

        <p class="hero-description">
          Discover beautiful handmade pieces created by talented local
          makers and artisans. Every piece has its own story.
        </p>

        <button class="shop-button">
          Shop Handmade
        </button>
      </div>

      <div class="hero-image">
        <img
          src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80"
          alt="Handmade crafts"
        />
      </div>
    </section>


    <!-- Categories -->
    <section class="categories">

      <div class="section-heading">
        <p>EXPLORE OUR COLLECTION</p>
        <h2>Handmade treasures</h2>
      </div>

      <div class="category-grid">

        <div class="category-card">
          <img
            src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80"
            alt="Handmade home decor"
          />

          <h3>Home Decor</h3>
          <p>Beautiful pieces to brighten your home.</p>
        </div>


        <div class="category-card">
          <img
            src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=600&q=80"
            alt="Handmade jewellery"
          />

          <h3>Jewellery</h3>
          <p>Unique accessories made by hand.</p>
        </div>


        <div class="category-card">
          <img
            src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=600&q=80"
            alt="Handmade bags"
          />

          <h3>Bags & Accessories</h3>
          <p>Practical pieces with a personal touch.</p>
        </div>

      </div>

    </section>


    <!-- Featured Products -->
    <section class="products">

      <div class="section-heading">
        <p>HANDPICKED FOR YOU</p>
        <h2>Featured Handmade</h2>
      </div>


      <div class="product-grid">

        <div class="product-card">

          <img
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80"
            alt="Handmade pottery"
          />

          <div class="product-info">
            <h3>Clay Pottery Set</h3>
            <p>Handcrafted pottery</p>
            <strong>R450</strong>
          </div>

        </div>


        <div class="product-card">

          <img
            src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80"
            alt="Handmade jewellery"
          />

          <div class="product-info">
            <h3>Beaded Bracelet</h3>
            <p>Handmade jewellery</p>
            <strong>R280</strong>
          </div>

        </div>


        <div class="product-card">

          <img
            src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80"
            alt="Handmade bag"
          />

          <div class="product-info">
            <h3>Woven Tote Bag</h3>
            <p>Handwoven accessory</p>
            <strong>R520</strong>
          </div>

        </div>

      </div>

    </section>


    <!-- Artisan Section -->
    <section class="artisan">

      <div class="artisan-image">
        <img
          src="https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=900&q=80"
          alt="Artisan creating handmade products"
        />
      </div>

      <div class="artisan-text">

        <p class="small-title">THE PEOPLE BEHIND THE CRAFT</p>

        <h2>Supporting local creativity.</h2>

        <p>
          Every handmade product on our platform is created by someone
          who has put their time, creativity and passion into their craft.
        </p>

        <p>
          When you purchase handmade, you're not just buying a product.
          You're supporting an artist, maker or small business.
        </p>

        <button class="learn-button">
          Meet Our Makers
        </button>

      </div>

    </section>

  </div>
</template>


<style scoped>

.handmade-page {
  background: #fffaf8;
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

  background: #ead8ce;
}


.hero-text {
  max-width: 550px;
}


.small-title {
  font-size: 13px;
  letter-spacing: 3px;
  font-weight: bold;
  color: #8b6657;
}


.hero h1 {
  font-size: 60px;
  line-height: 1.05;

  margin: 20px 0;

  font-weight: 700;
}


.hero h1 span {
  color: #9b725f;
}


.hero-description {
  font-size: 17px;
  line-height: 1.7;

  margin-bottom: 30px;

  color: #604d44;
}


.shop-button,
.learn-button {
  background: #765447;
  color: white;

  border: none;

  padding: 15px 30px;

  border-radius: 4px;

  font-size: 15px;

  cursor: pointer;
}


.shop-button:hover,
.learn-button:hover {
  background: #51372e;
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
  color: #9b725f;

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

  background: #f5ebe6;
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

  color: #765447;
}


/* ARTISAN SECTION */

.artisan {
  display: flex;

  align-items: center;

  gap: 60px;

  padding: 90px 8%;

  background: #fffaf8;
}


.artisan-image {
  width: 50%;
}


.artisan-image img {
  width: 100%;

  height: 450px;

  object-fit: cover;

  border-radius: 4px;
}


.artisan-text {
  width: 50%;
}


.artisan-text h2 {
  font-size: 40px;

  margin: 15px 0 25px;
}


.artisan-text p {
  color: #665653;

  line-height: 1.7;

  margin-bottom: 20px;
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


  .artisan {
    flex-direction: column;

    padding: 60px 6%;
  }


  .artisan-image,
  .artisan-text {
    width: 100%;
  }


  .artisan-image img {
    height: 350px;
  }


  .artisan-text h2 {
    font-size: 32px;
  }

}

</style>