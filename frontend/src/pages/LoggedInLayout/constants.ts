export const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export const pagesName = {
  post: "Post",
  authors: "Authors",
  create_post: "Create post",
};
export const navigation = (current?: string) => {
  return [
    { name: "Post", current: current === pagesName.post },
    { name: "Authors", current: current === pagesName.authors },
    { name: "Create post", current: current === pagesName.create_post },
  ];
};
export const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
