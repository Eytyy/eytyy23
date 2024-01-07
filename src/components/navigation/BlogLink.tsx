import React from 'react'
import { NavItem } from './NavItem'

type Props = {}

export default function BlogLink({}: Props) {
  return (
    <NavItem
      item={{
        _type: "navPage",
        _id: "all-posts",
        title: "Read All",
        slug: "/blog",
      }}
    />
  )
}