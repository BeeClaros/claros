export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "Approach", href: "/approach" },
  { label: "Assessment", href: "/assessment" },
  { label: "Implementation", href: "/implementation" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Contact", href: "/contact" },
];

export const primaryAction = {
  label: "Start a conversation",
  href: "/contact",
} as const;
