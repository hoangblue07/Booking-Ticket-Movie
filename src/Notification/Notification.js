import {  notification } from 'antd';



const notifiFuntion = (type, mess, desc='') => {
  notification[type]({
        message: mess,
        description:desc
      });
}
export default notifiFuntion;