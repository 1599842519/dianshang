<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="副标题" required prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择商品类目"
          @change="changeCategory"
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请添加商品子类目">
          <a-select-option v-for="c in cateList" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select
          mode="tags"
          placeholder="填写需要的标签"
          :default-value="['包邮，48小时内发货']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，48小时内发货">
            包邮，48小时内发货
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapperCol ="{ span: 24 }">
        <a-button type = "primary " @click="next" >
            下一页
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/category';

export default {
  data() {
    return {

      rules: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      categoryList: [],
      cateList: [],
    };
  },
  props: ['form'],
  async created() {
    await api.list().then((res) => {
      this.categoryList = res.data;
      console.log(this.categoryList);
    });
  },
  methods: {
    changeCategory(c) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (c === this.categoryList[i].id) {
          this.cateList = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          console.log(this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    //   console.log(this.form);
    },
    // changeCategory(category) {
    //   console.log(category);
    //   console.log(this.categoryList);

    //   // this.cateList = category.cateList;
    //   for (let i = 0; i < this.categoryList.length; i += 1) {
    //     console.log(category);
    //     if (this.categoryList[i].id === category) {
    //       console.log(this.categoryList[i].c_item);
    //       this.cateList = this.categoryList[i].c_item;
    //       console.log(this.cateList);
    //     }
    //   }
    // },
  },
};
</script>
