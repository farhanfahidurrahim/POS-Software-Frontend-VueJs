<template>
  <div class="landing-page">
    <header class="header">
      <nav class="navbar">
        <a href="#" class="nav-logo">Portfolio.</a>
        <ul class="nav-menu">
          <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link">About</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Services</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Portfolio</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
        </ul>
      </nav>
    </header>

    <section class="hero">
      <div class="container hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Hello, It's Me<br />{{ name }}</h1>
          <p class="hero-subtitle">
            And I'm a <span class="highlight">Frontend Developer</span>
          </p>
          <p class="hero-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            ab, obcaecati repellat reiciendis ipsam perspiciatis.
          </p>
          <div class="hero-buttons">
            <a href="#" class="btn btn-primary">Download CV</a>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-linkedin"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img src="" alt="John Kendric" />
        </div>
      </div>
    </section>

    <section class="services">
      <div class="container">
        <h2 class="section-title">Our Services</h2>
        <div class="services-grid">
          <div class="service-item">
            <h3>Web Development</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <a href="#" class="btn btn-secondary">Read More</a>
          </div>
          <div class="service-item">
            <h3>Graphic Design</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <a href="#" class="btn btn-secondary">Read More</a>
          </div>
          <div class="service-item">
            <h3>Digital Marketing</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <a href="#" class="btn btn-secondary">Read More</a>
          </div>
        </div>
      </div>
    </section>

    <section class="projects">
      <div class="container">
        <h2 class="section-title">Latest Project</h2>
        <div class="projects-grid">
          <div
            v-for="project in projects"
            :key="project.id"
            class="project-item"
          >
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.link" class="btn btn-primary">Visit project</a>
          </div>
        </div>
      </div>
    </section>

    <section class="contact">
      <div class="container">
        <h2 class="section-title">Contact Me</h2>
        <form class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" />
          </div>
          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" class="form-control"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
const name = "John Kendric";
const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Project 1 description",
    link: "#",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Project 2 description",
    link: "#",
  },
  // Add more projects as needed
];
</script>

<style scoped>
/* Header Styles */
.header {
  background-color: #121212;
  padding: 20px 0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  color: #fff;
  font-size: 24px;
  text-decoration: none;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-item {
  display: inline-block;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
}

/* Hero Section Styles */
.hero {
  text-align: left;
  padding: 100px 0;
  background-color: #1e1e1e;
  color: #fff;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-text {
  max-width: 600px;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 24px;
  margin-bottom: 10px;
}

.hero-subtitle .highlight {
  color: #00bfa6;
}

.hero-description {
  font-size: 18px;
  margin-bottom: 20px;
}

.hero-buttons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.btn-primary {
  background-color: #00bfa6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.social-links a {
  color: #fff;
  font-size: 20px;
  margin-right: 10px;
  text-decoration: none;
}

.hero-image img {
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 191, 166, 0.5);
  max-width: 300px;
}

/* Hero End */

.btn-primary {
  background-color: #00bfa6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.services {
  padding: 50px 0;
  background-color: #f9f9f9;
}

.section-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
}

.services-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.service-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.btn-secondary {
  background-color: #00bfa6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.projects {
  padding: 50px 0;
  background-color: #f9f9f9;
}

.projects-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.project-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.contact {
  padding: 50px 0;
  background-color: #1e1e1e;
  color: #fff;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-control:focus {
  border-color: #00bfa6;
}

.btn-primary:hover,
.btn-secondary:hover {
  background-color: #009688;
}
</style>
