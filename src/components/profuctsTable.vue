<template>
  <a-table
    :columns="columns"
    @change="changeTable"
    :data-source="tableData"
    :pagination="page"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="editprouduct(record)">编辑</a-button>
      <a-button @click="removeprouduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
// import api from '@/api/product';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'opertion',
    key: 'opertion',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  props: ['data', 'page', 'categoryList'],
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changeTable(page) {
      console.log(page);
      this.$emit('change', page);
    },
    editprouduct(record) {
      this.$emit('edit', record);
    },
    removeprouduct(record) {
      this.$emit('remove', record);
    },
  },
};
</script>
<style scoped>
.div {
  text-align: center;
}
</style>
