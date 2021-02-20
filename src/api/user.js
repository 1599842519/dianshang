// 用户操作接口的管理
import axios from '@/axios';
// module default
export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
};
