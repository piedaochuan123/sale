import request from '@/custom/request'


export const hot=()=>request.post('commodityHot.php')

export const publish=data=>request.post('publish.php',data)

export const detailsPage=data=>request.post('detailsPage.php',data)

export const myCommodity=data=>request.post('myCommodity.php',data)

export const removeCommodity=data=>request.post('removeCommodity.php',data)

export const commodityType=data=>request.post('commodityType.php',data)

export const historyTransaction=data=>request.post('historyTransaction.php',data)

export const shoppingCart=data=>request.post('shoppingCart.php',data)