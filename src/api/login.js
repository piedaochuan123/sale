import request from '@/custom/request'

export const login=data=>request.post('login.php',data)
