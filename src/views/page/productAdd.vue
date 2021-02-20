<template>
  <div class="product-add">
    <div class="steps">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>

    <div class="steps-content">
      <basic-detail v-if="current === 0" @next="next" :form="form" />
      <sale-detail
        v-else-if="current === 1"
        @prev="prev"
        @next="next"
        :form="form"
      />
    </div>
  </div>
</template>

<script>
import basicDetail from '@/components/basicDetail.vue';
import saleDetail from '@/components/saleDetail.vue';
import api from '@/api/product';

export default {
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: '',
        c_item: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  components: {
    basicDetail,
    saleDetail,
  },
  created() {
    // console.log(this.$route);
    const { id } = this.$route.params;
    console.log(id);
    if (id) {
      api.detail(id).then((res) => {
        console.log(res);
        this.form = res;
      });
    }
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        console.log(this.form);
        if (this.$route.params.id) {
          console.log(this.form);
          api.edit(this.form).then((res) => {
            console.log(res);
            this.$message.success('修改商品成功');
            this.$router.push({
              name: 'ProudectList',
            });
          });
        } else {
          api.add(this.form).then((res) => {
            console.log(res);
            this.$message.success('新增商品成功');
            this.$router.push({
              name: 'ProudectList',
            });
          });
        }
      } else {
        this.current += 1;
      }
      console.log(form);
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style scoped>
.steps {
  width: 500px;
  margin: 80px auto;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
