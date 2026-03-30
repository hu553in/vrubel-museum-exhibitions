interface Link {
  label: string;
  route: string;
  external?: boolean;
}

export const isSideMenuLinkActive = (route: string, pathname: string, external = false) =>
  !external && route === pathname;

export const getSideMenuLinkKey = (link: Link) => link.route;
