<template>
  <div>
    <PageHead title="Emotions" />
    <TableSearch :form-item="formItem" @search="handleSearch" />
    <el-table :data="tableData">
      <el-table-column prop="username" label="Username" link />

      <el-table-column prop="nickname" label="Nickname" link />

      <el-table-column prop="diaryDate" label="Diary Date" link />

      <el-table-column prop="moodScore" label="Mood Score">
        <template #default="{row}">
          <el-rate
            v-model="row.moodScore"
            disabled
            show-score
            text-color="#ff9900" />
        </template>
      </el-table-column>
      <el-table-column label="Operation">
        <template #default="{row}">
          <el-button link type="primary" @click="viewSessionDetail(row)">
            Details
          </el-button>
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
    <el-dialog v-model="dialogVisible" title="Emotion Details" width="600px">
      <div class="emotion-details">
        <div class="detail-row">
          <div class="detail-label">Username:</div>
          <div class="detail-value">{{ selectedEmotion?.username }}</div>
        </div>

        <div class="detail-row">
          <div class="detail-label">Nickname:</div>
          <div class="detail-value">{{ selectedEmotion?.nickname || "-" }}</div>
        </div>

        <div class="detail-row">
          <div class="detail-label">Diary Date:</div>
          <div class="detail-value">{{ selectedEmotion?.diaryDate }}</div>
        </div>

        <div class="detail-row">
          <div class="detail-label">Mood Score:</div>
          <div class="detail-value">
            <el-rate
              v-model="selectedEmotion.moodScore"
              disabled
              show-score
              text-color="#ff9900"
              score-template="分" />
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-label">Dominant Emotion:</div>
          <div class="detail-value">
            <el-tag :type="getEmotionTagType(selectedEmotion?.dominantEmotion)">
              {{ selectedEmotion?.dominantEmotion || "-" }}
            </el-tag>
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-label">Sleep Quality:</div>
          <div class="detail-value">
            <el-progress
              :percentage="(selectedEmotion?.sleepQuality || 0) * 25"
              :format="() => `${selectedEmotion?.sleepQuality || 0}/4`"
              :stroke-width="10" />
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-label">Stress Level:</div>
          <div class="detail-value">
            <el-progress
              :percentage="(selectedEmotion?.stressLevel || 0) * 20"
              :color="getStressColor(selectedEmotion?.stressLevel)"
              :format="() => `${selectedEmotion?.stressLevel || 0}/5`"
              :stroke-width="10" />
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-label">AI Analysis Status:</div>
          <div class="detail-value">
            <el-tag :type="getStatusTagType(selectedEmotion?.aiAnalysisStatus)">
              {{ getStatusText(selectedEmotion?.aiAnalysisStatus) }}
            </el-tag>
          </div>
        </div>

        <div class="detail-row detail-row-full">
          <div class="detail-label">Diary Content:</div>
          <div class="detail-value content-value">
            {{ selectedEmotion?.diaryContent || "-" }}
          </div>
        </div>

        <div class="detail-row">
          <div class="detail-label">Created At:</div>
          <div class="detail-value">{{ selectedEmotion?.createdAt }}</div>
        </div>
      </div>

      <div v-if="aiAnalysisData" class="ai-analysis-section">
        <div class="section-title">
          <span>🤖 AI Emotion Analysis</span>
        </div>

        <div class="analysis-card">
          <div class="analysis-header">
            <div class="primary-emotion">
              <span class="emotion-icon">{{ aiAnalysisData.icon }}</span>
              <span class="emotion-label">
                {{ aiAnalysisData.primaryEmotion }}
              </span>
              <el-tag
                :type="aiAnalysisData.isNegative ? 'danger' : 'success'"
                size="small">
                {{ aiAnalysisData.isNegative ? "Negative" : "Positive" }}
              </el-tag>
            </div>
            <div class="emotion-score">
              <el-progress
                type="circle"
                :percentage="aiAnalysisData.emotionScore"
                :width="80"
                :color="getScoreColor(aiAnalysisData.emotionScore)" />
            </div>
          </div>

          <div class="analysis-detail">
            <div class="detail-item">
              <span class="item-label">Risk Level:</span>
              <span class="item-value">
                <el-tag
                  :type="getRiskLevelType(aiAnalysisData.riskLevel)"
                  size="small">
                  {{ getRiskLevelText(aiAnalysisData.riskLevel) }}
                </el-tag>
              </span>
            </div>

            <div class="detail-item">
              <span class="item-label">Risk Description:</span>
              <span class="item-value">
                {{ aiAnalysisData.riskDescription }}
              </span>
            </div>

            <div class="detail-item">
              <span class="item-label">Keywords:</span>
              <div class="keywords">
                <el-tag
                  v-for="(keyword, index) in aiAnalysisData.keywords"
                  :key="index"
                  size="small"
                  type="info"
                  effect="plain">
                  {{ keyword }}
                </el-tag>
              </div>
            </div>

            <div class="detail-item">
              <span class="item-label">Suggestion:</span>
              <span class="item-value suggestion-text">
                {{ aiAnalysisData.suggestion }}
              </span>
            </div>

            <div
              class="detail-item"
              v-if="aiAnalysisData.improvementSuggestions">
              <span class="item-label">Improvements:</span>
              <div class="improvement-list">
                <div
                  v-for="(item, index) in aiAnalysisData.improvementSuggestions"
                  :key="index"
                  class="improvement-item">
                  <span class="bullet">•</span>
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Close</el-button>
        </span>
      </template>
    </el-dialog>
    <el-pagination
      layout=" prev, pager, next"
      v-model:current="pagination.current"
      v-model:page-size="pagination.size"
      :page-sizes="[10, 20, 50]"
      :total="pagination.total" />
  </div>
</template>

<script setup lang="ts">
import {getEmotionPage, deleteEmotion} from "@/api/admin";
import {ref, reactive, onMounted, computed} from "vue";
import TableSearch from "@/components/TableSearch.vue";
import PageHead from "@/components/PageHead.vue";
import {ElMessage} from "element-plus";

const tableData = ref([]);
const pagination = reactive({
  current: 1,
  size: 10,
  total: 0,
});
const formItem = [
  {
    comp: "input",
    prop: "username",
    label: "Username",
    placeholder: "Enter username",
  },
  {
    comp: "select",
    prop: "moodScore",
    label: "Mood Score",
    placeholder: "Select mood score",
    options: [
      {label: "All", value: ""},

      {
        label: "low(1 - 3)",
        value: "1-3",
      },
      {
        label: "medium(4 - 6)",
        value: "4-6",
      },
      {
        label: "high(7 - 10)",
        value: "7-10",
      },
    ],
  },
];
const dialogVisible = ref(false);
const selectedEmotion = ref({});
onMounted(async () => {
  handleSearch();
});

const handleSearch = async (formData) => {
  const paramas = {
    ...pagination,
    ...formData,
  };
  const {records, total} = await getEmotionPage(paramas);
  tableData.value = records;
  pagination.total = total;
};

const viewSessionDetail = (row) => {
  console.log(row);
  dialogVisible.value = true;
  selectedEmotion.value = row;
};

const handleDelete = async (id) => {
  console.log("Delete emotion with id:", id);
  await deleteEmotion(id);
  ElMessage.success("Emotion entry deleted");
  handleSearch();
};

const aiAnalysisData = computed<AiEmotionAnalysis | null>(() => {
  if (!selectedEmotion.value?.aiEmotionAnalysis) return null;
  try {
    return JSON.parse(selectedEmotion.value.aiEmotionAnalysis);
  } catch (error) {
    console.error("Failed to parse AI analysis:", error);
    return null;
  }
});

const getScoreColor = (score: number) => {
  if (score >= 80) return "#67c23a";
  if (score >= 60) return "#409eff";
  if (score >= 40) return "#e6a23c";
  return "#f56c6c";
};

const getRiskLevelType = (level: number) => {
  if (level === 0) return "success";
  if (level === 1) return "warning";
  if (level === 2) return "danger";
  return "info";
};

const getRiskLevelText = (level: number) => {
  if (level === 0) return "No Risk";
  if (level === 1) return "Low Risk";
  if (level === 2) return "Medium Risk";
  if (level === 3) return "High Risk";
  return "Unknown";
};

const getEmotionTagType = (emotion: string) => {
  const typeMap: Record<string, string> = {
    Happy: "success",
    Calm: "info",
    Tired: "warning",
    Anxious: "danger",
    Sad: "danger",
  };
  return typeMap[emotion] || "info";
};

const getStressColor = (level: number) => {
  if (level <= 2) return "#67c23a";
  if (level <= 4) return "#e6a23c";
  return "#f56c6c";
};

const getStatusTagType = (status: string) => {
  const typeMap: Record<string, string> = {
    COMPLETED: "success",
    PENDING: "warning",
    PROCESSING: "primary",
    FAILED: "danger",
  };
  return typeMap[status] || "info";
};

const getStatusText = (status: string) => {
  const textMap: Record<string, string> = {
    COMPLETED: "Completed",
    PENDING: "Pending",
    PROCESSING: "Processing",
    FAILED: "Failed",
  };
  return textMap[status] || status;
};
</script>
<style scoped>
.emotion-details {
  padding: 10px 0;
  max-height: 500px;
  overflow-y: auto;
}

.detail-row {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.detail-row-full {
  flex-direction: column;
}

.detail-label {
  width: 130px;
  font-weight: 600;
  color: #606266;
  flex-shrink: 0;
  line-height: 32px;
}

.detail-value {
  flex: 1;
  color: #303133;
  line-height: 32px;
  word-break: break-word;
}

.content-value {
  background-color: #f5f7fa;
  padding: 12px;
  border-radius: 4px;
  line-height: 1.6;
  margin-top: 8px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
}

/* AI 分析区域 */
.ai-analysis-section {
  margin-top: 20px;
  border-top: 1px solid #e4e7ed;
  padding-top: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.analysis-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e4e7ed;
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.primary-emotion {
  display: flex;
  align-items: center;
  gap: 12px;
}

.emotion-icon {
  font-size: 32px;
}

.emotion-label {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.analysis-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.item-label {
  width: 130px;
  font-weight: 500;
  color: #606266;
  flex-shrink: 0;
}

.item-value {
  flex: 1;
  color: #303133;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}

.suggestion-text {
  line-height: 1.5;
  background-color: #ecf5ff;
  padding: 8px 12px;
  border-radius: 6px;
  color: #409eff;
}

.improvement-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.improvement-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #67c23a;
  font-size: 13px;
}

.bullet {
  color: #67c23a;
  font-weight: bold;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

/* Rate 组件样式 */
:deep(.el-rate) {
  display: inline-flex;
  vertical-align: middle;
}

:deep(.el-rate__text) {
  margin-left: 8px;
  color: #ff9900;
}

/* Progress 组件样式 */
:deep(.el-progress) {
  width: 80%;
}

:deep(.el-progress-bar__outer) {
  background-color: #ebeef5;
}

:deep(.el-progress-bar__inner) {
  transition: width 0.3s ease;
}

/* 滚动条样式 */
.emotion-details::-webkit-scrollbar {
  width: 6px;
}

.emotion-details::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}

.content-value::-webkit-scrollbar {
  width: 6px;
}

.content-value::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}
</style>
