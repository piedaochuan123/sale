import request from '@/custom/request'

export const transaction=data=>request.post('transaction.php',data)