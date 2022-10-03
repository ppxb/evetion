<template>
  <div class="flex h-screen bg-[#E7F6DF]">
    <div
      class="flex flex-col w-full py-8 mt-32 px-12 rounded-tl-2xl rounded-tr-2xl bg-white shadow"
    >
      <div class="text-gray-600 font-semibold mb-8">
        {{
          route.path.split('/')[1].substring(0, 1).toUpperCase() +
          route.path.split('/')[1].substring(1)
        }}
      </div>
      <div class="mb-1 flex justify-between items-end">
        <div class="text-6xl font-bold text-[#090046]">项目列表</div>
        <button
          class="bg-[#EAE8FF] rounded-xl px-6 py-3 text-[#090046] font-bold add"
          @click="openModal"
        >
          新增项目
        </button>
        <n-modal
          v-model:show="showAddModal"
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
              <div class="text-4xl font-bold">新增项目</div>
            </template>
            <template #header-extra>
              <app-icon name="icon-close" @click="openModal" />
            </template>
            <n-form :model="modelRef" :rules="rules" ref="formRef">
              <n-form-item label="项目编号" :label-style="{ fontSize: '1rem' }">
                <n-input v-model:value="modelRef.id" disabled />
              </n-form-item>
              <n-form-item
                label="项目名称"
                :label-style="{ fontSize: '1rem' }"
                path="name"
              >
                <n-input v-model:value="modelRef.name" />
              </n-form-item>
              <n-form-item
                label="项目金额"
                :label-style="{ fontSize: '1rem' }"
                path="money"
              >
                <n-input v-model:value="modelRef.money" />
              </n-form-item>
              <n-form-item
                label="项目负责人"
                :label-style="{ fontSize: '1rem' }"
                path="owner"
              >
                <n-input v-model:value="modelRef.owner" />
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
      </div>
      <div class="flex flex-col justify-center items-center h-full">
        <div class="font-bold text-lg text-gray-500">没有正在管理的项目</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { NModal, NCard, NForm, NFormItem, NInput, NInputNumber } from 'naive-ui'
import { nanoid } from 'nanoid'

const route = useRoute()
const showAddModal = ref(false)
const formRef = ref(null)
const modelRef = ref({
  id: null,
  name: null,
  money: null,
  owner: null
})
const rules = {
  name: [
    {
      required: true,
      message: '请输入项目名称'
    }
  ],
  money: [
    {
      required: true,
      validator: (_, value) => {
        if (!value) return new Error('请输入项目金额')
        else if (!/^\d*$/.test(value)) return new Error('项目金额应该为整数')
        return true
      }
    }
  ],
  owner: [
    {
      required: true,
      message: '请输入项目负责人'
    }
  ]
}

const openModal = () => {
  showAddModal.value = !showAddModal.value
  if (!modelRef.value.id && showAddModal.value === true)
    modelRef.value.id = nanoid()
  else modelRef.value.id = null
}

const submit = () => {
  formRef.value.validate(errors => {
    if (!errors) console.log('go')
  })
}
</script>

<style scoped>
.shadow {
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
