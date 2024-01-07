import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MainMenu({ onClick, activeMenu, front }: {
  onClick?: (id: string) => void;
  activeMenu?: string;
  front?: boolean;
}) {
  const mainMenu = front ? homepage_links : inner_links;
  return (
    <div className="flex gap-8 lg:gap-16">
      {
        mainMenu.map((item) => item.type === 'link' ?
          <Link
            key={item.id}
            href={item.href!}
            className={cn("text-lg md:text-2xl", activeMenu === item.id && "line-through")}
          >
            {item.title}
          </Link> : (
            <button
              key={item.id}
              onClick={() => onClick && onClick(item.value!)}
              className={cn("text-lg md:text-2xl", activeMenu === item.id && "line-through")}
            >
              {item.title}
            </button>
        ))
      }

    </div>
  );
}


const homepage_links: {
  title: string;
  id: string;
  value?: string;
  href?: string;
  type: 'button' | 'link';
}[] = [
  {
    title: "Work",
    id: "work",
    value: "projects",
    type: "button"
  },
  // {
  //   title: "Blog",
  //   id: "blog",
  //   value: "blog",
  //   type: "button"
  // },
  // {
  //   title: "Info",
  //   id: "info",
  //   href: "/info",
  //   type: "link"
  // },
  {
    title: "Contact",
    id: "contact",
    href: "/contact",
    type: "link"
  },
];


const inner_links: {
  title: string;
  id: string;
  value?: string;
  href?: string;
  type: 'link';
}[] = [
  {
    title: "Work",
    id: "work",
    type: "link",
    href: "/projects"
  },
  // {
  //   title: "Blog",
  //   id: "blog",
  //   type: "link",
  //   href: "/blog"
  // },
  // {
  //   title: "Info",
  //   id: "info",
  //   href: "/info",
  //   type: "link"
  // },
  {
    title: "Contact",
    id: "contact",
    href: "/contact",
    type: "link"
  },
];
