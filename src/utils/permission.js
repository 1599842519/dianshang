const roleToRoute = {

  coustomer: [{
    name: 'product',
  }, {
    name: 'ProudectList',
  }, {
    name: 'productAdd',
  },
  {
    name: 'productEdit',
  },
  ],
  admin: [{
    name: 'product',
  }, {
    name: 'ProudectList',
  }, {
    name: 'productAdd',
  },
  {
    name: 'productEdit',
  },
  {
    name: 'Category',
  }],
};

/**
 *
 * @param {string} role
 * @param {array} routes
 *
 * 判断用户权限
 */
export default function getMenuRouter(role, routes) {
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(obj.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
