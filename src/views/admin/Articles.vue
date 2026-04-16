<template>
  <div>
    <PageHead>
      <template #title>Articles</template>
      <template #buttons>
        <el-button type="primary">Create New Article</el-button>
        <el-button type="default">Edit</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch" />

    <el-table :data="tableData" style="width: 100%; margin-top: 20px">
      <!-- <el-table-column prop="id" label="ID" width="80" /> -->
      <el-table-column prop="title" label="Title" fixed />
      <el-table-column prop="categoryId" label="Category">
        <template #default="{row}">
          {{ categoryMap[row.categoryId] }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status">
        <template #default="{row}">
          {{
            row.status === 0
              ? "Draft"
              : row.status === 1
                ? "Published"
                : "Archived"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Created At" />
      <!-- <el-table-column prop="updatedAt" label="Updated At" /> -->
      <el-table-column label="Actions" width="250" fixed="right">
        <template #default="{row}">
          <el-button type="primary" text>Edit</el-button>
          <el-button
            v-if="row.status === 0 || row.status === 2"
            text
            type="success">
            Publish
          </el-button>
          <el-button v-if="row.status === 1" text type="warning">
            Hide
          </el-button>
          <el-button text type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive} from "vue";
import TableSearch from "@/components/TableSearch.vue";
import PageHead from "@/components/PageHead.vue";
import {categoryTree, articlePage} from "@/api/admin";
const formItem = [
  {
    comp: "input",
    prop: "title",
    label: "Title",
    placeholder: "please input title",
  },
  {
    comp: "select",
    prop: "categoryId",
    label: "Category",
    placeholder: "please select category",
  },
  {
    comp: "select",
    prop: "status",
    label: "Status",
    placeholder: "please select status",
    options: [
      {label: "Draft", value: 0},
      {label: "Published", value: 1},
      {label: "Archived", value: 2},
    ],
  },
];
const tableData = ref([]);
const categoryMap = reactive([]);
const categories = ref([]);
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});
onMounted(async () => {
  const data = await categoryTree();
  categories.value = data.map((item) => {
    categoryMap[item.id] = item.categoryName;
    return {
      label: item.categoryName,
      value: item.id,
    };
  });
  formItem[1].options = categories.value;

  handleSearch();
});
const handleSearch = async (formData: Record<string, any> = {}) => {
  console.log(formData);
  const params = {
    ...pagination,
    ...formData,
  };
  const {records, total} = await articlePage(params);
  tableData.value = records;
  pagination.total = total;
};
</script>
