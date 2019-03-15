import store from '../store/store'

import DashboardLayout from '@/pages/Dashboard/Layout/DashboardLayout.vue'
import AuthLayout from '@/pages/Dashboard/Pages/AuthLayout.vue'

// Dashboard pages
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import Widgets from '@/pages/Dashboard/Widgets.vue'
import VueRouter from 'vue-router'

// Pages
const User = () => import('@/pages/Dashboard/Pages/UserProfile.vue')
const userConfig = () => import('../pages/user/configuration.vue')
const Pricing = () => import('@/pages/Dashboard/Pages/Pricing.vue')
const TimeLine = () => import('@/pages/Dashboard/Pages/TimeLinePage.vue')
const RtlSupport = () => import('@/pages/Dashboard/Pages/RtlSupport.vue')
const Login = () => import('@/pages/Dashboard/Pages/Login.vue')
const Register = () => import('@/pages/Dashboard/Pages/Register.vue')
const Lock = () => import('@/pages/Dashboard/Pages/Lock.vue')

// Components pages
const Buttons = () => import('@/pages/Dashboard/Components/Buttons.vue')
const GridSystem = () => import('@/pages/Dashboard/Components/GridSystem.vue')
const Panels = () => import('@/pages/Dashboard/Components/Panels.vue')
const SweetAlert = () => import('@/pages/Dashboard/Components/SweetAlert.vue')
const Notifications = () =>
  import('@/pages/Dashboard/Components/Notifications.vue')
const Icons = () => import('@/pages/Dashboard/Components/Icons.vue')
const Typography = () => import('@/pages/Dashboard/Components/Typography.vue')

// Forms pages
const RegularForms = () => import('@/pages/Dashboard/Forms/RegularForms.vue')
const ExtendedForms = () => import('@/pages/Dashboard/Forms/ExtendedForms.vue')
const ValidationForms = () =>
  import('@/pages/Dashboard/Forms/ValidationForms.vue')
const Wizard = () => import('@/pages/Dashboard/Forms/Wizard.vue')

// TableList pages
const RegularTables = () => import('@/pages/Dashboard/Tables/RegularTables.vue')
const ExtendedTables = () =>
  import('@/pages/Dashboard/Tables/ExtendedTables.vue')
const PaginatedTables = () =>
  import('@/pages/Dashboard/Tables/PaginatedTables.vue')

// Maps pages
const GoogleMaps = () => import('@/pages/Dashboard/Maps/GoogleMaps.vue')
const FullScreenMap = () => import('@/pages/Dashboard/Maps/FullScreenMap.vue')
const VectorMaps = () => import('@/pages/Dashboard/Maps/VectorMaps.vue')

// Calendar
const Calendar = () => import('@/pages/Dashboard/Calendar.vue')
// Charts
const Charts = () => import('@/pages/Dashboard/Charts.vue')

// Unabase

// VENTAS
const Income = () => import('@/pages/incomes/income.vue')
const Incomes = () => import('@/pages/incomes/incomes.vue')
const Restart = () => import('@/pages/auth/Restart.vue')

// COMPRAS
const Outcomes = () => import('@/pages/outcomes/outcomes.vue')

// verify user

// USUARIO
// PERFIL
const userProfile = () => import('@/pages/user/profile.vue')

// EMPRESA
// LISTADO
const businessList = () => import('@/pages/business/company_list.vue')
// EMPRESA
// CREAR
const company = () => import('@/pages/business/company.vue')

// ITEMS
const Items = () => import('@/pages/items/items.vue')
const Item = () => import('@/pages/items/item.vue')

// MENU
const Menu = () => import('@/pages/menu/menu.vue')

// EXTERNAL
// SHOW MOVEMENT
const externalMovement = () => import('@/pages/external/showMovement.vue')
const PageNotFound = () => import('@/pages/external/PageNotFound.vue')

let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  name: 'Components',
  children: [{
      path: 'buttons',
      name: 'Buttons',
      components: {
        default: Buttons
      }
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      components: {
        default: GridSystem
      }
    },
    {
      path: 'panels',
      name: 'Panels',
      components: {
        default: Panels
      }
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      components: {
        default: SweetAlert
      }
    },
    {
      path: 'notifications',
      name: 'Notifications',
      components: {
        default: Notifications
      }
    },
    {
      path: 'icons',
      name: 'Icons',
      components: {
        default: Icons
      }
    },
    {
      path: 'typography',
      name: 'Typography',
      components: {
        default: Typography
      }
    }
  ]
}
let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  name: 'Forms',
  children: [{
      path: 'regular',
      name: 'Regular Forms',
      components: {
        default: RegularForms
      }
    },
    {
      path: 'extended',
      name: 'Extended Forms',
      components: {
        default: ExtendedForms
      }
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      components: {
        default: ValidationForms
      }
    },
    {
      path: 'wizard',
      name: 'Wizard',
      components: {
        default: Wizard
      }
    }
  ]
}

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  name: 'Tables',
  children: [{
      path: 'regular',
      name: 'Regular Tables',
      components: {
        default: RegularTables
      }
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      components: {
        default: ExtendedTables
      }
    },
    {
      path: 'paginated',
      name: 'Pagianted Tables',
      components: {
        default: PaginatedTables
      }
    }
  ]
}

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  name: 'Maps',
  redirect: '/maps/google',
  children: [{
      path: 'google',
      name: 'Google Maps',
      components: {
        default: GoogleMaps
      }
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
      meta: {
        hideContent: true,
        hideFooter: true,
        navbarAbsolute: true
      },
      components: {
        default: FullScreenMap
      }
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
      components: {
        default: VectorMaps
      }
    }
  ]
}

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  name: 'Pages',
  redirect: '/pages/user',
  children: [{
      path: 'user',
      name: 'User Page',
      components: {
        default: User
      }
    },
    {
      path: 'timeline',
      name: 'Timeline Page',
      components: {
        default: TimeLine
      }
    },
    {
      path: 'rtl',
      name: 'وحة القيادة',
      meta: {
        rtlActive: true
      },
      components: {
        default: RtlSupport
      }
    }
  ]
}

let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [{
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guestOnly: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guestOnly: true
      }
    },
    {
      path: '/restart',
      name: 'Restart',
      component: Restart,
      meta: {
        guestOnly: true
      }
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: Pricing
    },
    {
      path: '/lock',
      name: 'Lock',
      component: Lock
    }
  ]
}

const routes = [{
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    meta: {
      requireAuth: true,
      navOptions: [

        {
          icon: 'notifications',
          function: false,
          isLink: {
            route: '/imbox'
          }
        }

      ],
    }
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  authPages,
  {
    path: '/',
    component: DashboardLayout,
    children: [{
        path: 'dashboard',
        name: 'Dashboard',
        components: {
          default: Dashboard
        },
        meta: {
          navOptions: [

            {
              icon: 'notifications',
              function: false,
              isLink: {
                route: '/imbox'
              }
            }

          ],
          requireAuth: true
        }
      },
      {
        path: 'calendar',
        name: 'Calendar',
        components: {
          default: Calendar
        },
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'charts',
        name: 'Charts',
        components: {
          default: Charts
        },
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'widgets',
        name: 'Widgets',
        components: {
          default: Widgets
        },
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'income/:id',
        name: 'Income',
        components: {
          default: Income
        },
        meta: {
          navOptions: [{
              icon: 'message',
              function: 'displayDialogMsg',
              isLink: false,
              desktop: true
            },

            {
              icon: 'share',
              function: 'shareBottom',
              isLink: false,
              desktop: true
            },
            {
              icon: 'delete',
              function: 'deleteIncome',
              isLink: false,
              desktop: true
            }
          ],

          requireAuth: true
        }
      },
      {
        path: 'outcome/:id',
        name: 'Outcome',
        components: {
          default: Income
        },
        meta: {
          navOptions: [
            // {
            //   icon: 'find_in_page',
            //   function: 'showInvoice',
            //   isLink: false
            // },
            {
              icon: 'message',
              function: 'handleMessages',
              isLink: false
            }
            // {
            //   icon: 'delete',
            //   function: 'deleteIncome',
            //   isLink: false
            // },
          ],

          requireAuth: true
        }
      },
      {
        path: '/outcome',
        name: 'Outcome',
        components: {
          default: Income
        },
        meta: {
          navOptions: [{
            icon: 'share',
            function: 'shareBottom',
            isLink: false
          }],

          requireAuth: true
        }
      },

      {
        path: 'income',
        name: 'Income',
        components: {
          default: Income
        },
        meta: {
          requireAuth: true,
          navOptions: [{
            icon: 'share',
            function: 'shareBottom',
            isLink: false
          }]
        }
      },
      {
        path: 'incomes',
        name: 'Incomes',
        components: {
          default: Incomes
        },
        meta: {
          navOptions: [
            // {
            //   icon: 'search',
            //   function: 'searchBlock',
            //   isLink: false,
            //   desktop: false
            // },
            // {
            //   icon: 'keyboard_arrow_down',
            //   function: 'showMore',
            //   isLink: false
            // },
            {
              icon: 'add',
              function: false,
              isLink: {
                route: '/income'
              }
            }
          ],
          navSubOptions: [{
              name: 'Pendientes',
              icon: 'watch_later',
              function: 'filterIncomes',
              params: {
                0: 'pendings'
              }
            },
            {
              name: 'Finalizadas',
              icon: 'check_circle',
              function: 'filterIncomes',
              params: {
                0: 'solds'
              }
            },
            {
              name: 'Anuladas',
              icon: 'remove_circle',
              function: 'filterIncomes',
              params: {
                0: 'anulated'
              }
            }
          ],

          requireAuth: true,
          isList: true
        }
      },

      {
        path: 'outcomes',
        name: 'Outcomes',
        components: {
          default: Outcomes
        },
        meta: {
          navOptions: [
            // {
            //   icon: 'search',
            //   function: 'searchBlock',
            //   isLink: false
            // },
            // {
            //   icon: 'keyboard_arrow_down',
            //   function: 'showMore',
            //   isLink: false
            // },
            {
              icon: 'add',
              function: false,
              isLink: {
                route: '/outcome'
              }
            }
          ],
          navSubOptions: [{
              name: 'Pendientes',
              icon: 'watch_later',
              function: 'filterIncomes',
              params: {
                0: 'pendings'
              }
            },
            {
              name: 'Finalizadas',
              icon: 'check_circle',
              function: 'filterIncomes',
              params: {
                0: 'solds'
              }
            },
            {
              name: 'Anuladas',
              icon: 'remove_circle',
              function: 'filterIncomes',
              params: {
                0: 'anulated'
              }
            }
          ],

          requireAuth: true,
          isList: true
        }
      },

      {
        path: 'user/profile',
        name: 'userProfile',
        components: {
          default: userProfile
        },
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'user/config',
        name: 'userConfig',
        components: {
          default: userConfig
        },
        meta: {
          navOptions: [{
            icon: 'save',
            function: 'saveConfig',
            isLink: false,
            desktop: true
          }],
          requireAuth: true
        }
      },
      {
        path: '/menu',
        name: 'Menu',
        components: {
          default: Menu
        },
        meta: {
          requireAuth: true
        }
      },

      {
        path: '/items',
        name: 'Items',
        components: {
          default: Items
        },
        meta: {
          requireAuth: true,
          isList: true,
          navOptions: [{
            icon: 'add',
            function: false,
            isLink: {
              route: '/item'
            }
          }],
          isList: true
        }
      },

      {
        path: '/item',
        name: 'Item',
        components: {
          default: Item
        },
        meta: {
          requireAuth: true,
          navOptions: [{
            icon: 'save',
            function: 'createItem',
            isLink: false,
            desktop: true
          }]
        }
      },

      {
        path: '/item/:id',
        name: 'Item',
        components: {
          default: Item
        },
        meta: {
          requireAuth: true,

          navOptions: [{
              icon: 'save',
              function: 'createItem',
              isLink: false,
              desktop: true
            },
            {
              icon: 'delete',
              function: 'deleteItem',
              isLink: false,
              desktop: true
            }
          ]
        }
      },

      {
        path: 'user/business',
        name: 'businessList',
        components: {
          default: businessList
        },
        meta: {
          navOptions: [{
            icon: 'add',
            function: false,
            isLink: {
              route: '/user/company'
            }
          }],
          requireAuth: true,
          isList: true
        }
      },
      {
        path: '/user/company',
        name: 'company',
        components: {
          default: company
        },
        meta: {
          navOptions: [{
            icon: 'save',
            function: 'saveCompany',
            isLink: false,
            desktop: true
          }],
          requireAuth: true
        }
      },
      {
        path: '/user/company/:id',
        name: 'company',
        components: {
          default: company
        },
        meta: {
          navOptions: [{
              icon: 'save',
              function: 'saveCompany',
              isLink: false,
              desktop: true
            },

            {
              icon: 'delete',
              function: 'deleteCompany',
              desktop: true,
              isLink: false
            }
          ],

          requireAuth: true
        }
      },
      // SOLO PARA USUARIOS QUE NO ESTEN REGISTRADOS
      {
        path: '/movement/:id',
        name: '',
        components: {
          default: externalMovement
        },
        meta: {
          hideNavbar: true,
          hideBottomBar: true,
          movementType: ''
        }
      },
      {
        path: '/404',
        name: '404',
        components: {
          default: PageNotFound
        },
        meta: {
          hideNavbar: true,
          hideBottomBar: true
        }
      }
    ]
  }
]

let router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: 'nav-item active'
})

router.beforeEach((to, from, next) => {
  // if (!to.matched.length) {
  //   next('/dashboard');
  // } else {
  //   next();
  // }

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.getters['users/isLogged']) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (store.getters['users/isLogged']) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
