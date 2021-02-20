<template>
  <div class="proudect-list">
    <!-- 搜索 -->
    <search @submit="searchSubmit" :data="categoryList" />
    <a-button class="btnadd">
      <router-link :to="{ name: 'productAdd' }"> 新增商品</router-link>
    </a-button>
    <profucts-table
      :data="tableDate"
      :page="page"
      @change="changePage"
      @remove="removeproduct"
      @edit="editProduct"
      :categoryList="categoryList"

    />
  </div>
</template>
<script>
import search from '@/components/search.vue';
import profuctsTable from '@/components/profuctsTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      tableDate: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    search,
    profuctsTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.page.total = res.total;
          this.tableDate = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      console.log(record);
      this.$router.push({
        name: 'productEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeproduct(record) {
      this.$confirm({
        okText: '确认',
        cancelText: '取消',
        title: '确认是否删除',
        content: () => (
          <div style="color:red;">{`是否删除标题为${record.title}的商品吗`}</div>
        ),
        onOk: () => {
          api
            .remove({
              id: record.id,
            })
            .then(() => {
              this.getTableData();
            });
        },
        onCancel() {},
        class: 'confirm-box',
      });
    },
  },
};
</script>
<style lang = "less">
.proudect-list {
  .btnadd {
    position: absolute;
    top: 55px;
    right: 80px;
  }
}
</style>
