<template>
  <div>
    <Navbar/>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto  px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Alert from './AlertMessage';

export default {
  components: {
    Navbar,
    Alert,
  },
};
</script>
