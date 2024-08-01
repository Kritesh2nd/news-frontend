export const dashboardSideBarTest: DashMainSideBarIntf[] = [
  {
    name: "Letter A",
    icon: "Icon A",
    link: [
      {
        name: "Apple",
        link: "Link Apple",
        icon: "Icon Apple",
      },
      {
        name: "Angle",
        link: "Link Angle",
        icon: "Icon Angle",
      },
      {
        name: "Axe",
        link: "Link Axe",
        icon: "Icon Axe",
      },
    ]
  },
  {
    name: "Letter B",
    icon: "Icon B",
    link: [
      {
        name: "Ball",
        link: "Link Ball",
        icon: "Icon Ball",
      },
      {
        name: "Bat",
        link: "Link Bat",
        icon: "Icon Bat",
      },
      {
        name: "Bag",
        link: "Link Bag",
        icon: "Icon Bag",
      },
      {
        name: "Bean",
        link: "Link Bean",
        icon: "Icon Bean",
      }
    ]
  }

];
/*

article (crud)
  create
  read
  update

manage
  main-headlines
  main-left
  main-center
  main-right

  visual-stories

staticis
  

user

*/






export interface DashMainSideBarIntf {
  name: string,
  icon: string,
  link: DashSideBarIntf [],
}


export interface DashSideBarIntf {
  name: string,
  link: string,
  icon: string,
}