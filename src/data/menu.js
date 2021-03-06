const menu = [
  {
    title:'活动管理',
    icon:'appstore',
    key: '/activities',
  },
  {
    title:'促销管理',
    icon:'appstore',
    key: '/promotion',
  },
  {
    title:'商品管理',
    icon:'appstore',
    key: '/goods',
    sub:[
      {
        title:'商品列表',
        icon:'bars',
        key:'/goods/list'
      },
      {
        title:'添加商品',
        icon:'plus',
        key:'/goods/add'
      }
    ]
  },
  {
    title:'分类管理',
    icon:'appstore',
    key: '/categories',
  },
  {
    title:'订单管理',
    icon:'appstore',
    key: '/orders',
  },
  {
    title:'课程管理',
    icon:'appstore',
    key: 'courses',
    sub:[
      {
        title:'课程列表',
        icon:'bars',
        key: '/courses/list',
      },
      {
        title:'添加课程',
        icon:'plus',
        key: '/courses/add',
      }
    ]
  },
  {
    title:'用户管理',
    icon:'appstore',
    key: 'users',
    sub:[
      // {
      //   title:'用户列表',
      //   icon:'bars',
      //   key: '/users/list',
      // },
      {
        title:'反馈',
        icon:'bars',
        key: '/users/feedback',
      }
    ]
  }
]

export default menu