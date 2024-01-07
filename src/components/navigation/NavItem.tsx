import { PropsWithChildren, useState } from "react";
import { menuItemVariant } from "./animation";
import { motion } from "framer-motion";
import CustomLink from "./link";
import ArrowDown from "./ArrowDown";
import AnimatedTitle from "../AnimatedTitle";
import { NavBlogType, NavLinkType, NavPageType } from "./types";

type NavItemProps = {
  item: NavBlogType | NavPageType | NavLinkType
  className?: string
}

export function NavItem({ item, className }: NavItemProps) {
  const [animationComplete, setAnimationComplete] =
    useState(false);

  switch (item._type) {
    case 'navBlog': {
      return (
        <motion.div
          variants={menuItemVariant}
          key={item._id}
          onAnimationComplete={() => setAnimationComplete(true)}
          className={className}
        >
          <BlogNavItem item={item} animate={animationComplete} />
        </motion.div>
      );
    }
    case 'navPage':
    case 'navLink': {
      return (
        <motion.div
          variants={menuItemVariant}
          key={item._id}
          onAnimationComplete={() => setAnimationComplete(true)}
          className={className}
        >
          <PageLink item={item}>
            <AnimatedTitle
              title={item.title}
              animate={animationComplete}
              className="hover:underline"
            />
          </PageLink>
        </motion.div>
      );
    }
    default: {
      return null;
    }
  }
}

type Props = {
  item: NavBlogType | NavPageType | NavLinkType
}

export function BlogNavItem({ item, animate }: { item: NavBlogType, animate: boolean }) {
  return (
    <CustomLink {...item} className="py-2 hover:underline">
      <div className="flex">
        <ArrowDown className='opacity-0' />
          <AnimatedTitle
            title={`${item.title}`}
            animate={animate}
            className="inline group-hover:underline"
          />
      </div>
    </CustomLink>
  )
}

export function PageLink({children, item}: PropsWithChildren<Props>) {
  return (
    <CustomLink {...item} className="flex">
      <ArrowDown className='opacity-0'/>
      {children}
    </CustomLink>
  )
}