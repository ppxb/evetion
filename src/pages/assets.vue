<template>
  <div class="flex h-screen bg-[#E7F6DF]">
    <div
      class="flex flex-col w-full mt-32 px-8 pt-8 rounded-tl-2xl rounded-tr-2xl bg-white content-shadow"
    >
      <div class="flex justify-between items-end mb-2">
        <div class="text-4xl font-bold text-[#090046]">资产管理模块</div>

        <!-- control btns & modal handler -->
        <div class="flex">
          <button
            class="flex items-center bg-[#e7e6fa] rounded-xl px-4 py-2 text-[#090046] font-bold add ml-4"
            v-for="btn in btns"
            :key="btn.text"
            @click="btn.cb"
          >
            <app-icon :name="btn.icon" type="menu" class="mr-3" />
            {{ btn.text }}
          </button>
        </div>
      </div>

      <!-- short active link -->
      <div class="text-[#090046]">
        {{ route.name }} /
        <span class="font-bold text-[rgba(0,0,0,.5)]">
          {{ currentAssetType.name }} 「{{
            currentAssetType.type == 'common' ? '通用' : '项目'
          }}资产」</span
        >
      </div>

      <div class="flex h-full mt-8 overflow-hidden">
        <div class="w-1/4 relative overflow-y-scroll">
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold text-[#090046]">资产分类</div>
            <button
              class="flex items-center bg-[#e7e6fa] backdrop-blur rounded-xl px-4 py-2 text-[#090046] font-bold add"
            >
              <app-icon name="icon-add" type="menu" class="mr-3" />
              新建项目
            </button>
          </div>
          <n-menu
            :options="commonMenuOptions"
            :root-indent="0"
            class="mb-4"
            default-value="全部"
            @update-value="handleMenuChange"
          />
        </div>

        <div class="flex w-3/4 items-center justify-center">
          <div v-if="projects.length > 0">
            {{ projects.length }}
          </div>
          <div v-else class="font-bold text-lg text-[rgba(0,0,0,.3)]">
            没有正在管理的资产
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal wrapper -->
  <n-modal
    v-model:show="showUploadModal"
    transform-origin="center"
    :mask-closable="false"
  >
    <n-card
      style="width: 600px; border-radius: 0.75rem"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header>
        <div class="text-4xl font-bold">批量导入资产</div>
      </template>
      <template #header-extra>
        <app-icon name="icon-close" type="icon" @click="openUploadModal" />
      </template>
      <n-form :model="modelRef" :rules="rules" ref="formRef">
        <n-form-item label="项目编号" :label-style="{ fontSize: '1rem' }">
          <n-input v-model:value="modelRef.projectId" disabled />
        </n-form-item>
        <n-form-item
          label="项目名称"
          :label-style="{ fontSize: '1rem' }"
          path="projectName"
        >
          <n-input v-model:value="modelRef.projectName" />
        </n-form-item>
        <n-form-item
          label="项目金额"
          :label-style="{ fontSize: '1rem' }"
          path="projectMoney"
        >
          <n-input v-model:value="modelRef.projectMoney" />
        </n-form-item>
        <n-form-item label="项目持续时间">
          <n-date-picker
            v-model:value="timeRangeRef"
            type="daterange"
            clearable
          />
        </n-form-item>
        <n-form-item
          label="项目负责人"
          :label-style="{ fontSize: '1rem' }"
          path="projectOwner"
        >
          <n-input v-model:value="modelRef.projectOwner" />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="flex flex-row justify-end">
          <button
            class="bg-red-400 rounded-xl px-6 py-2 text-white font-bold mr-4"
            @click="openModal"
          >
            取消
          </button>
          <button
            class="bg-[#EAE8FF] rounded-xl px-6 py-2 text-[#090046] font-bold add"
            @click="submit"
          >
            添加
          </button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { onMounted, ref, h } from 'vue'
import { useRoute } from 'vue-router'
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NDatePicker,
  useMessage,
  NMenu
} from 'naive-ui'
import { nanoid } from 'nanoid'
import { toRFC3339 } from '../utils'
import api from '../api'

const route = useRoute()
const { success, error } = useMessage()

const showUploadModal = ref(false)
const currentAssetType = ref({
  name: '🗂️ 全部',
  type: 'common'
})

const projects = ref([])
const showAddModal = ref(false)
const formRef = ref(null)
const timeRangeRef = ref(null)
const modelRef = ref({
  projectId: null,
  projectName: null,
  projectMoney: null,
  projectOwner: null,
  projectStartDate: null,
  projectEndDate: null
})

const openUploadModal = () => {
  if (showUploadModal.value) showUploadModal.value = false
  else showUploadModal.value = true
}

const btns = [
  { text: '添加资产', icon: 'icon-add', cb: openUploadModal },
  { text: '模板下载', icon: 'icon-download', cb: openUploadModal },
  { text: '批量导入', icon: 'icon-upload', cb: openUploadModal }
]

const rules = {
  projectName: [
    {
      required: true,
      message: '请输入项目名称'
    }
  ],
  projectMoney: [
    {
      required: true,
      validator: (_, value) => {
        if (!value) return new Error('请输入项目金额')
        else if (!/^\d*$/.test(value)) return new Error('项目金额应该为整数')
        return true
      }
    }
  ],
  projectOwner: [
    {
      required: true,
      message: '请输入项目负责人'
    }
  ]
}

onMounted(() => {
  fetchProjects()
})

const fetchProjects = async () => {
  const res = await api.getProjects()
  projects.value = res.data
}

const openModal = () => {
  showAddModal.value = !showAddModal.value
  if (!modelRef.value.projectId && showAddModal.value === true)
    modelRef.value.projectId = `JKSY-XM-${nanoid(10)}`
  else modelRef.value.projectId = null
}

const submit = () => {
  formRef.value.validate(async errors => {
    if (!errors) {
      const parsedMoney = parseInt(modelRef.value.projectMoney)
      if (timeRangeRef.value) {
        modelRef.value.projectStartDate = toRFC3339(timeRangeRef.value[0])
        modelRef.value.projectEndDate = toRFC3339(timeRangeRef.value[1])
      }
      const res = await api.newProject({
        ...modelRef.value,
        projectMoney: parsedMoney
      })
      if (res.code == 200) {
        success(res.message)
        openModal()
        for (const [key, _] of Object.entries(modelRef.value)) {
          modelRef.value[key] = null
        }
        fetchProjects()
      } else {
        error(res.message)
      }
    }
  })
}

const commonMenuOptions = [
  {
    key: 'common',
    type: 'group',
    label: () =>
      h(
        'div',
        {
          class: 'font-bold text-[rgba(0,0,0,.3)] text-base'
        },
        '通用'
      ),
    children: [
      {
        label: () => h('div', '🗂️ 全部'),
        name: '🗂️ 全部',
        key: '全部',
        type: 'common'
      },
      {
        label: () => h('div', '💻 办公资产'),
        name: '💻 办公资产',
        key: '办公资产',
        type: 'common'
      },
      {
        label: () => h('div', '🛠️ 其他资产'),
        name: '🛠️ 其他资产',
        key: '其他资产',
        type: 'common'
      }
    ]
  },
  {
    key: 'project',
    type: 'group',
    label: () =>
      h(
        'div',
        {
          class: 'font-bold text-[rgba(0,0,0,.3)] text-base'
        },
        '项目'
      ),
    children: [
      {
        label: '📁 东安湖大运村智慧城市示范项目',
        key: '东安湖大运村智慧城市示范项目',
        name: '📁 东安湖大运村智慧城市示范项目',
        type: 'project'
      },
      {
        label: '📁 龙泉驿区智慧城市二期机房扩容项目',
        key: '龙泉驿区智慧城市二期机房扩容项目',
        name: '📁 龙泉驿区智慧城市二期机房扩容项目',
        type: 'project'
      }
    ]
  }
]

const handleMenuChange = (key, item) => {
  currentAssetType.value = {
    name: item.name,
    type: item.type
  }
}
</script>

<style scoped>
.content-shadow {
  box-shadow: -25px 0px 50px -12px rgb(0 0 0 / 0.25);
}

.add {
  transition: all 0.2s ease-in;
}

.add:hover {
  background-color: #dcd8ff;
}

.n-card-header__main {
  font-size: 4rem !important;
}
</style>
