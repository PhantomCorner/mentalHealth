<template>
  <div>
    <PageHead>
      <template #title>Articles</template>
      <template #buttons>
        <el-button type="primary" @click="handleEdit({})">
          Create New Article
        </el-button>
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
          <el-button type="primary" link @click="handleEdit(row)">
            Edit
          </el-button>
          <el-popconfirm
            v-if="row.status === 0 || row.status === 2"
            :title="`Are you sure to publish article: ${row.title}?`"
            @confirm="handlePublish(row.id, 1)">
            <template #reference>
              <el-button link type="success">Publish</el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm
            v-if="row.status === 1"
            :title="`Are you sure to hide article: ${row.title}?`"
            @confirm="handlePublish(row.id, 0)">
            <template #reference>
              <el-button link type="warning">Hide</el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button link type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 25px"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.size"
      @current-change="handlePageChange" />

    <ArticleForm
      v-model:modelValue="dialogVisible"
      :categories="categories"
      @submit="handleSubmit"
      @success="handleSuccess"
      :article="currentArticle" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, reactive} from "vue";
import {ElMessage} from "element-plus";
import TableSearch from "@/components/TableSearch.vue";
import PageHead from "@/components/PageHead.vue";
import {
  categoryTree,
  articlePage,
  getArticleDetail,
  deleteArticle,
  updateArticleStatus,
} from "@/api/admin";
import ArticleForm from "@/components/ArticleForm.vue";
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
const currentArticle = ref(null);

const dialogVisible = ref(false);
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
  const params = {
    ...pagination,
    ...formData,
  };
  const {records, total} = await articlePage(params);
  tableData.value = records;
  pagination.total = total;
};

const handlePageChange = async (page: number) => {
  pagination.currentPage = page;
  handleSearch();
};
const handleSuccess = () => {
  dialogVisible.value = false;
  handleSearch();
};
const handleSubmit = () => {};
const handleEdit = async (row) => {
  if (!row.id) {
    dialogVisible.value = true;
    currentArticle.value = {};
  } else {
    const detail = await getArticleDetail(row.id);
    currentArticle.value = detail;
    dialogVisible.value = true;
  }
};
const handleDelete = async (id: string) => {
  console.log("Delete article with id", id);
  deleteArticle(id)
    .then(() => {
      ElMessage.success("Article deleted successfully");
      handleSearch();
    })
    .catch((err) => {
      console.log("Failed to delete article", err);
      ElMessage.error("Failed to delete article");
    });
};

const handlePublish = (id: string, status: number) => {
  updateArticleStatus(id, status)
    .then(() => {
      ElMessage.success(
        status === 1 ? "Article published successfully" : "Article hidden",
      );
      handleSearch();
    })
    .catch((err) => {
      console.log("Failed to update article status", err);
      ElMessage.error("Failed to update article status");
    });
};
</script>
