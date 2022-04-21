export default class SettingsItem {
   constructor(className, items) {
      this.menuListClass = className
      this.menuItem = items
   }

   selectMenuItem() {
      const menuList = document.querySelectorAll(this.menuListClass)
      menuList.forEach((listItem, key) => {
         listItem.onclick = () => {
            if (!listItem.classList.contains('uk-nav-header'))
            [...menuList].filter((item, i) => {
               if (item.classList.contains('uk-active')) {
                  item.classList.remove('uk-active')
                 document.querySelector(this.menuItem[i+1].selector).classList.add('uk-hidden')
               }
            })
            listItem.classList.add('uk-active')
            document.querySelector(this.menuItem[key+1].selector).classList.remove('uk-hidden')
         }
      })
   }
}