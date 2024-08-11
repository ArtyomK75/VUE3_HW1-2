const App = {
    components: {
        'mainComponent': Vue.defineAsyncComponent( () => loadModule('sources/components/mainComponent.vue', options) ),
    },
    data() {
        return {
            counter: 0,
            app,
        }
    },
    template: '<mainComponent></mainComponent>',
}

const options = {
    moduleCache: {
      vue: Vue
    },
    async getFile(url) {
      const res = await fetch(url);
      if ( !res.ok )
        throw Object.assign(new Error(res.statusText + ' ' + url), { res });
      return {
        getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
      }
    },
    addStyle(textContent) {
      const style = Object.assign(document.createElement('style'), { textContent });
      const ref = document.head.getElementsByTagName('style')[0] || null;
      document.head.insertBefore(style, ref);
    },
}

const {loadModule} = window['vue3-sfc-loader'];
const app = Vue.createApp(App);
app.component('child-component', {
    props: ['childCounter'],
    template: '<p>It`s child component</p>'
            +'<h1 class="text-left">{{childCounter}}</h1>',
});
app.mount('#app');
