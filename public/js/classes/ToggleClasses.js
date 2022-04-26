export default class Toggle {
   constructor(className, items) {
      this.menuListClass = className
      this.menuItem = settingsListItems
   }

   selectMenuItem() {
      const menuList = document.querySelectorAll(this.menuListClass)
      menuList.forEach((listItem, key) => {
         listItem.onclick = () => {
            if (listItem.classList.contains('uk-nav-header')) return
            [...menuList].filter((item, i) => {
               if (item.classList.contains('uk-active')) {
                  item.classList.remove('uk-active')
                 document.querySelector(this.menuItem[i-1].selector).classList.add('uk-hidden')
               }
            })
            listItem.classList.add('uk-active')
            document.querySelector(this.menuItem[key-1].selector).classList.remove('uk-hidden')
         }
      })
   }

   get listItems() {
      return this.menuItem
   }
}

const settingsListItems = [
   { id: '1', title: 'NOT USED', selector: '.my-acc' },
   { id: '2', title: 'account', selector: '.my-friends' },
   { id: '3', title: 'friends', selector: '.my-acc' },
   { id: '4', title: 'account', selector: '.my-acc' },
   { id: '5', title: 'account', selector: '.my-acc' },
   { id: '6', title: 'account', selector: '.my-acc' },
   { id: '7', title: 'account', selector: '.my-acc' },
   { id: '8', title: 'account', selector: '.my-acc' },
   { id: '9', title: 'account', selector: '.my-acc' },
   { id: '10', title: 'account', selector: '.my-acc' },
]