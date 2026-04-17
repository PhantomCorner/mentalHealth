<script setup lang="ts">
import {ref, onMounted, reactive} from "vue";
import {getConsultationPage, getConsultationDetail} from "@/api/admin";
const SenderType = {
  User: 1,
  AI: 2,
} as const;

const MessageType = {
  Text: 1,
  Image: 2,
  Voice: 3,
  Video: 4,
} as const;

interface Message {
  id: number;
  sessionId: number;
  senderType: (typeof SenderType)[keyof typeof SenderType];
  senderTypeDesc: string;
  messageType: (typeof MessageType)[keyof typeof MessageType];
  messageTypeDesc: string;
  content: string;
  createdAt: string;
  contentLength: number;
  contentPreview: string;
  aiModel?: string;
}
import PageHead from "@/components/PageHead.vue";
const dialogVisible = ref(false);
const tableData = ref([]);
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});
const messages = ref<Message[]>([]);
onMounted(async () => {
  const res = await getConsultationPage({});
  const {records, total} = res;

  tableData.value = records;
  console.log(records);
  pagination.total = total;
});

const handlePageChange = async (page: number) => {
  pagination.currentPage = page;
  const res = await getConsultationPage({
    currentPage: page,
    size: pagination.size,
  });
  const {records, total} = res;

  tableData.value = records;
  pagination.total = total;
};
const handleConsultationDetail = async (id: string) => {
  const res = await getConsultationDetail(id);
  messages.value = res;
  console.log("Consultation detail", messages.value);
  dialogVisible.value = true;
};
</script>

<template>
  <div>
    <PageHead title="Consultations" />
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="userId" label="User ID" width="120" /> -->
      <el-table-column prop="sessionTitle" label="Session Title" width="180" />
      <el-table-column prop="lastMessageContent" label="Last Message Content" />
      <el-table-column prop="status" label="Status" width="120">
        <template #default="{row}">
          <el-tag
            :type="
              row.status === 0
                ? 'info'
                : row.status === 1
                  ? 'success'
                  : 'danger'
            ">
            {{
              row.status === 0
                ? "Pending"
                : row.status === 1
                  ? "Completed"
                  : "Cancelled"
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Opeartion" width="180">
        <template #default="{row}">
          <el-button
            link
            type="primary"
            @click="handleConsultationDetail(row.id)">
            View Details
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      title="Consultation Details"
      width="600px">
      <div class="chat-messages">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'message-item',
            message.senderType === 1 ? 'user-message' : 'ai-message',
          ]">
          <div class="message-header">
            <span class="sender">{{ message.senderTypeDesc }}</span>
            <span class="time">{{ message.createdAt }}</span>
          </div>
          <div class="message-content">
            {{ message.content }}
          </div>
        </div>
      </div>
    </el-dialog>
    <el-pagination
      layout="prev, pager, next"
      v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.size"
      :total="pagination.total"
      @current-change="handlePageChange" />
  </div>
</template>

<style scoped>
.chat-messages {
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
}

.message-item {
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8px;
}

.user-message {
  background-color: #f0f7ff;
  margin-right: 20%;
}

.ai-message {
  background-color: #f5f5f5;
  margin-left: 20%;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
}

.sender {
  font-weight: bold;
}

.time {
  font-size: 11px;
}

.message-content {
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
