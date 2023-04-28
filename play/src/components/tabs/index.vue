<template>
  <hc-tabs
    v-model="activeName"
    closable
    class="demo-tabs"
    @tab-change="handleTabChange"
  >
    <hc-tab-pane disabled label="User" name="first">User</hc-tab-pane>
    <hc-tab-pane label="Config" name="second">Config</hc-tab-pane>
    <hc-tab-pane label="Role" name="third">Role</hc-tab-pane>
    <hc-tab-pane label="Task" name="fourth">Task</hc-tab-pane>
  </hc-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('third')

const handleTabChange = (value: any) => {
  console.log(value)
  console.log(activeName.value)
}
</script>
