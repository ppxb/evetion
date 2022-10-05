<template>
  <div class="flex h-screen bg-[#E7F6DF]">
    <div
      class="flex flex-col w-full mt-32 px-8 pt-8 rounded-tl-2xl rounded-tr-2xl bg-white content-shadow"
    >
      <div class="flex justify-between items-end mb-2">
        <div class="text-4xl font-bold text-[#090046]">资产管理</div>

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
        {{ route.name }} / {{ currentAssetType.i }}
        <span class="font-bold text-[rgba(0,0,0,.5)]">
          {{ currentAssetType.name }} 「{{
            currentAssetType.type == 'common' ? '通用' : '项目'
          }}资产」</span
        >
      </div>

      <div class="flex h-full mt-14 overflow-hidden">
        <div class="w-1/4 relative overflow-y-scroll">
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold text-[#090046]">资产分类</div>
            <button
              v-if="store.user.username === 'admin'"
              class="flex items-center bg-[#e7e6fa] rounded-xl px-4 py-2 text-[#090046] font-bold add"
            >
              <app-icon name="icon-add" type="menu" class="mr-3" />
              新建子类
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

  <!-- add single asset modal -->
  <n-modal
    v-model:show="showAddSingleModal"
    transform-origin="center"
    :close-on-esc="false"
    :mask-closable="false"
  >
    <n-card
      style="width: 1000px; border-radius: 0.75rem"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header>
        <div class="text-4xl font-bold text-[#090046]">添加资产</div>
        <div class="text-sm">该窗口可添加单个资产</div>
      </template>
      <template #header-extra>
        <app-icon name="icon-close" type="icon" @click="openAddSingleModal" />
      </template>

      <n-form :model="singleRef" :rules="rules" ref="formRef">
        <n-grid :cols="24">
          <n-gi :span="14">
            <n-grid :cols="14" :x-gap="12">
              <n-form-item-gi :span="6" label="资产分类">
                <n-select
                  v-model:value="singleRef.assetType"
                  placeholder="请选择资产分类"
                  :options="assetTypeOptions"
                />
              </n-form-item-gi>
              <n-form-item-gi
                :span="8"
                label="资产子类"
                v-if="singleRef.assetType == '通用'"
              >
                <n-select
                  v-model:value="singleRef.assetChildType"
                  placeholder="请选择资产分类"
                  :options="assetChildTypeOptions"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="8" label="所属项目名称" v-else>
                <n-input
                  v-model:value="singleRef.assetProjectName"
                  placeholder="请输入项目名称"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="14" label="资产名称">
                <n-input
                  v-model:value="singleRef.assetName"
                  placeholder="请输入资产的名称"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="6" label="资产编号">
                <n-input
                  v-model:value="singleRef.assetId"
                  placeholder="请输入资产对应的编号"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="8" label="型号规格">
                <n-input
                  v-model:value="singleRef.assetModel"
                  placeholder="请输入资产对应的型号规格（如品牌、尺寸等）"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="4" label="单位">
                <n-select
                  v-model:value="singleRef.assetUnit"
                  placeholder="请选择单位"
                  :options="assetUnitOptions"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="4" label="资产来源">
                <n-select
                  v-model:value="singleRef.assetOrigin"
                  placeholder="请选择资产来源"
                  :options="assetOriginOptions"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="6" label="资产状态">
                <n-select
                  v-model:value="singleRef.assetStatus"
                  placeholder="请选择资产状态"
                  :options="assetStatusOptions"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="3" label="数量">
                <n-input-number
                  v-model:value="singleRef.assetCount"
                  placeholder="请输入资产数量"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="5" label="资产价值">
                <n-input-number
                  v-model:value="singleRef.assetValue"
                  placeholder="请输入资产价值"
                >
                  <template #suffix> 元 </template>
                </n-input-number>
              </n-form-item-gi>
              <n-form-item-gi :span="6" label="折旧策略">
                <n-input-number
                  v-model:value="singleRef.assetDepreciation"
                  placeholder="请输入折旧年限"
                  class="w-full"
                >
                  <template #suffix> 年 </template>
                </n-input-number>
              </n-form-item-gi>

              <n-form-item-gi :span="7" label="入库日期">
                <n-date-picker
                  v-model:value="singleRef.assetInDate"
                  type="date"
                  class="w-full"
                />
              </n-form-item-gi>
              <n-form-item-gi :span="7" label="过保日期">
                <n-date-picker
                  v-model:value="singleRef.assetOpDate"
                  type="date"
                  class="w-full"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="14" label="资产存放位置信息">
                <n-input
                  v-model:value="singleRef.assetLocation"
                  placeholder="请输入资产存放位置信息"
                />
              </n-form-item-gi>
            </n-grid>
          </n-gi>
          <n-gi :span="10" class="flex flex-col ml-12 items-end">
            <div class="text-3xl font-bold text-[#090046] mb-4">
              资产明细汇总
            </div>
            <div
              v-if="singleRef.assetName && singleRef.assetId"
              class="flex flex-col mb-8 items-end"
            >
              <div class="text-lg font-bold">{{ singleRef.assetId }}</div>
              <div class="text-2xl font-bold">
                {{ singleRef.assetName }}
                <span class="text-base">「{{ singleRef.assetType }}资产」</span>
              </div>
            </div>

            <div
              v-if="
                singleRef.assetModel &&
                singleRef.assetUnit &&
                singleRef.assetCount &&
                singleRef.assetValue
              "
              class="text-lg font-bold flex flex-col items-end mb-4"
            >
              <div>
                {{ singleRef.assetModel }} {{ singleRef.assetCount }}
                {{ singleRef.assetUnit }} ×
                {{ singleRef.assetValue }}
              </div>
              <div>=</div>
              <div>
                <span class="text-2xl">{{
                  singleRef.assetCount * singleRef.assetValue
                }}</span>
                元人民币
              </div>
            </div>
            <div
              v-if="singleRef.assetInDate && singleRef.assetOpDate"
              class="flex flex-col items-end mb-6"
            >
              <div class="text-base">距离质保到期还有</div>
              <div class="text-lg font-bold">
                <span class="text-2xl">{{
                  (singleRef.assetOpDate - singleRef.assetInDate) /
                  1000 /
                  60 /
                  60 /
                  24
                }}</span>
                天
              </div>
            </div>

            <div
              v-if="
                singleRef.assetName &&
                singleRef.assetLocation &&
                singleRef.assetId
              "
              class="flex flex-col items-end"
            >
              <qrcode-vue
                :value="
                  JSON.stringify({
                    assetName: singleRef.assetName,
                    assetId: singleRef.assetId,
                    assetLocation: singleRef.assetLocation
                  })
                "
                :size="156"
                render-as="svg"
                foreground="#818cf8"
                level="H"
                class="rounded-lg"
              />
            </div>
          </n-gi>
        </n-grid>
      </n-form>

      <template #footer>
        <div class="flex flex-row justify-end">
          <button
            class="bg-red-400 rounded-xl px-8 py-2 text-white font-bold mr-4"
            @click="openModal"
          >
            取消
          </button>
          <button
            class="bg-[#EAE8FF] rounded-xl px-8 py-2 text-[#090046] font-bold add"
            @click="submit"
          >
            确定
          </button>
        </div>
      </template>
    </n-card>
  </n-modal>

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
  NMenu,
  NGrid,
  NFormItemGi,
  NSelect,
  NInputNumber,
  NGi
} from 'naive-ui'
import { nanoid } from 'nanoid'
import QrcodeVue from 'qrcode.vue'
import { toRFC3339 } from '../utils'
import api from '../api'
import useUserStore from '../store/userStore'

const route = useRoute()
const store = useUserStore()
const { success, error } = useMessage()

const showAddSingleModal = ref(false)

const showUploadModal = ref(false)
const currentAssetType = ref({
  name: '全部',
  type: 'common',
  i: '🗂️ '
})

const projects = ref([])
const showAddModal = ref(false)
const formRef = ref(null)
const timeRangeRef = ref(null)

const singleRef = ref({
  assetType: '通用',
  assetChildType: '办公资产',
  assetName: '',
  assetProjectName: '',
  assetId: '',
  assetModel: '',
  assetUnit: null,
  assetOrigin: '购入',
  assetStatus: '正常',
  assetInDate: null,
  assetOpDate: null,
  assetCount: 0,
  assetValue: null,
  assetDepreciation: null,
  assetLocation: ''
})

const assetTypeOptions = ['通用', '项目'].map(v => ({
  label: v,
  value: v
}))

const assetChildTypeOptions = ['办公资产', '其他资产', '耗材'].map(v => ({
  label: v,
  value: v
}))

const assetUnitOptions = ['台', '个', '套', '副', '件'].map(v => ({
  label: v,
  value: v
}))

const assetOriginOptions = ['购入', '转入'].map(v => ({
  label: v,
  value: v
}))

const assetStatusOptions = ['正常', '故障', '维修', '待报废', '报废'].map(
  v => ({
    label: v,
    value: v
  })
)

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

const openAddSingleModal = () => {
  if (showAddSingleModal.value) showAddSingleModal.value = false
  else showAddSingleModal.value = true
}

const btns = [
  { text: '添加资产', icon: 'icon-add', cb: openAddSingleModal },
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
        name: '全部',
        key: '全部',
        i: '🗂️ ',
        type: 'common'
      },
      {
        label: () => h('div', '💻 办公资产'),
        name: '办公资产',
        key: '办公资产',
        i: '💻 ',
        type: 'common'
      },
      {
        label: () => h('div', '🛠️ 其他资产'),
        name: '其他资产',
        key: '其他资产',
        i: '🛠️ ',
        type: 'common'
      },
      {
        label: () => h('div', '♻️ 耗材'),
        name: '耗材',
        key: '耗材',
        i: '♻️ ',
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
        name: '东安湖大运村智慧城市示范项目',
        i: '📁 ',
        type: 'project'
      },
      {
        label: '📁 龙泉驿区智慧城市二期机房扩容项目',
        key: '龙泉驿区智慧城市二期机房扩容项目',
        name: '龙泉驿区智慧城市二期机房扩容项目',
        i: '📁 ',
        type: 'project'
      }
    ]
  }
]

const handleMenuChange = (key, item) => {
  currentAssetType.value = {
    name: item.name,
    type: item.type,
    i: item.i
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
