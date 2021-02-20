<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8" v-for= "user in userList"  :key = "user.title">
        <a-card  :title="user.title" :bordered="false">
          <p>{{user.content}}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userList: [
        { title: '商品总览', content: 50 },
        { title: '用户总览', content: 10 },
        { title: '销售总览', content: 60 },

      ],

    };
  },
};
</script>
