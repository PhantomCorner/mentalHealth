<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? 'Edit Article' : 'Create Article'"
    width="50%"
    @close="handleClose">
    <el-form :model="formData" label-width="120px" ref="formRef">
      <el-form-item label="Title" prop="title">
        <el-input v-model="formData.title" placeholder="Enter article title" />
      </el-form-item>
      <el-form-item label="Content" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          placeholder="Enter article content"
          :rows="10" />
      </el-form-item>
      <el-form-item label="Category" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="Select category">
          <el-option
            v-for="item in props.categories"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Summary" prop="summary">
        <el-input
          v-model="formData.summary"
          type="textarea"
          placeholder="Enter article summary"
          :rows="4" />
      </el-form-item>
      <el-form-item label="Tag" prop="tagArray">
        <el-select
          v-model="formData.tagArray"
          placeholder="Enter article tag"
          multiple
          filterable
          allow-create
          width="100%">
          <el-option
            v-for="item in commonTags"
            :key="item"
            :label="item"
            :value="item" />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="Cover Image">
        <el-upload
          v-model:file-list="formData.coverImage"
          action="#"
          :http-request="handleIMGUpload"
          :before-upload="beforeIMGUpload"
          accept="image/*">
          <div v-if="!imgURL" class="cover-placeholder">
            <p>Click to upload</p>
          </div>
          <img v-else :src="imgURL" class="cover-preview" />
        </el-upload>
        <el-button type="primary">Upload Cover Image</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
        <el-button @click="handleClose">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, reactive, computed, watch} from "vue";
import {ElMessage} from "element-plus";
import {uploadFile, createArticle, editArticle} from "@/api/admin";

const formData = reactive({
  title: "",
  content: "",
  coverImage: "",
  categoryId: 1,
  summary: "",
  tagArray: undefined as any[] | undefined,
  tags: "",
  id: "",
});
const commonTags = [
  "Mental Health",
  "Wellness",
  "Self-Care",
  "Therapy",
  "Anxiety",
  "Depression",
  "Mindfulness",
  "Stress Management",
];
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  article: {
    type: Object,
    default: null,
  },
});
const businessId = ref();
const formRef = ref();

// if has id, its create
// if no id, its edit
const isEdit = computed(() => !!props.article?.id);
watch(
  () => props.article,
  (newVal) => {
    if (newVal) {
      Object.assign(formData, newVal);
      businessId.value = newVal.id;
    } else {
      Object.assign(formData, {
        title: "",
        content: "",
        coverImage: "",
        categoryId: 1,
        summary: "",
        tagArray: undefined,
        tags: "",
        id: "",
      });
    }
  },
);
const emit = defineEmits(["update:modelValue", "success"]);
const dialogVisible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const imgURL = ref("");
const handleIMGUpload = async (file) => {
  businessId.value = crypto.randomUUID();
  const res = await uploadFile(file, {businessId: businessId});
  console.log(res);
};

const beforeIMGUpload = (file) => {
  console.log(file);
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    ElMessage.error("You can only upload image files!");
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  try {
    const submitData = {
      ...formData,
      tags: formData.tagArray.join(","),
    };
    delete submitData.tagArray;
    // console.log(submitData);

    if (!isEdit.value) {
      submitData.id = businessId.value;
      createArticle(submitData).then((res) => {
        emit("success");
      });
    } else {
      editArticle(props.article.id, submitData).then((res) => {
        emit("success");
      });
    }
  } catch (err) {
    console.error("Failed to create article", err);
    ElMessage.error("Failed to create article");
  }
};
const handleClose = () => {
  formRef.value?.resetFields();

  formData.tagArray = undefined;
  formData.coverImage = "";
  formData.id = "";
  businessId.value = null;
  emit("update:modelValue", false);
};
</script>

<style scoped>
.cover-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  color: #999;
}
</style>
