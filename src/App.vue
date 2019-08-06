<template>
  <div id="app">
    <header>
      <Header />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
  @media only screen and (min-width: 768px) {
  main {
    min-height: calc(100vh);
  }
  }

  main {
    margin-top: 5px;
    flex: 2 0 auto;
    margin-bottom: 25px;
  }
</style>
