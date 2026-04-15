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
  </div>
</template>

<script setup lang="ts">
import TableSearch from "@/components/TableSearch.vue";
import PageHead from "@/components/PageHead.vue";

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
    options: [
      {label: "Mental Health", value: 1},
      {label: "Physical Health", value: 2},
      {label: "Nutrition", value: 3},
    ],
    placeholder: "please select category",
  },
];
const handleSearch = (formData: Record<string, any>) => {
  console.log("Search with form data:", formData);
};
</script>
