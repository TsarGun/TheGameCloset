import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Closet from '@/components/Closet'
import AddGame from '@/components/AddGame'
import UpdateGame from '@/components/UpdateGame'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        tags: [
          {
            name: 'description',
            content: 'The home page for Game Closet'
          },
          {
            property: 'og:description',
            content: 'The home page for Game Closet'
          }
        ],
        title: 'Game Closet'
      }
    },
    {
      path: '/closet',
      name: 'View Closet',
      component: Closet,
      meta: {
        tags: [
          {
            name: 'description',
            content: 'View your personal Game Closet'
          },
          {
            property: 'og:description',
            content: 'View your personal Game Closet'
          }
        ],
        title: 'Game Closet - Your Closet'
      }
    },
    {
      path: '/add-game',
      name: 'Add Game',
      component: AddGame,
      meta: {
        tags: [
          {
            name: 'description',
            content: 'Add a game to your Game Closet'
          },
          {
            property: 'og:description',
            content: 'Add a game to your Game Closet'
          }
        ],
        title: 'Game Closet - Add A Game'
      }
    },
    {
      path: '/update-game',
      name: 'Update Game',
      component: UpdateGame,
      props: true,
      meta: {
        tags: [
          {
            name: 'description',
            content: 'Update a game in your Game Closet'
          },
          {
            property: 'og:description',
            content: 'Update a game in your Game Closet'
          }
        ],
        title: 'Game Closet - Update a Game'
      }
    }
  ]
})
router.beforeEach(function (to, from, next) {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  }
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.tags)
  if (!nearestWithMeta) {
    return next()
  }
  const stale = document.querySelectorAll('[data-vue-router-controlled]');
  [...stale].map(tag => tag.parentNode.removeChild(tag))
  nearestWithMeta.meta.tags
    .map(tag =>
      Object.assign(
        document.createElement('meta'),
        {
          'data-vue-router-controlled': ''
        },
        tag
      )
    )
    .forEach(meta => document.head.appendChild(meta))

  next()
})
export default router

/*
  // This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});
  */
