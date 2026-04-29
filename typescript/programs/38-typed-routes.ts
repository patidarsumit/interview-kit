const routes = {
  home: '/',
  user: '/users/:id',
  settings: '/settings',
} as const;

type RouteName = keyof typeof routes;
type RoutePath = (typeof routes)[RouteName];

function navigate(route: RouteName): RoutePath {
  return routes[route];
}

console.log(navigate('home'));

